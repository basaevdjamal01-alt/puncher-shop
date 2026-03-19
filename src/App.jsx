import { useState, useEffect } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import ucIcon from "./assets/uc-icon.png";
import CryptoPaymentBlock from "./components/CryptoPaymentBlock.jsx";
import ProcessingState from "./components/ProcessingState.jsx";

const TON_PRICE_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd";
const FALLBACK_TON_USD = 5;

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function paymentApiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return API_URL ? `${API_URL}${p}` : p;
}

function TelegramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M21.6 4.2L3.3 11.4c-.7.3-.7 1.3.1 1.6l4.3 1.4 1.6 5c.2.7 1.1.8 1.5.3l2.3-2.4 4.3 3.1c.6.4 1.5.1 1.7-.7l2.7-14.2c.2-.8-.6-1.4-1.3-1.1zM9.3 13.2l8.5-5.2-5.2 6.5-.6 2.7-.9-3.9z"
        fill="#229ED9"
      />
    </svg>
  );
}

function NowPaymentsDualCoinIcon({ size = 22 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "drop-shadow(0 0 12px rgba(0,0,0,0.65))" }}
      >
        <defs>
          <linearGradient id="np_usdt" x1="4" y1="6" x2="16" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(80, 255, 210, 0.95)" />
            <stop offset="1" stopColor="rgba(40, 170, 120, 0.75)" />
          </linearGradient>
          <linearGradient id="np_btc" x1="8" y1="4" x2="20" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255, 200, 120, 0.95)" />
            <stop offset="1" stopColor="rgba(255, 140, 40, 0.85)" />
          </linearGradient>
          <radialGradient id="np_shine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 8) rotate(55) scale(10 8)">
            <stop stopColor="rgba(255,255,255,0.35)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* back coin (BTC-ish) */}
        <path
          d="M14.2 4.7c3.7 0 6.7 1.55 6.7 3.46s-3 3.46-6.7 3.46-6.7-1.55-6.7-3.46 3-3.46 6.7-3.46Z"
          stroke="url(#np_btc)"
          strokeWidth="1.5"
          opacity="0.95"
        />
        <path
          d="M20.9 8.16v2.55c0 1.91-3 3.46-6.7 3.46s-6.7-1.55-6.7-3.46V8.16"
          stroke="url(#np_btc)"
          strokeWidth="1.5"
          opacity="0.85"
        />

        {/* front coin (USDT-ish) */}
        <path
          d="M9.8 9.2c3.9 0 7.1 1.7 7.1 3.8s-3.2 3.8-7.1 3.8S2.7 15.1 2.7 13s3.2-3.8 7.1-3.8Z"
          stroke="url(#np_usdt)"
          strokeWidth="1.6"
          opacity="0.98"
        />
        <path
          d="M16.9 13v3.1c0 2.1-3.2 3.8-7.1 3.8s-7.1-1.7-7.1-3.8V13"
          stroke="url(#np_usdt)"
          strokeWidth="1.6"
          opacity="0.9"
        />

        <path
          d="M5.3 12.2h9.1"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M8.2 11.2v2.1"
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M12.2 11.2v2.1"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />

        <circle cx="10.2" cy="14.1" r="6.7" fill="url(#np_shine)" opacity="0.55" />
      </svg>
    </span>
  );
}

function PremiumCardIcon({ tone = "cool", size = 22 }) {
  const stroke = tone === "warm" ? "rgba(255, 210, 140, 0.92)" : "rgba(215, 235, 255, 0.92)";

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: "drop-shadow(0 0 10px rgba(0,0,0,0.55))",
        }}
      >
        <defs>
          <linearGradient id={`pc_${tone}`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor={tone === "warm" ? "rgba(255, 206, 140, 0.35)" : "rgba(140, 205, 255, 0.32)"} />
            <stop offset="1" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <rect x="3" y="6" width="18" height="12" rx="3" fill={`url(#pc_${tone})`} />
        <rect x="3" y="6" width="18" height="12" rx="3" stroke={stroke} strokeWidth="1.4" />
        <path d="M3.7 10h16.6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        <path d="M6.6 15.6h5.4" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
      </svg>
    </span>
  );
}

function RussiaFlagIcon({ size = 22 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.6))" }}
      >
        <defs>
          <linearGradient id="rf_border" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255, 230, 200, 0.35)" />
            <stop offset="1" stopColor="rgba(255, 160, 90, 0)" />
          </linearGradient>
          <radialGradient id="rf_shine" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8 8) rotate(55) scale(12 10)">
            <stop stopColor="rgba(255,255,255,0.22)" />
            <stop offset="1" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect x="4" y="6.2" width="16" height="11.6" rx="3" fill="rgba(0,0,0,0.42)" />
        <rect x="4.8" y="7" width="14.4" height="3.2" rx="1.6" fill="rgba(255,255,255,0.92)" />
        <rect x="4.8" y="10.4" width="14.4" height="3.2" rx="1.6" fill="rgba(55,120,240,0.92)" />
        <rect x="4.8" y="13.8" width="14.4" height="3.2" rx="1.6" fill="rgba(235,70,70,0.92)" />
        <rect x="4" y="6.2" width="16" height="11.6" rx="3" fill="none" stroke="url(#rf_border)" strokeWidth="1.1" />
        <rect x="4" y="6.2" width="16" height="11.6" rx="3" fill="url(#rf_shine)" opacity="0.7" />
      </svg>
    </span>
  );
}

