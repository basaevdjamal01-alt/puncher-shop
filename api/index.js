import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
let currentPort = null;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lockPath = path.join(__dirname, ".api-server.lock.json");
const portInfoPath = path.join(__dirname, ".backend-port.json");

const preferredPort = Number(process.env.PORT_START ?? process.env.PORT ?? 3001);
const maxAttempts = Number(process.env.PORT_MAX_ATTEMPTS ?? 20);

let lockAcquired = false;

function extractNowPaymentsInvoiceUrl(d) {
  if (!d || typeof d !== "object") return null;
  const top = d.invoice_url ?? d.invoiceUrl ?? d.url ?? d.invoiceURL;
  if (typeof top === "string" && top.startsWith("http")) return top;
  const nested = d.result ?? d.data;
  if (nested && typeof nested === "object") {
    const u = nested.invoice_url ?? nested.invoiceUrl ?? nested.url;
    if (typeof u === "string" && u.startsWith("http")) return u;
  }
  return null;
}

function writeJsonFileSafe(filePath, value) {
  return fs.promises
    .writeFile(filePath, JSON.stringify(value, null, 2), "utf8")
    .catch(() => {});
}

async function acquireLock() {
  // Ensures we don't start multiple backend instances at the same time.
  // If another instance is already running, we exit gracefully.
  const pid = process.pid;

  const tryAcquire = async () => {
    const fh = await fs.promises.open(lockPath, "wx");
    try {
      await fh.writeFile(
        JSON.stringify({ pid, startedAt: new Date().toISOString() }, null, 2),
        "utf8",
      );
    } finally {
      await fh.close();
    }
    return true;
  };

  try {
    return await tryAcquire();
  } catch (err) {
    if (err && err.code !== "EEXIST") throw err;

    // Lock exists; check whether the PID is still alive.
    const raw = await fs.promises.readFile(lockPath, "utf8").catch(() => null);
    const existingPid = raw ? (() => { try { return JSON.parse(raw).pid; } catch { return null; } })() : null;

    if (existingPid) {
      try {
        process.kill(existingPid, 0);
        console.log(
          `API instance already running (pid ${existingPid}). Skipping startup.`,
        );
        return false;
      } catch {
        // Stale lock file; remove and retry once.
        await fs.promises.unlink(lockPath).catch(() => {});
        return await tryAcquire();
      }
    }

    // Unparseable lock. Remove and retry once.
    await fs.promises.unlink(lockPath).catch(() => {});
    return await tryAcquire();
  }
}

function releaseLock() {
  if (!lockAcquired) return;
  fs.promises.unlink(lockPath).catch(() => {});
}

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, port: currentPort });
});

