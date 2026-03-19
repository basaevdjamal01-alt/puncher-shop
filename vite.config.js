import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portInfoPath = path.join(__dirname, 'api', '.backend-port.json')

async function readKnownBackendPort() {
  try {
    const raw = await fs.promises.readFile(portInfoPath, 'utf8')
    const parsed = JSON.parse(raw)
    const port = Number(parsed?.port)
    return Number.isFinite(port) && port > 0 ? port : null
  } catch {
    return null
  }
}

async function probeBackendPort(port, timeoutMs = 300) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(`http://localhost:${port}/api/health`, {
      signal: controller.signal,
    })
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    return data?.ok ? port : null
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}

async function resolveBackendPort() {
  const envPort = process.env.VITE_BACKEND_PORT
    ? Number(process.env.VITE_BACKEND_PORT)
    : null
  if (envPort && Number.isFinite(envPort) && envPort > 0) return envPort

  const preferredPort = process.env.PORT_START
    ? Number(process.env.PORT_START)
    : 3001

  const maxAttempts = Number(process.env.PORT_MAX_ATTEMPTS ?? 10)
  const candidatePorts = Array.from({ length: maxAttempts }, (_, i) => preferredPort + i)

  // Backend may start slightly after Vite. Wait briefly while probing.
  const deadlineMs = Date.now() + 5000
  while (Date.now() < deadlineMs) {
    const knownPort = await readKnownBackendPort()
    if (knownPort) return knownPort

    for (const port of candidatePorts) {
      const okPort = await probeBackendPort(port)
      if (okPort) return okPort
    }

    await new Promise((r) => setTimeout(r, 250))
  }

  // Last resort: use the preferred port (might still work if backend already started).
  return preferredPort
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const backendPort = await resolveBackendPort()
  const target = `http://localhost:${backendPort}`

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/create-payment': { target, changeOrigin: true },
        '/create-nowpayment': { target, changeOrigin: true },
        '/create-paddle': { target, changeOrigin: true },
        '/create-lava': { target, changeOrigin: true },
      },
    },
  }
})