function CryptoStackIcon({ size = 22 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 10px rgba(0,0,0,0.6))" }}>
        <defs>
          <linearGradient id="cs_cyan" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(80, 255, 210, 0.85)" />
            <stop offset="1" stopColor="rgba(80, 170, 255, 0.85)" />
          </linearGradient>
        </defs>
        <path d="M12 3.7c4.6 0 8.3 1.9 8.3 4.2S16.6 12 12 12 3.7 10.1 3.7 7.9 7.4 3.7 12 3.7Z" stroke="url(#cs_cyan)" strokeWidth="1.4" opacity="0.95" />
        <path d="M20.3 7.9v4.2c0 2.3-3.7 4.2-8.3 4.2s-8.3-1.9-8.3-4.2V7.9" stroke="url(#cs_cyan)" strokeWidth="1.4" opacity="0.9" />
        <path d="M20.3 12.1v4.2c0 2.3-3.7 4.2-8.3 4.2s-8.3-1.9-8.3-4.2v-4.2" stroke="url(#cs_cyan)" strokeWidth="1.4" opacity="0.85" />
        <circle cx="16.8" cy="8.6" r="2.2" fill="rgba(0,0,0,0.4)" stroke="rgba(80, 255, 210, 0.85)" strokeWidth="1.2" />
        <path d="M16 8.6h1.6" stroke="rgba(80, 255, 210, 0.9)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function App() {
  const products = [
    {
      id: 1,
      name: "60 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$0.76",
      priceEUR: "€0.83",
      priceRUB: "76₽",
    },
    {
      id: 2,
      name: "120 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$1.90",
      priceEUR: "€1.66",
      priceRUB: "152₽",
    },
    {
      id: 3,
      name: "385 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$4.91",
      priceEUR: "€4.30",
      priceRUB: "393₽",
    },
    {
      id: 4,
      name: "720 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$10.79",
      priceEUR: "€9.45",
      priceRUB: "864₽",
    },
    {
      id: 5,
      name: "985 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$14.72",
      priceEUR: "€12.89",
      priceRUB: "1179₽",
    },
    {
      id: 6,
      name: "1320 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$19.78",
      priceEUR: "€17.32",
      priceRUB: "1584₽",
    },
    {
      id: 7,
      name: "1800 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$24.56",
      priceEUR: "€21.51",
      priceRUB: "1967₽",
    },
    {
      id: 8,
      name: "2125 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$29.85",
      priceEUR: "€26.15",
      priceRUB: "2391₽",
    },
    {
      id: 9,
      name: "2460 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$34.64",
      priceEUR: "€30.35",
      priceRUB: "2775₽",
    },
    {
      id: 10,
      name: "3850 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$49.03",
      priceEUR: "€42.94",
      priceRUB: "3927₽",
    },
    {
      id: 11,
      name: "4510 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$59.81",
      priceEUR: "€52.39",
      priceRUB: "4791₽",
    },
    {
      id: 12,
      name: "5650 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$74.19",
      priceEUR: "€64.99",
      priceRUB: "5943₽",
    },
    {
      id: 13,
      name: "8100 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$98.16",
      priceEUR: "€85.99",
      priceRUB: "7863₽",
    },
    {
      id: 14,
      name: "9900 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$123.33",
      priceEUR: "€108.03",
      priceRUB: "9879₽",
    },
    {
      id: 15,
      name: "11950 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$148.46",
      priceEUR: "€130.04",
      priceRUB: "11895₽",
    },
    {
      id: 16,
      name: "16200 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$196.32",
      priceEUR: "€171.96",
      priceRUB: "15725₽",
    },
    {
      id: 17,
      name: "24300 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$294.48",
      priceEUR: "€257.94",
      priceRUB: "23588₽",
    },
    {
      id: 18,
      name: "32400 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$392.63",
      priceEUR: "€343.92",
      priceRUB: "31450₽",
    },
    {
      id: 19,
      name: "40500 UC",
      image: "/uc-placeholder.png",
      priceUSD: "$486.48",
      priceEUR: "€426.12",
      priceRUB: "38967₽",
    },
  ];

  const [currency, setCurrency] = useState("USD");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [pubgID, setPubgID] = useState("");
  const [nickname, setNickname] = useState("");
  const [contact, setContact] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentPanelOpen, setPaymentPanelOpen] = useState(true);
  const [cryptoAccordionOpen, setCryptoAccordionOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [cardPaymentLoading, setCardPaymentLoading] = useState(false);
  const [processingAttempt, setProcessingAttempt] = useState(0);
  const [cryptoComingSoonVisible, setCryptoComingSoonVisible] = useState(false);
  const [showTonFallback, setShowTonFallback] = useState(false);
  const [tonUsdRate, setTonUsdRate] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(TON_PRICE_API)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const usd = data?.["the-open-network"]?.usd;
        if (typeof usd === "number" && usd > 0) setTonUsdRate(usd);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const [tonConnectUI] = useTonConnectUI({
    manifestUrl: "https://puncher-shop.vercel.app/tonconnect-manifest.json",
  });
  const wallet = useTonWallet();

  const TON_WALLET_ADDRESS =
    "UQBvFUojlLTecFwQJ_zcprvBU7sS1v2FeTVYr0OTIygvik6L";

  function getPrice(product) {
    if (currency === "USD") return product.priceUSD;
    if (currency === "EUR") return product.priceEUR;
    return product.priceRUB;
  }

  function oldPrice(product) {
    if (currency === "USD") {
      return `$${(parseFloat(product.priceUSD.replace("$", "")) + 0.05).toFixed(2)}`;
    }
    if (currency === "EUR") {
      return `€${(parseFloat(product.priceEUR.replace("€", "")) + 0.05).toFixed(2)}`;
    }
    return `${parseInt(product.priceRUB.replace("₽", ""), 10) + 7}₽`;
  }

  function validateOrderFields() {
    if (!pubgID.trim() || !nickname.trim() || !contact.trim()) {
      alert("Заполни PUBG ID, ник и контакт.");
      return false;
    }
    return true;
  }

  function startPaymentProcessing() {
    setCheckoutMessage("");
    setProcessingAttempt((prev) => prev + 1);
    setCardPaymentLoading(true);
  }

  function stopPaymentProcessing() {
    setCardPaymentLoading(false);
  }

  async function handlePaddlePayment() {
    if (!validateOrderFields()) return;
    startPaymentProcessing();
    try {
      const res = await fetch(paymentApiUrl("/create-paddle"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubgId: pubgID.trim(),
          nickname: nickname.trim(),
          contact: contact.trim(),
          packageName: selectedProduct.name,
          amountUsd: getOrderTotalUSD(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      const url = data.checkoutUrl || data.url;
      if (res.ok && url) {
        stopPaymentProcessing();
        window.location.href = url;
        return;
      }
      alert(
        "Оплата картой (США/Европа) временно недоступна. Выберите другой способ или напишите менеджеру."
      );
    } catch {
      alert("Ошибка сети. Попробуйте позже.");
    } finally {
      stopPaymentProcessing();
    }
  }

  async function handleLavaPayment() {
    if (!validateOrderFields()) return;
    startPaymentProcessing();
    try {
      const res = await fetch(paymentApiUrl("/create-lava"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pubgId: pubgID.trim(),
          nickname: nickname.trim(),
          contact: contact.trim(),
          packageName: selectedProduct.name,
          amountUsd: getOrderTotalUSD(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      const url = data.invoiceUrl || data.paymentUrl || data.url;
      if (res.ok && url) {
        stopPaymentProcessing();
        window.location.href = url;
        return;
      }
      alert(
        "Оплата картой (Россия) временно недоступна. Выберите другой способ или напишите менеджеру."
      );
    } catch {
      alert("Ошибка сети. Попробуйте позже.");
    } finally {
      stopPaymentProcessing();
    }
  }

  async function handleCryptoPayment() {
    if (!validateOrderFields()) return;
    startPaymentProcessing();
    const endpointPath = "/api/create-payment";
    const resolvedApiBaseUrl = API_URL || "";
    const requestUrl = paymentApiUrl(endpointPath);

    try {
      const amountUsd = getOrderTotalUSD();

      console.log("[Crypto NOWPayments] API URL used:", resolvedApiBaseUrl || "(empty -> relative URL)");
      console.log("[Crypto NOWPayments] Request endpoint:", endpointPath);
      console.log("[Crypto NOWPayments] Full request URL:", requestUrl);

      const payload = {
        pubgId: pubgID.trim(),
        nickname: nickname.trim(),
        contact: contact.trim(),
        packageName: selectedProduct.name,
        amountUsd,
      };

      console.log("[Crypto NOWPayments] Request payload:", payload);

      const res = await fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      console.log("[Crypto NOWPayments] Response status:", res.status, res.statusText);
      console.log("[Crypto NOWPayments] Response body (text):", responseText);

      let data = {};
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = { parseError: true, rawBody: responseText };
      }
      console.log("[Crypto NOWPayments] Response body (json if possible):", data);

      const invoiceUrl =
        data.invoiceUrl ||
        data.invoice_url ||
        data.paymentUrl ||
        data.url ||
        data?.result?.invoice_url ||
        data?.result?.invoiceUrl;

      if (res.ok && invoiceUrl && String(invoiceUrl).startsWith("http")) {
        stopPaymentProcessing();
        window.location.assign(String(invoiceUrl));
        return;
      }

      const errorReason =
        data?.error ||
        data?.message ||
        data?.code ||
        data?.result?.error ||
        `HTTP ${res.status} ${res.statusText}`;

      console.error("[Crypto NOWPayments] Invoice creation failed:", {
        endpointPath,
        status: res.status,
        errorReason,
        response: data,
      });

      alert(data?.error || "Не удалось создать оплату. Попробуйте ещё раз.");
    } catch (err) {
      console.error("[Crypto NOWPayments] Network/request error. Details:", err);
      console.error("[Crypto NOWPayments] API URL used:", resolvedApiBaseUrl || "(empty -> relative URL)");
      console.error("[Crypto NOWPayments] Request endpoint:", endpointPath);
      console.error("[Crypto NOWPayments] Error reason:", err?.message || err);
      alert("Не удалось создать оплату. Попробуйте ещё раз.");
    } finally {
      stopPaymentProcessing();
    }
  }

  function handleTelegramWallet() {
    handleTelegramWalletPayment();
  }

  function handleProceedToPayment() {
    if (cardPaymentLoading) return;
    if (!selectedMethod || !validateOrderFields()) return;
    switch (selectedMethod) {
      case "card_international":
        handlePaddlePayment();
        break;
      case "card_russia":
        handleLavaPayment();
        break;
      case "crypto_nowpayments":
        handleCryptoPayment();
        break;
      case "telegram_wallet":
        handleTelegramWallet();
        break;
      default:
        break;
    }
  }

  function getOrderTotalUSD() {
    const usdPriceString = selectedProduct.priceUSD.replace("$", "");
    const usd = parseFloat(usdPriceString);
    if (Number.isNaN(usd)) return 0;
    return usd;
  }

  function getTonUsdRate() {
    return tonUsdRate ?? FALLBACK_TON_USD;
  }

  function getOrderTotalTON() {
    const usd = getOrderTotalUSD();
    if (usd <= 0) return 0;
    const ton = usd / getTonUsdRate();
    return Math.round(ton * 10000) / 10000;
  }

  function handleTelegramWalletPayment() {
    const comment = `PUNCHER SHOP | ${selectedProduct.name} | PUBG ID: ${
      pubgID || "—"
    }`;

    const orderAmountTon = getOrderTotalTON();

    if (!wallet) {
      tonConnectUI.openModal();
      setCheckoutMessage(
        "Подключи Telegram Wallet через TON Connect, затем повторно нажми «Перейти к оплате»."
      );
      return;
    }

    try {
      const amountNano =
        orderAmountTon > 0
          ? BigInt(Math.round(orderAmountTon * 1e9)).toString()
          : undefined;

      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: TON_WALLET_ADDRESS,
            ...(amountNano ? { amount: amountNano } : {}),
          },
        ],
      };

      tonConnectUI.sendTransaction(tx);

      setCheckoutMessage(
        `Запрос на оплату через Telegram Wallet отправлен.\nКомментарий к переводу:\n${comment}`
      );
    } catch (error) {
      console.error("TON Connect sendTransaction error", error);
      setShowTonFallback(true);
      setCheckoutMessage(
        `Не удалось отправить транзакцию через TON Connect. Открой Telegram Wallet, отправь перевод на TON кошелёк ниже и укажи комментарий:\n\n${comment}`
      );
    }
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top, rgba(255,0,0,0.18), transparent 18%), linear-gradient(180deg, #050505 0%, #120000 55%, #060606 100%)",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position: "relative",
      overflowX: "hidden",
      paddingBottom: 24,
    },
    pageGlowLeft: {
      position: "absolute",
      left: "-120px",
      top: "160px",
      width: "260px",
      height: "260px",
      borderRadius: "50%",
      background: "rgba(255,60,0,0.10)",
      filter: "blur(70px)",
      pointerEvents: "none",
    },
    pageGlowRight: {
      position: "absolute",
      right: "-120px",
      top: "60px",
      width: "260px",
      height: "260px",
      borderRadius: "50%",
      background: "rgba(255,0,0,0.14)",
      filter: "blur(80px)",
      pointerEvents: "none",
    },
    app: {
      width: "100%",
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top, rgba(255,0,0,0.10), transparent 24%), #050505",
      boxShadow: "0 0 0 1px rgba(255,0,0,0.20)",
      position: "relative",
      zIndex: 2,
      borderRadius: 0,
    },
    header: {
      padding: "12px 16px 4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    content: {
      padding: "4px 14px 16px",
    },
    heroShell: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16,
    },
    heroTopTextCard: {
      borderRadius: 18,
      padding: "10px 12px 9px",
      background:
        "linear-gradient(145deg, rgba(10,10,10,0.92), rgba(25,0,0,0.96))",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(14px)",
      boxShadow:
        "0 10px 26px rgba(0,0,0,0.9), 0 0 24px rgba(255,0,32,0.35)",
    },
    heroSelectedCard: {
      borderRadius: 18,
      padding: "10px 12px 10px",
      background:
        "radial-gradient(circle at top, rgba(255,60,30,0.16), transparent 60%), linear-gradient(145deg, #120000, #050101)",
      border: "1px solid rgba(255,80,60,0.96)",
      boxShadow:
        "0 0 26px rgba(255,0,0,0.8), 0 18px 40px rgba(0,0,0,0.95)",
    },
    heroBannerCard: {
      position: "relative",
      borderRadius: 22,
      overflow: "hidden",
      height: 210,
      minHeight: 190,
      maxHeight: 230,
      backgroundImage:
        "linear-gradient(135deg, rgba(0,0,0,0.28), rgba(0,0,0,0.55)), url('/puncher-banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid rgba(255,70,50,0.95)",
      boxShadow:
        "0 0 34px rgba(255,0,0,0.9), 0 24px 52px rgba(0,0,0,1)",
    },
    heroBannerInner: {
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "12px 12px 10px",
      pointerEvents: "none",
    },
    heroBannerTagRow: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 8,
    },
    heroBannerTag: {
      padding: "5px 10px",
      borderRadius: 999,
      background: "rgba(0,0,0,0.72)",
      border: "1px solid rgba(255,160,110,0.96)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: "rgba(255,235,225,0.96)",
      boxShadow: "0 0 20px rgba(255,60,0,0.9)",
    },
    heroOfficialBadge: {
      alignSelf: "flex-end",
      marginTop: "auto",
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "7px 11px",
      borderRadius: 999,
      background:
        "linear-gradient(135deg, rgba(0,0,0,0.95), rgba(40,0,0,0.96))",
      border: "1px solid rgba(255,130,90,0.95)",
      boxShadow: "0 0 22px rgba(255,50,0,0.9)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: "rgba(255,225,215,0.96)",
    },
    heroOfficialDot: {
      width: 7,
      height: 7,
      borderRadius: "999px",
      background:
        "radial-gradient(circle at center, rgba(255,255,255,1) 0, rgba(255,70,40,1) 40%, transparent 70%)",
      boxShadow: "0 0 14px rgba(255,60,0,0.95)",
    },
    heroLabel: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1.6,
      color: "rgba(255,230,220,0.9)",
      marginBottom: 4,
    },
    heroTitle: {
      fontSize: 21,
      fontWeight: 900,
      lineHeight: 1.18,
      letterSpacing: 0.2,
    },
    heroSubtitle: {
      fontSize: 12,
      color: "rgba(255,255,255,0.78)",
      marginTop: 6,
      lineHeight: 1.5,
    },
    heroBadge: {
      padding: "4px 9px",
      borderRadius: 999,
      background:
        "linear-gradient(145deg, rgba(0,0,0,0.96), rgba(30,0,0,0.96))",
      border: "1px solid rgba(255,120,80,0.8)",
      boxShadow: "0 0 16px rgba(255,70,0,0.8)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginTop: 4,
    },
    heroBadgeLabel: {
      fontSize: 10,
      textTransform: "uppercase",
      color: "rgba(255,210,200,0.9)",
      letterSpacing: 1.2,
    },
    heroBadgeValue: {
      fontSize: 15,
      fontWeight: 800,
    },
    heroStat: {
      position: "relative",
      borderRadius: 999,
      padding: "7px 12px 7px 11px",
      background:
        "linear-gradient(145deg, rgba(4,4,4,0.96), rgba(18,0,0,0.98))",
      border: "1px solid rgba(255,70,40,0.45)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      backdropFilter: "blur(14px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      minWidth: 0,
    },
    heroStatHeader: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      width: "100%",
      justifyContent: "flex-start",
    },
    heroStatIcon: {
      width: 16,
      height: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 9.5,
      lineHeight: "16px",
      opacity: 0.4,
      borderRadius: 999,
      background: "rgba(0,0,0,0.30)",
      border: "1px solid rgba(255,255,255,0.09)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
      filter: "grayscale(1) saturate(0.02) brightness(1.18) contrast(1.05)",
      transform: "translateY(-0.4px)",
    },
    heroStatLabel: {
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 1.4,
      color: "rgba(255,255,255,0.65)",
      flex: 1,
      whiteSpace: "nowrap",
    },
    heroStatValue: {
      fontSize: 11,
      fontWeight: 800,
      color: "rgba(255,80,60,0.95)",
      marginTop: 2,
    },
    heroFeatureBadgesRow: {
      display: "flex",
      gap: 8,
      marginTop: 10,
      flexWrap: "wrap",
    },
    heroCurrenciesRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 8,
      margin: "0 0 14px",
    },
    currencyRow: {
      display: "flex",
      gap: 8,
      flex: 1,
    },
    currencyBtn: (active) => ({
      flex: 1,
      borderRadius: 999,
      border: active ? "1px solid #ff4b4b" : "1px solid rgba(255,255,255,0.18)",
      background: active
        ? "linear-gradient(145deg,#ff2626,#b40808)"
        : "linear-gradient(145deg,rgba(10,10,10,0.9),rgba(30,0,0,0.92))",
      color: "#fff",
      padding: "9px 10px",
      fontWeight: 800,
      fontSize: 13,
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: 0.6,
      transition: "all .18s ease",
      boxShadow: active ? "0 0 22px rgba(255,0,0,0.42)" : "0 0 0 rgba(0,0,0,0)",
    }),
    currencyNote: {
      fontSize: 10,
      color: "rgba(255,255,255,0.70)",
      textAlign: "right",
      maxWidth: 110,
    },
    sectionHeadingRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 16,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 16,
      textTransform: "uppercase",
      letterSpacing: 1.4,
      fontWeight: 800,
    },
    sectionSub: {
      fontSize: 11,
      color: "rgba(255,255,255,0.70)",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0,1fr))",
      gap: 10,
    },
    productCard: (active) => ({
      position: "relative",
      borderRadius: 20,
      overflow: "hidden",
      background:
        "radial-gradient(circle at top, rgba(255,40,40,0.20), transparent 52%), linear-gradient(170deg,#070707,#120000)",
      border: active
        ? "1px solid rgba(255,80,60,0.95)"
        : "1px solid rgba(255,255,255,0.08)",
      boxShadow: active
        ? "0 0 32px rgba(255,40,0,0.7)"
        : "0 10px 24px rgba(0,0,0,0.9)",
      transition:
        "transform .25s ease, box-shadow .25s ease, border-color .25s ease, filter .25s ease",
      display: "flex",
      flexDirection: "column",
      minHeight: 170,
    }),
    cardGlowBottom: {
      position: "absolute",
      left: "10%",
      right: "10%",
      bottom: 44,
      height: 40,
      background: "rgba(255,60,0,0.45)",
      filter: "blur(28px)",
      borderRadius: 999,
      opacity: 0.9,
      pointerEvents: "none",
    },
    productHot: {
      position: "absolute",
      top: 8,
      left: 8,
      padding: "4px 8px",
      borderRadius: 999,
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: 1.3,
      background:
        "linear-gradient(135deg,rgba(255,100,40,0.98),rgba(255,0,0,0.95))",
      color: "#fff",
      boxShadow: "0 0 16px rgba(255,40,0,0.7)",
      fontWeight: 800,
    },
    productImageWrap: {
      paddingTop: 14,
      paddingBottom: 6,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ucImage: {
      width: 72,
      height: 72,
      objectFit: "contain",
      borderRadius: 18,
      filter:
        "drop-shadow(0 0 10px rgba(255,80,40,0.65)) drop-shadow(0 10px 18px rgba(0,0,0,0.9))",
    },
    productBody: {
      padding: "0 9px 6px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 4,
    },
    productName: {
      fontSize: 13,
      fontWeight: 800,
      textTransform: "uppercase",
    },
    productPriceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 5,
      marginTop: 1,
    },
    oldPrice: {
      fontSize: 10,
      color: "rgba(255,255,255,0.4)",
      textDecoration: "line-through",
    },
    productPrice: {
      fontSize: 14,
      fontWeight: 900,
    },
    productHint: {
      fontSize: 10,
      color: "rgba(255,255,255,0.60)",
      marginTop: 2,
    },
    chooseBtn: {
      border: "none",
      background:
        "radial-gradient(circle at top, rgba(255,255,255,0.15), transparent 55%), linear-gradient(145deg,#ff2727,#a60606)",
      color: "#fff",
      minHeight: 38,
      width: "100%",
      fontWeight: 800,
      fontSize: 13,
      letterSpacing: 0.6,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "background .16s ease, transform .12s ease, box-shadow .16s ease",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      marginTop: 6,
      boxShadow: "0 0 16px rgba(255,0,0,0.36)",
    },
    orderShell: {
      marginTop: 20,
      borderRadius: 24,
      padding: 1,
      background:
        "linear-gradient(140deg, rgba(255,80,40,0.55), rgba(40,0,0,0.9))",
      boxShadow: "0 20px 40px rgba(0,0,0,0.9)",
    },
    orderBox: {
      borderRadius: 22,
      padding: 14,
      background:
        "radial-gradient(circle at top, rgba(255,60,0,0.24), transparent 60%), linear-gradient(160deg,#150000,#040404)",
    },
    orderHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 12,
    },
    orderMini: {
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "rgba(255,210,200,0.95)",
    },
    orderTitle: {
      fontSize: 18,
      fontWeight: 900,
      textTransform: "uppercase",
      marginTop: 4,
    },
    orderPrice: {
      borderRadius: 16,
      padding: "8px 11px",
      minWidth: 110,
      textAlign: "right",
      border: "1px solid rgba(255,200,190,0.55)",
      background:
        "radial-gradient(circle at top, rgba(255,120,80,0.22), transparent 60%)",
      color: "#ffe0d6",
      fontWeight: 900,
      fontSize: 15,
    },
    orderInputsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginBottom: 10,
      marginTop: 4,
    },
    inputLabel: {
      fontSize: 11,
      color: "rgba(255,255,255,0.75)",
      marginBottom: 4,
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      background: "rgba(0,0,0,0.74)",
      border: "1px solid rgba(255,255,255,0.16)",
      borderRadius: 14,
      color: "#fff",
      padding: "12px 12px",
      fontSize: 14,
      outline: "none",
    },
    paymentRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
      marginTop: 6,
      marginBottom: 10,
    },
    paymentBtn: (active, red = false) => ({
      borderRadius: 14,
      padding: "11px 10px",
      fontWeight: 800,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all .18s ease",
      fontSize: 11,
      letterSpacing: 0.8,
      border: active
        ? `1px solid ${red ? "#ff4b4b" : "#ffffff"}`
        : `1px solid ${red ? "rgba(255,0,0,0.45)" : "rgba(255,255,255,0.14)"}`,
      background: active
        ? red
          ? "linear-gradient(145deg,#ff2626,#b00909)"
          : "linear-gradient(145deg,#ffffff,#b7b7b7)"
        : red
          ? "rgba(70,0,0,0.9)"
          : "rgba(0,0,0,0.9)",
      color: active ? (red ? "#fff" : "#000") : red ? "#ffbbbb" : "#ffffff",
      boxShadow: active
        ? red
          ? "0 0 20px rgba(255,0,0,0.55)"
          : "0 0 16px rgba(255,255,255,0.45)"
        : "none",
    }),
    summary: {
      background: "rgba(0,0,0,0.68)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 16,
      padding: 12,
      color: "rgba(255,255,255,0.88)",
      whiteSpace: "pre-line",
      fontSize: 12,
      marginTop: 4,
    },
    bottomRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1.15fr",
      gap: 8,
      marginTop: 12,
    },
    managerBtn: {
      border: "none",
      background:
        "linear-gradient(135deg, rgba(40,40,40,0.98), rgba(0,0,0,0.98))",
      color: "#fff",
      borderRadius: 14,
      padding: "11px 10px",
      fontWeight: 800,
      cursor: "pointer",
      textTransform: "uppercase",
      fontSize: 11,
      letterSpacing: 0.9,
      transition: "all .18s ease",
      borderTop: "1px solid rgba(255,255,255,0.12)",
    },
    orderBtn: {
      border: "none",
      background:
        "radial-gradient(circle at top, rgba(255,255,255,0.16), transparent 60%), linear-gradient(150deg,#ff2727,#ad0505)",
      color: "#fff",
      borderRadius: 14,
      padding: "11px 10px",
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      fontSize: 12,
      letterSpacing: 1,
      transition: "all .18s ease",
      boxShadow: "0 0 24px rgba(255,0,0,0.75)",
    },
    checkoutWrap: {
      marginTop: 18,
      borderRadius: 24,
      padding: 1,
      background:
        "linear-gradient(135deg, rgba(255,110,70,0.65), rgba(20,0,0,1))",
      boxShadow: "0 20px 40px rgba(0,0,0,0.9)",
    },
    checkoutInner: {
      borderRadius: 22,
      padding: 14,
      background:
        "radial-gradient(circle at top, rgba(255,70,40,0.22), transparent 60%), linear-gradient(160deg,#110000,#050505)",
    },
    checkoutHeaderRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
      gap: 10,
      flexWrap: "wrap",
    },
    checkoutTitle: {
      fontSize: 16,
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: 1.5,
    },
    checkoutBadge: {
      padding: "5px 9px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.4)",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1.3,
      color: "rgba(255,255,255,0.9)",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    checkoutSecureDot: {
      width: 7,
      height: 7,
      borderRadius: "999px",
      background: "lime",
      boxShadow: "0 0 12px rgba(0,255,120,0.9)",
    },
    checkoutNote: {
      fontSize: 12,
      color: "rgba(255,255,255,0.75)",
      marginBottom: 10,
    },
    checkoutGridShell: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 10,
      alignItems: "flex-start",
    },
    fullInput: {
      width: "100%",
      boxSizing: "border-box",
      background: "rgba(0,0,0,0.82)",
      border: "1px solid rgba(255,255,255,0.16)",
      borderRadius: 14,
      color: "#fff",
      padding: "12px 12px",
      fontSize: 14,
      outline: "none",
      marginBottom: 8,
    },
    checkoutGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 8,
    },
    checkoutSummary: {
      borderRadius: 16,
      padding: 10,
      background: "rgba(0,0,0,0.82)",
      border: "1px solid rgba(255,255,255,0.15)",
      fontSize: 11,
      whiteSpace: "pre-line",
      color: "rgba(255,255,255,0.86)",
    },
    checkoutPriceTag: {
      marginTop: 6,
      fontWeight: 800,
      fontSize: 13,
      textAlign: "right",
      color: "rgba(255,220,210,0.95)",
    },
    payNowBtn: {
      border: "none",
      width: "100%",
      background:
        "radial-gradient(circle at top, rgba(255,255,255,0.18), transparent 60%), linear-gradient(155deg,#ff2626,#a90606)",
      color: "#fff",
      borderRadius: 14,
      padding: 13,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      boxShadow: "0 0 26px rgba(255,0,0,0.85)",
      marginTop: 4,
      fontSize: 12,
      letterSpacing: 1.1,
      transition: "all .18s ease",
    },
    checkoutMessage: {
      marginTop: 10,
      borderRadius: 14,
      padding: "10px 12px",
      background: "rgba(255,0,0,0.12)",
      border: "1px solid rgba(255,0,0,0.4)",
      color: "#ffd5d5",
      fontSize: 12,
    },
    telegramWalletBtn: {
      width: "100%",
      marginTop: 8,
      borderRadius: 14,
      padding: 11,
      fontWeight: 800,
      fontSize: 11,
      letterSpacing: 0.9,
      textTransform: "uppercase",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      background:
        "linear-gradient(145deg, rgba(8,8,8,0.98), rgba(5,20,30,0.98))",
      border: "1px solid rgba(120,200,255,0.45)",
      color: "rgba(220,240,255,0.96)",
      boxShadow: "0 0 18px rgba(0,0,0,0.9)",
    },
    telegramWalletIcon: {
      width: 16,
      height: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0.9,
    },
    telegramWalletText: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    paySelectorShell: {
      marginTop: 14,
      borderRadius: 20,
      padding: 1,
      background:
        "linear-gradient(145deg, rgba(255,100,60,0.35), rgba(212,175,55,0.12), rgba(20,0,0,0.95))",
      boxShadow:
        "0 12px 32px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,80,50,0.15)",
    },
    paySelectorInner: {
      borderRadius: 19,
      overflow: "hidden",
      background:
        "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255,60,40,0.12), transparent 50%), linear-gradient(165deg, #0c0808 0%, #080606 100%)",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    paySelectorHeader: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "14px 16px",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      textAlign: "left",
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
    },
    paySelectorTitle: {
      fontSize: 15,
      fontWeight: 900,
      letterSpacing: 0.8,
      textTransform: "uppercase",
      color: "rgba(255,240,230,0.98)",
      textShadow: "0 0 20px rgba(255,100,60,0.25)",
    },
    paySelectorChevron: (open) => ({
      flexShrink: 0,
      width: 22,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      background: "rgba(0,0,0,0.45)",
      border: "1px solid rgba(212,175,55,0.25)",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }),
    paySelectorBody: {
      overflow: "hidden",
      transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
    },
    paySelectorBodyInner: {
      padding: "4px 12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    payMethodCard: (selected) => ({
      borderRadius: 18,
      padding: "14px 14px",
      cursor: "pointer",
      textAlign: "left",
      border: selected
        ? "1px solid rgba(212,175,55,0.65)"
        : "1px solid rgba(255,255,255,0.08)",
      background: selected
        ? "radial-gradient(ellipse 100% 120% at 50% 0%, rgba(212,175,55,0.14), transparent 55%), linear-gradient(160deg, rgba(30,12,8,0.95), rgba(8,6,6,0.98))"
        : "linear-gradient(160deg, rgba(14,12,12,0.96), rgba(6,6,8,0.98))",
      boxShadow: selected
        ? "0 0 0 1px rgba(255,200,100,0.15), 0 8px 28px rgba(0,0,0,0.75), 0 0 24px rgba(212,175,55,0.12)"
        : "0 6px 20px rgba(0,0,0,0.5)",
      transition:
        "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease",
      WebkitTapHighlightColor: "transparent",
      touchAction: "manipulation",
    }),
    payMethodRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    },
    payMethodEmoji: {
      fontSize: 22,
      lineHeight: 1,
      flexShrink: 0,
      filter: "saturate(0.85) brightness(1.05)",
      opacity: 0.92,
    },
    payMethodTitle: {
      fontSize: 14,
      fontWeight: 800,
      color: "rgba(255,248,240,0.98)",
      letterSpacing: 0.2,
    },
    payMethodDesc: {
      fontSize: 12,
      color: "rgba(255,255,255,0.58)",
      marginTop: 4,
      lineHeight: 1.45,
    },
    payCryptoHeader: (selected, open) => ({
      borderRadius: 18,
      padding: "14px 14px",
      cursor: "pointer",
      textAlign: "left",
      width: "100%",
      boxSizing: "border-box",
      border: selected
        ? "1px solid rgba(180,220,255,0.35)"
        : "1px solid rgba(255,255,255,0.08)",
      background:
        "linear-gradient(160deg, rgba(12,14,18,0.96), rgba(6,8,10,0.98))",
      boxShadow: selected
        ? "0 0 20px rgba(100,180,255,0.08)"
        : "0 6px 20px rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      transition: "all 0.22s ease",
      WebkitTapHighlightColor: "transparent",
    }),
    payCryptoChevron: (open) => ({
      flexShrink: 0,
      width: 22,
      height: 22,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      background: "rgba(0,0,0,0.4)",
      border: "1px solid rgba(120,200,255,0.2)",
      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }),
    payCryptoSubWrap: {
      overflow: "hidden",
      transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    payCryptoSubInner: {
      paddingTop: 8,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    paySubCard: (selected) => ({
      borderRadius: 16,
      padding: "12px 14px",
      cursor: "pointer",
      textAlign: "left",
      border: selected
        ? "1px solid rgba(212,175,55,0.5)"
        : "1px solid rgba(255,255,255,0.07)",
      background: selected
        ? "rgba(212,175,55,0.06)"
        : "rgba(0,0,0,0.35)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      WebkitTapHighlightColor: "transparent",
    }),
    paySubTitle: {
      fontSize: 13,
      fontWeight: 800,
      color: "rgba(255,245,235,0.95)",
    },
    paySubDesc: {
      fontSize: 11,
      color: "rgba(255,255,255,0.52)",
      marginTop: 3,
      lineHeight: 1.4,
    },
    payProceedBtn: (enabled) => ({
      width: "100%",
      marginTop: 4,
      border: "none",
      borderRadius: 16,
      padding: "15px 16px",
      fontWeight: 900,
      fontSize: 13,
      letterSpacing: 1,
      textTransform: "uppercase",
      cursor: enabled ? "pointer" : "not-allowed",
      opacity: enabled ? 1 : 0.5,
      background: enabled
        ? "radial-gradient(circle at top, rgba(255,220,180,0.12), transparent 55%), linear-gradient(155deg, #e85a2a, #8f1808)"
        : "linear-gradient(155deg, #2a2220, #1a1515)",
      color: enabled ? "#fff" : "rgba(255,255,255,0.45)",
      boxShadow: enabled
        ? "0 0 28px rgba(255,80,40,0.45), 0 8px 24px rgba(0,0,0,0.6)"
        : "none",
      transition: "all 0.2s ease",
    }),
    footerName: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontWeight: 700,
      color: "#ffffff",
      padding: "18px 0 8px",
      fontSize: 13,
    },
    footerTelegramBadge: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      padding: "6px 12px",
      borderRadius: 999,
      background: "rgba(5,5,5,0.78)",
      border: "1px solid rgba(255,255,255,0.16)",
      boxShadow: "0 0 18px rgba(0,0,0,0.85)",
      backdropFilter: "blur(12px)",
      maxWidth: "100%",
    },
    footerTelegramText: {
      fontSize: 13,
      fontWeight: 600,
      color: "#ffffff",
      whiteSpace: "nowrap",
    },
      cryptoToast: {
        position: "fixed",
        left: "50%",
        bottom: 22,
        transform: "translateX(-50%)",
        zIndex: 50,
      },
      cryptoToastInner: {
        minWidth: 260,
        maxWidth: 320,
        padding: "10px 14px",
        borderRadius: 16,
        background:
          "linear-gradient(140deg, rgba(10,10,10,0.98), rgba(25,0,0,0.98))",
        border: "1px solid rgba(255,120,80,0.75)",
        boxShadow:
          "0 0 22px rgba(255,40,0,0.7), 0 14px 32px rgba(0,0,0,0.95)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12,
        color: "rgba(255,230,220,0.96)",
      },
      cryptoToastAccentDot: {
        width: 8,
        height: 8,
        borderRadius: "999px",
        background:
          "radial-gradient(circle at center, rgba(255,255,255,1) 0, rgba(255,80,40,1) 45%, transparent 70%)",
        boxShadow: "0 0 14px rgba(255,70,0,0.9)",
        flexShrink: 0,
      },
      cryptoToastClose: {
        marginLeft: "auto",
        border: "none",
        background: "transparent",
        color: "rgba(255,255,255,0.65)",
        fontSize: 14,
        cursor: "pointer",
        padding: 0,
      },
      tonFallbackOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
        padding: 16,
      },
      tonFallbackCard: {
        maxWidth: 360,
        width: "100%",
        borderRadius: 20,
        padding: 16,
        background:
          "linear-gradient(145deg, rgba(10,10,10,0.98), rgba(30,0,0,0.98))",
        border: "1px solid rgba(255,120,80,0.8)",
        boxShadow:
          "0 0 24px rgba(0,0,0,1), 0 0 30px rgba(255,40,0,0.8)",
        color: "#fff",
        fontSize: 13,
      },
      tonFallbackTitle: {
        fontSize: 15,
        fontWeight: 800,
        textTransform: "uppercase",
        marginBottom: 8,
      },
      tonFallbackText: {
        fontSize: 12,
        color: "rgba(255,235,225,0.9)",
        marginBottom: 10,
      },
      tonFallbackAddressBox: {
        borderRadius: 14,
        padding: 10,
        background: "rgba(0,0,0,0.9)",
        border: "1px solid rgba(255,255,255,0.16)",
        wordBreak: "break-all",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: 11,
        marginBottom: 10,
      },
      tonFallbackActionsRow: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 4,
      },
      tonFallbackButton: {
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 0.9,
        border: "1px solid rgba(255,255,255,0.35)",
        background:
          "linear-gradient(145deg, rgba(10,10,10,1), rgba(40,0,0,1))",
        color: "#fff",
        cursor: "pointer",
      },
      tonFallbackCopyButton: {
        borderRadius: 999,
        padding: "8px 12px",
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 0.9,
        border: "1px solid rgba(120,200,255,0.9)",
        background:
          "linear-gradient(145deg, rgba(8,20,30,1), rgba(5,5,5,1))",
        color: "rgba(220,240,255,0.98)",
        cursor: "pointer",
      },
  };

  const paymentLabelRu = (() => {
    switch (selectedMethod) {
      case "card_international":
        return "Карта (США / Европа)";
      case "card_russia":
        return "Карта (Россия)";
      case "crypto_nowpayments":
        return "USDT / BTC";
      case "telegram_wallet":
        return "Telegram Wallet";
      default:
        return "Не выбран";
    }
  })();

  const CRYPTO_MIN_USD = 10;
  const orderAmountUsd = getOrderTotalUSD();
  const isCryptoNowpayments = selectedMethod === "crypto_nowpayments";
  const isCryptoEligible = !isCryptoNowpayments || orderAmountUsd >= CRYPTO_MIN_USD;

  const payProceedEnabled =
    !!selectedMethod && !cardPaymentLoading && isCryptoEligible;

  const summaryText = `НОВЫЙ ЗАКАЗ — PUNCHER SHOP

Пакет: ${selectedProduct.name}
Цена: ${getPrice(selectedProduct)}
${
    selectedMethod === "telegram_wallet"
      ? `К оплате в TON: ${getOrderTotalTON()} TON\n`
      : ""
}Валюта отображения: ${currency}
Способ оплаты: ${paymentLabelRu}

PUBG ID: ${pubgID || "—"}
Ник: ${nickname || "—"}
Контакт: ${contact || "—"}`;

  return (
    <div style={styles.page}>
      <style>{`
        .hover-lift {
          transition: transform .16s ease, filter .16s ease, box-shadow .16s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px) scale(1.02);
          filter: brightness(1.04);
        }
        .hover-lift:active {
          transform: translateY(0) scale(0.98);
          filter: brightness(0.98);
        }
        .hover-glow:hover {
          box-shadow: 0 0 22px rgba(255,0,0,0.40);
        }
        .card-interactive {
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .card-interactive:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 26px rgba(255,0,0,0.55);
          border-color: rgba(255,90,70,0.98) !important;
        }
        .card-interactive:active {
          transform: translateY(1px) scale(0.98);
        }
        .pay-method-card-interactive:hover {
          transform: scale(1.012);
          box-shadow: 0 10px 28px rgba(0,0,0,0.65), 0 0 20px rgba(255,60,40,0.08);
        }
        .pay-method-card-interactive:active {
          transform: scale(0.992);
        }
        .pay-method-selected.pay-method-card-interactive:hover {
          box-shadow: 0 0 0 1px rgba(255,200,100,0.2), 0 10px 32px rgba(0,0,0,0.75), 0 0 28px rgba(212,175,55,0.14);
        }

        .payCard {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .payCard::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 20px;
          background: radial-gradient(80% 110% at 20% 0%, var(--accent, rgba(255,70,40,0.6)) 0%, transparent 55%);
          opacity: 0;
          filter: blur(14px);
          transition: opacity 0.28s ease;
          pointer-events: none;
        }
        .payCard::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 18px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .payCard:hover::before { opacity: 0.7; }
        .payCardSelected {
          animation: paySelectedGlow 1.8s ease-in-out infinite;
        }
        @keyframes paySelectedGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.06); }
        }
        .payCardHoverLift {
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
        }
        .payCardHoverLift:hover { transform: translateY(-2px) scale(1.014); }
        .payCardHoverLift:active { transform: translateY(0) scale(0.992); }

        .accordionInner {
          transform-origin: top;
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .flagBadge {
          border-radius: 10px;
          padding: 6px;
          background: linear-gradient(145deg, rgba(10,10,10,0.88), rgba(20,0,0,0.78));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 0 0 1px rgba(255,150,90,0.06), 0 10px 18px rgba(0,0,0,0.7);
          transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease, filter 0.22s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .payCardHoverLift:hover .flagBadge {
          border-color: rgba(255,170,120,0.22);
          box-shadow: 0 0 0 1px rgba(255,170,120,0.12), 0 0 18px rgba(255,140,80,0.10), 0 12px 24px rgba(0,0,0,0.72);
          filter: brightness(1.03);
        }

        .cryptoStackGlow {
          transition: filter 0.25s ease, transform 0.25s ease;
          will-change: filter, transform;
        }
        .payCardHoverLift:hover .cryptoStackGlow {
          filter: drop-shadow(0 0 16px rgba(80, 255, 210, 0.18)) drop-shadow(0 0 16px rgba(80, 170, 255, 0.14));
          transform: translateY(-0.5px);
        }

        .npCard {
          position: relative;
        }
        .npCard::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
        }
        .npCard::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 18px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.28s ease;
          background: linear-gradient(135deg, rgba(80,255,210,0.38), rgba(255,140,40,0.32), rgba(140,200,255,0.18));
          filter: blur(10px);
        }
        .payCardHoverLift:hover.npCard::after { opacity: 0.65; }
        .npGatewayTag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 8px;
          border-radius: 999px;
          background: rgba(0,0,0,0.46);
          border: 1px solid rgba(120,255,210,0.18);
          color: rgba(220,255,245,0.88);
          font-size: 10px;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          box-shadow: 0 0 18px rgba(80,255,210,0.06);
        }
        .npPulse {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(80,255,210,0.9), rgba(0,0,0,0));
          box-shadow: 0 0 14px rgba(80,255,210,0.35);
          opacity: 0.85;
        }

        .tgBadgeIcon {
          transition: transform 0.22s ease, filter 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
          will-change: transform, filter;
        }
        .payCardHoverLift:hover .tgBadgeIcon {
          transform: translateY(-0.5px);
          border-color: rgba(120,200,255,0.38) !important;
          box-shadow: 0 0 18px rgba(34, 158, 217, 0.22) !important;
          filter: drop-shadow(0 0 14px rgba(34, 158, 217, 0.22));
        }
      `}</style>

      <div style={styles.pageGlowLeft} />
      <div style={styles.pageGlowRight} />

      <div style={styles.app}>
        <header style={styles.header} />

        <main style={styles.content}>
          <section style={styles.heroShell}>
            <div style={styles.heroBannerCard}>
              <div style={styles.heroBannerInner}>
                <div style={styles.heroBannerTagRow}>
                  <div style={styles.heroBannerTag}>PUBG MOBILE UC</div>
                </div>
                <div style={styles.heroOfficialBadge}>
                  <span style={styles.heroOfficialDot} />
                  <span>ОФИЦИАЛЬНАЯ UC ЗОНА</span>
                </div>
              </div>
            </div>

            <div style={styles.heroTopTextCard}>
              <div style={styles.heroLabel}>PUBG MOBILE UC</div>
              <div style={styles.heroTitle}>Премиальный магазин UC внутри Telegram</div>
              <div style={styles.heroSubtitle}>
                Безопасная покупка UC для PUBG Mobile прямо внутри Telegram Mini App. Быстрая
                доставка, официальный сервис и удобный игровой интерфейс.
              </div>

              <div style={styles.heroFeatureBadgesRow}>
                <div className="hover-lift hover-glow" style={styles.heroStat}>
                  <div style={styles.heroStatHeader}>
                    <div style={styles.heroStatIcon}>🚀</div>
                    <div style={styles.heroStatLabel}>Доставка</div>
                  </div>
                  <div style={styles.heroStatValue}>5–15 мин</div>
                </div>
                <div className="hover-lift hover-glow" style={styles.heroStat}>
                  <div style={styles.heroStatHeader}>
                    <div style={styles.heroStatIcon}>🛡️</div>
                    <div style={styles.heroStatLabel}>Гарантия</div>
                  </div>
                  <div style={styles.heroStatValue}>100% UC</div>
                </div>
                <div className="hover-lift hover-glow" style={styles.heroStat}>
                  <div style={styles.heroStatHeader}>
                    <div style={styles.heroStatIcon}>🎧</div>
                    <div style={styles.heroStatLabel}>Поддержка</div>
                  </div>
                  <div style={styles.heroStatValue}>24/7</div>
                </div>
              </div>
            </div>

            <div style={styles.heroSelectedCard}>
              <div style={styles.heroBadge}>
                <span style={styles.heroBadgeLabel}>Выбранный пак</span>
                <span style={styles.heroBadgeValue}>{selectedProduct.name}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "rgba(255,230,220,0.9)" }}>
                Компактное резюме активного пакета UC и его стоимости.
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                {getPrice(selectedProduct)}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: "rgba(255,210,200,0.9)",
                }}
              >
                Премиальная покупка UC с прозрачной финальной ценой.
              </div>
            </div>
          </section>

          <section style={styles.heroCurrenciesRow}>
            <div style={styles.currencyRow}>
              {["USD", "EUR", "RUB"].map((cur) => (
                <button
                  key={cur}
                  className="hover-lift hover-glow"
                  style={styles.currencyBtn(currency === cur)}
                  onClick={() => setCurrency(cur)}
                >
                  {cur}
                </button>
              ))}
            </div>
            <div style={styles.currencyNote}>Цены пересчитываются под выбранную валюту.</div>
          </section>

          <div style={styles.sectionHeadingRow}>
            <div>
              <div style={styles.sectionTitle}>Выберите UC пак</div>
              <div style={styles.sectionSub}>Премиальные карты UC, 2 пакета в ряд</div>
            </div>
          </div>

          <section style={styles.productsGrid}>
            {products.map((product, index) => {
              const isSelected = selectedProduct.id === product.id;
              const isHot = index === 2 || index === 3 || index === 4;

              return (
                <article
                  key={product.id}
                  className="card-interactive hover-lift hover-glow"
                  style={styles.productCard(isSelected)}
                >
                  {isHot && <div style={styles.productHot}>Топ продаж</div>}
                  <div style={styles.cardGlowBottom} />

                  <div style={styles.productImageWrap}>
                    <img
                      src={ucIcon}
                      alt="PUBG Mobile UC"
                      style={styles.ucImage}
                    />
                  </div>

                  <div style={styles.productBody}>
                    <div style={styles.productName}>{product.name}</div>
                    <div style={styles.productPriceRow}>
                      <div style={styles.oldPrice}>{oldPrice(product)}</div>
                      <div style={styles.productPrice}>{getPrice(product)}</div>
                    </div>
                    <div style={styles.productHint}>
                      Мгновенное начисление UC после успешной оплаты.
                    </div>
                  </div>

                  <button
                    className="hover-lift hover-glow"
                    style={styles.chooseBtn}
                    onClick={() => setSelectedProduct(product)}
                  >
                    BUY
                  </button>
                </article>
              );
            })}
          </section>

          <section style={styles.orderShell}>
            <div style={styles.orderBox}>
              <div style={styles.orderHead}>
                <div>
                  <div style={styles.orderMini}>Шаг 1 — данные аккаунта</div>
                  <div style={styles.orderTitle}>{selectedProduct.name}</div>
                </div>
                <div style={styles.orderPrice}>{getPrice(selectedProduct)}</div>
              </div>

              <div style={styles.orderInputsGrid}>
                <div>
                  <div style={styles.inputLabel}>PUBG ID</div>
                  <input
                    style={styles.input}
                    placeholder="Введите PUBG ID"
                    value={pubgID}
                    onChange={(e) => setPubgID(e.target.value)}
                  />
                </div>
                <div>
                  <div style={styles.inputLabel}>Никнейм в игре</div>
                  <input
                    style={styles.input}
                    placeholder="Введите ник"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div>
                  <div style={styles.inputLabel}>Контакт для связи</div>
                  <input
                    style={styles.input}
                    placeholder="Telegram @username или номер"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              <div style={styles.paySelectorShell}>
                <div style={styles.paySelectorInner}>
                  <button
                    type="button"
                    style={styles.paySelectorHeader}
                    onClick={() => setPaymentPanelOpen((o) => !o)}
                    aria-expanded={paymentPanelOpen}
                  >
                    <span style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", minWidth: 0 }}>
                      <span style={styles.paySelectorTitle}>
                        {paymentPanelOpen
                          ? "Выберите способ оплаты"
                          : "Выбрать способ оплаты"}
                      </span>
                      {!paymentPanelOpen && selectedMethod ? (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "rgba(212,175,55,0.85)",
                            textTransform: "none",
                            letterSpacing: 0.2,
                            lineHeight: 1.3,
                          }}
                        >
                          {paymentLabelRu}
                        </span>
                      ) : null}
                    </span>
                    <span style={styles.paySelectorChevron(paymentPanelOpen)}>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(212,175,55,0.85)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </button>
                  <div
                    style={{
                      ...styles.paySelectorBody,
                      maxHeight: paymentPanelOpen ? 1600 : 0,
                      opacity: paymentPanelOpen ? 1 : 0,
                    }}
                  >
                    <div style={styles.paySelectorBodyInner}>
                      <button
                        type="button"
                        className={`pay-method-card-interactive payCard payCardHoverLift ${selectedMethod === "card_international" ? "pay-method-selected payCardSelected" : ""}`}
                        style={{
                          ...styles.payMethodCard(selectedMethod === "card_international"),
                          border: selectedMethod === "card_international"
                            ? "1px solid rgba(170, 215, 255, 0.72)"
                            : "1px solid rgba(255,255,255,0.08)",
                          background: selectedMethod === "card_international"
                            ? "radial-gradient(ellipse 110% 140% at 40% 0%, rgba(120, 190, 255, 0.14), transparent 60%), linear-gradient(160deg, rgba(10,12,18,0.96), rgba(6,6,10,0.98))"
                            : "linear-gradient(160deg, rgba(12,12,16,0.96), rgba(6,6,10,0.98))",
                          ["--accent"]: "rgba(120, 200, 255, 0.62)",
                        }}
                        onClick={() => {
                          setSelectedMethod("card_international");
                          setCryptoAccordionOpen(false);
                        }}
                      >
                        <div style={styles.payMethodRow}>
                          <PremiumCardIcon tone="cool" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={styles.payMethodTitle}>
                              Оплата картой (США / Европа)
                            </div>
                            <div style={styles.payMethodDesc}>
                              Visa / Mastercard, быстрый и безопасный платеж
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        className={`pay-method-card-interactive payCard payCardHoverLift ${selectedMethod === "card_russia" ? "pay-method-selected payCardSelected" : ""}`}
                        style={{
                          ...styles.payMethodCard(selectedMethod === "card_russia"),
                          border: selectedMethod === "card_russia"
                            ? "1px solid rgba(255, 210, 140, 0.70)"
                            : "1px solid rgba(255,255,255,0.08)",
                          background: selectedMethod === "card_russia"
                            ? "radial-gradient(ellipse 110% 140% at 40% 0%, rgba(255, 190, 120, 0.14), transparent 60%), linear-gradient(160deg, rgba(18,12,8,0.96), rgba(6,6,8,0.98))"
                            : "linear-gradient(160deg, rgba(14,12,12,0.96), rgba(6,6,8,0.98))",
                          ["--accent"]: "rgba(255, 190, 120, 0.62)",
                        }}
                        onClick={() => {
                          setSelectedMethod("card_russia");
                          setCryptoAccordionOpen(false);
                        }}
                      >
                        <div style={styles.payMethodRow}>
                          <span className="flagBadge">
                            <RussiaFlagIcon />
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={styles.payMethodTitle}>
                              Оплата картой (Россия)
                            </div>
                            <div style={styles.payMethodDesc}>
                              Локальные способы оплаты для РФ
                            </div>
                          </div>
                        </div>
                      </button>

                      <div>
                        <button
                          type="button"
                          className="pay-method-card-interactive payCard payCardHoverLift"
                          style={styles.payCryptoHeader(
                            selectedMethod === "crypto_nowpayments" ||
                              selectedMethod === "telegram_wallet",
                            cryptoAccordionOpen
                          )}
                          onClick={() =>
                            setCryptoAccordionOpen((c) => !c)
                          }
                          aria-expanded={cryptoAccordionOpen}
                        >
                          <div style={styles.payMethodRow}>
                            <span className="cryptoStackGlow">
                              <CryptoStackIcon />
                            </span>
                            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                              <div style={styles.payMethodTitle}>Криптовалюта</div>
                              <div style={styles.payMethodDesc}>
                                USDT, BTC, Telegram Wallet (TON)
                              </div>
                            </div>
                          </div>
                          <span style={styles.payCryptoChevron(cryptoAccordionOpen)}>
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="rgba(140,200,255,0.75)"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </button>
                        <div
                          style={{
                            ...styles.payCryptoSubWrap,
                            maxHeight: cryptoAccordionOpen ? 320 : 0,
                          }}
                        >
                          <div
                            className="accordionInner"
                            style={{
                              ...styles.payCryptoSubInner,
                              opacity: cryptoAccordionOpen ? 1 : 0,
                              transform: cryptoAccordionOpen ? "translateY(0)" : "translateY(-6px)",
                            }}
                          >
                            <button
                              type="button"
                              className={`pay-method-card-interactive payCard payCardHoverLift npCard ${selectedMethod === "crypto_nowpayments" ? "pay-method-selected payCardSelected" : ""}`}
                              style={{
                                ...styles.paySubCard(selectedMethod === "crypto_nowpayments"),
                                border:
                                  selectedMethod === "crypto_nowpayments"
                                    ? "1px solid rgba(120, 255, 210, 0.55)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                background:
                                  selectedMethod === "crypto_nowpayments"
                                    ? "radial-gradient(ellipse 120% 150% at 40% 0%, rgba(80, 255, 210, 0.12), transparent 60%), radial-gradient(ellipse 120% 150% at 80% 0%, rgba(255, 140, 40, 0.08), transparent 62%), rgba(0,0,0,0.35)"
                                    : "rgba(0,0,0,0.35)",
                                ["--accent"]: "rgba(80, 255, 210, 0.62)",
                              }}
                              onClick={() => {
                                setCryptoAccordionOpen(true);
                                setSelectedMethod("crypto_nowpayments");
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: 0.95 }}>
                                  <NowPaymentsDualCoinIcon size={20} />
                                </span>
                                <div style={{ minWidth: 0 }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                                    <div style={{ ...styles.paySubTitle, fontSize: 14, fontWeight: 900 }}>
                                      USDT / BTC
                                    </div>
                                  </div>
                                  <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                    <span className="npGatewayTag">
                                      <span className="npPulse" />
                                      Gateway
                                    </span>
                                    <div style={{ ...styles.paySubDesc, marginTop: 0, color: "rgba(255,255,255,0.50)" }}>
                                      Оплата через криптовалюту
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                            <button
                              type="button"
                              className={`pay-method-card-interactive payCard payCardHoverLift ${selectedMethod === "telegram_wallet" ? "pay-method-selected payCardSelected" : ""}`}
                              style={{
                                ...styles.paySubCard(selectedMethod === "telegram_wallet"),
                                border:
                                  selectedMethod === "telegram_wallet"
                                    ? "1px solid rgba(120, 200, 255, 0.60)"
                                    : "1px solid rgba(255,255,255,0.07)",
                                background:
                                  selectedMethod === "telegram_wallet"
                                    ? "radial-gradient(ellipse 120% 150% at 40% 0%, rgba(120, 200, 255, 0.12), transparent 60%), rgba(0,0,0,0.35)"
                                    : "rgba(0,0,0,0.35)",
                                ["--accent"]: "rgba(120, 200, 255, 0.62)",
                              }}
                              onClick={() => {
                                setCryptoAccordionOpen(true);
                                setSelectedMethod("telegram_wallet");
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span
                                  className="tgBadgeIcon"
                                  style={{
                                    width: 22,
                                    height: 22,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 8,
                                    background: "rgba(0,0,0,0.35)",
                                    border: "1px solid rgba(120,200,255,0.25)",
                                    boxShadow: "0 0 14px rgba(34,158,217,0.10)",
                                  }}
                                >
                                  <TelegramIcon />
                                </span>
                                <div style={{ minWidth: 0 }}>
                                  <div style={styles.paySubTitle}>Telegram Wallet</div>
                                  <div style={styles.paySubDesc}>Быстрая оплата через Telegram</div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>

                      {selectedMethod === "crypto_nowpayments" ? (
                        <CryptoPaymentBlock
                          orderAmountUsd={orderAmountUsd}
                          minUsd={CRYPTO_MIN_USD}
                        />
                      ) : null}

                      <button
                        type="button"
                        className="hover-lift hover-glow"
                        style={styles.payProceedBtn(payProceedEnabled)}
                        disabled={!selectedMethod || cardPaymentLoading || !isCryptoEligible}
                        aria-busy={cardPaymentLoading}
                        onClick={handleProceedToPayment}
                      >
                        {selectedMethod === "crypto_nowpayments"
                          ? "Оплатить криптовалютой"
                          : "Перейти к оплате"}
                      </button>

                      <ProcessingState
                        isProcessing={cardPaymentLoading}
                        attemptKey={processingAttempt}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.summary}>{summaryText}</div>

              <div style={{ marginTop: 12 }}>
                <button
                  className="hover-lift"
                  style={{
                    ...styles.managerBtn,
                    width: "100%",
                    padding: "13px 14px",
                    fontSize: 12,
                  }}
                  onClick={() => window.open("https://t.me/el_pancher", "_blank")}
                >
                  Написать менеджеру
                </button>
              </div>
            </div>
          </section>

          {checkoutMessage ? (
            <div style={{ ...styles.checkoutMessage, marginTop: 14 }}>
              {checkoutMessage}
            </div>
          ) : null}

          {cryptoComingSoonVisible ? (
            <div style={styles.cryptoToast}>
              <div style={styles.cryptoToastInner}>
                <span style={styles.cryptoToastAccentDot} />
                <span>Криптовалютная оплата скоро будет доступна.</span>
                <button
                  type="button"
                  style={styles.cryptoToastClose}
                  onClick={() => setCryptoComingSoonVisible(false)}
                >
                  ×
                </button>
              </div>
            </div>
          ) : null}

          {showTonFallback ? (
            <div style={styles.tonFallbackOverlay}>
              <div style={styles.tonFallbackCard}>
                <div style={styles.tonFallbackTitle}>TON оплата вручную</div>
                <div style={styles.tonFallbackText}>
                  TON Connect недоступен. Скопируй адрес кошелька и отправь
                  перевод вручную через Telegram Wallet или другое TON-приложение.
                </div>
                <div style={styles.tonFallbackAddressBox}>
                  {TON_WALLET_ADDRESS}
                </div>
                <div style={styles.tonFallbackActionsRow}>
                  <button
                    type="button"
                    style={styles.tonFallbackButton}
                    onClick={() => setShowTonFallback(false)}
                  >
                    Закрыть
                  </button>
                  <button
                    type="button"
                    style={styles.tonFallbackCopyButton}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(TON_WALLET_ADDRESS);
                        setCheckoutMessage("Адрес TON кошелька скопирован.");
                      } catch {
                        setCheckoutMessage(
                          "Не удалось скопировать автоматически. Скопируй адрес вручную."
                        );
                      }
                    }}
                  >
                    Скопировать адрес
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div style={styles.footerName}>
            <div style={styles.footerTelegramBadge}>
              <TelegramIcon />
              <span style={styles.footerTelegramText}>puncher_shop</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}