// Create NOWPayments invoice (shared handler)
async function createNowPaymentsInvoice(req, res) {
  const { pubgId, nickname, contact, packageName, amountUsd } = req.body ?? {};

  if (!pubgId || typeof pubgId !== "string" || !String(pubgId).trim()) {
    return res.status(400).json({ error: "PUBG ID обязателен." });
  }
  if (!nickname || typeof nickname !== "string" || !String(nickname).trim()) {
    return res.status(400).json({ error: "Никнейм обязателен." });
  }
  if (!contact || typeof contact !== "string" || !String(contact).trim()) {
    return res.status(400).json({ error: "Контакт обязателен." });
  }
  if (!packageName || typeof packageName !== "string" || !String(packageName).trim()) {
    return res.status(400).json({ error: "Название пакета обязательно." });
  }
  const amount = Number(amountUsd);
  if (typeof amountUsd === "undefined" || amountUsd === null || Number.isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Сумма должна быть положительным числом." });
  }

  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!apiKey) {
    return res.status(500).json({ error: "Сервер не настроен: отсутствует NOWPAYMENTS_API_KEY." });
  }

  const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  const orderDescription = "PUNCHER SHOP UC";

  const payload = {
    price_amount: amount,
    price_currency: "usd",
    order_id: orderId,
    order_description: orderDescription,
    success_url: `${frontendUrl.replace(/\/$/, "")}/payment-success`,
    cancel_url: `${frontendUrl.replace(/\/$/, "")}/payment-cancel`,
  };

  const ipnUrl = process.env.NOWPAYMENTS_IPN_CALLBACK_URL?.trim();
  if (ipnUrl) {
    payload.ipn_callback_url = ipnUrl;
  }

  try {
    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const rawBody = await response.text();
    let data = {};
    try {
      data = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      data = { parseError: true, rawBody };
    }

    if (!response.ok) {
      console.log("NOWPayments error HTTP status:", response.status);
      console.log("NOWPayments full error response (raw):", rawBody);
      console.log("NOWPayments full error response (parsed):", JSON.stringify(data, null, 2));
      const msg = data.message || data.error || data.code || response.statusText;
      return res.status(response.status >= 400 ? response.status : 502).json({
        error: msg || "Не удалось создать счёт NOWPayments.",
      });
    }

    const invoiceId = data.id ?? data.invoice_id ?? data.invoiceId;
    const invoiceUrl = extractNowPaymentsInvoiceUrl(data);

    if (!invoiceUrl) {
      console.log("NOWPayments: success status but no invoice_url; full body:", rawBody);
      console.log("NOWPayments parsed:", JSON.stringify(data, null, 2));
      return res.status(502).json({
        error: "Сервис оплаты не вернул ссылку на счёт.",
      });
    }

    return res.json({
      ok: true,
      orderId,
      invoiceId: invoiceId ?? null,
      invoiceUrl,
      invoice_url: invoiceUrl,
    });
  } catch (err) {
    console.log("NOWPayments request exception:", err);
    console.error("NOWPayments request error:", err);
    return res.status(502).json({
      error: "Ошибка связи с платёжной системой. Попробуйте позже.",
    });
  }
}

app.post("/api/create-payment", createNowPaymentsInvoice);
app.post("/create-nowpayment", createNowPaymentsInvoice);

// IPN callback from NOWPayments
app.post("/api/nowpayments-ipn", (req, res) => {
  console.log("NOWPayments IPN callback:", JSON.stringify(req.body, null, 2));
  res.status(200).json({ ok: true });
});

async function listenServerWithFallback() {
  // Try binding sequentially: preferredPort, preferredPort+1, ...
  let lastErr = null;

  for (let offset = 0; offset < maxAttempts; offset++) {
    const port = preferredPort + offset;
    console.log(`Attempting to start API on port ${port}...`);

    const server = http.createServer(app);
    try {
      await new Promise((resolve, reject) => {
        const onError = (err) => reject(err);
        const onListening = () => resolve();
        server.once("error", onError);
        server.once("listening", onListening);
        server.listen(port);
      });

      currentPort = port;
      server.on("error", (err) => {
        console.error("API server runtime error:", err);
      });

      await writeJsonFileSafe(portInfoPath, {
        port,
        preferredPort,
        maxAttempts,
        startedAt: new Date().toISOString(),
        pid: process.pid,
      });

      console.log(`API started successfully on port ${port}`);
      console.log(`API running at http://localhost:${port}`);
      return server;
    } catch (err) {
      lastErr = err;
      const code = err?.code;
      if (code === "EADDRINUSE") {
        console.warn(`Port ${port} is already in use. Trying next...`);
        // Ensure we don't keep a half-open server around.
        server.close(() => {});
        continue;
      }
      console.error(`Failed to start API on port ${port}:`, err);
      server.close(() => {});
    }
  }

  const msg = lastErr
    ? `All attempts failed. Last error: ${lastErr?.code || lastErr?.message || lastErr}`
    : "All attempts failed: no error captured.";
  console.error(msg);
  throw lastErr || new Error(msg);
}

console.log("SERVER STARTING...");

async function main() {
  try {
    lockAcquired = await acquireLock();
    if (!lockAcquired) {
      const raw = await fs.promises
        .readFile(portInfoPath, "utf8")
        .catch(() => null);
      const knownPort = raw ? (() => { try { return JSON.parse(raw).port; } catch { return null; } })() : null;
      if (knownPort) console.log(`Known backend port: ${knownPort}`);
      return;
    }

    process.on("SIGINT", releaseLock);
    process.on("SIGTERM", releaseLock);

    await listenServerWithFallback();
  } catch (err) {
    console.error("API failed to start:", err);
    releaseLock();
    process.exit(1);
  }
}

main();
