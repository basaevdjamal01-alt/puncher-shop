import React from "react";

function CryptoMiniIcon({ tone }) {
  const color =
    tone === "success" ? "rgba(80,255,210,0.95)" : "rgba(255,160,90,0.95)";

  return (
    <span
      aria-hidden="true"
      style={{
        width: 34,
        height: 34,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        background:
          tone === "success"
            ? "radial-gradient(circle at top, rgba(80,255,210,0.18), transparent 58%), rgba(0,0,0,0.32)"
            : "radial-gradient(circle at top, rgba(255,140,40,0.18), transparent 58%), rgba(0,0,0,0.32)",
        border:
          tone === "success"
            ? "1px solid rgba(80,255,210,0.28)"
            : "1px solid rgba(255,170,110,0.26)",
        boxShadow:
          tone === "success"
            ? "0 0 22px rgba(80,255,210,0.10)"
            : "0 0 22px rgba(255,140,40,0.12)",
        color,
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {/* Back coin (BTC-ish) */}
        <ellipse
          cx="12"
          cy="8"
          rx="7.6"
          ry="3.1"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.95"
        />
        <path
          d="M4.4 8v5.2c0 1.7 3.4 3.1 7.6 3.1s7.6-1.4 7.6-3.1V8"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.85"
          strokeLinejoin="round"
        />
        {/* Front coin (USDT-ish) */}
        <ellipse
          cx="10.2"
          cy="12.2"
          rx="6.2"
          ry="2.5"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.75"
        />
        <path
          d="M4.1 12.2v2.8c0 1.4 2.7 2.5 6.1 2.5s6.1-1.1 6.1-2.5v-2.8"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.7"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function CryptoPaymentBlock({ orderAmountUsd, minUsd = 10 }) {
  const usdRaw = typeof orderAmountUsd === "number" ? orderAmountUsd : Number(orderAmountUsd);
  const usd = Number.isFinite(usdRaw) ? usdRaw : 0;
  const isEligible = usd >= minUsd;
  const missing = Math.max(0, minUsd - usd);
  const missingFixed = missing.toFixed(2);

  const tone = isEligible ? "success" : "warning";
  const variantKey = isEligible ? "success" : "warning";

  return (
    <div style={{ width: "100%", marginTop: 2 }}>
      <style>{`
        @keyframes cryptoSuccessIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes cryptoWarnShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(1.4px); }
          50% { transform: translateX(-1.1px); }
          75% { transform: translateX(0.7px); }
        }
        @keyframes cryptoBorderPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(0,0,0,0); }
          50% { box-shadow: 0 0 26px rgba(0,0,0,0.0); }
        }
      `}</style>

      <div
        style={{
          borderRadius: 16,
          padding: "10px 12px",
          background:
            tone === "success"
              ? "linear-gradient(160deg, rgba(80,255,210,0.09), rgba(0,0,0,0.42) 55%), rgba(0,0,0,0.28)"
              : "linear-gradient(160deg, rgba(255,140,40,0.10), rgba(0,0,0,0.42) 55%), rgba(0,0,0,0.28)",
          border:
            tone === "success"
              ? "1px solid rgba(80,255,210,0.30)"
              : "1px solid rgba(255,170,110,0.28)",
          boxShadow:
            tone === "success"
              ? "0 0 0 1px rgba(80,255,210,0.07), 0 14px 28px rgba(0,0,0,0.55), 0 0 26px rgba(80,255,210,0.10)"
              : "0 0 0 1px rgba(255,140,40,0.07), 0 14px 28px rgba(0,0,0,0.55), 0 0 26px rgba(255,140,40,0.12)",
          backdropFilter: "blur(14px)",
          transition: "box-shadow 320ms ease, border-color 320ms ease, transform 320ms ease, opacity 320ms ease",
        }}
      >
        <div
          key={variantKey}
          className={isEligible ? "cryptoPaySuccess" : "cryptoPayWarning"}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            animation: isEligible
              ? "cryptoSuccessIn 320ms ease-out both"
              : "cryptoWarnShake 280ms ease-in-out both",
          }}
        >
          <CryptoMiniIcon tone={tone} />

          <div style={{ minWidth: 0, flex: 1 }}>
            {isEligible ? (
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  color: "rgba(170,255,220,0.78)",
                  marginBottom: 4,
                }}
              >
                Мин. $10
              </div>
            ) : null}

            <div
              style={{
                fontSize: 13,
                fontWeight: 900,
                lineHeight: 1.35,
                color: isEligible
                  ? "rgba(215,255,240,0.98)"
                  : "rgba(255,230,215,0.98)",
                textShadow: isEligible
                  ? "0 0 18px rgba(80,255,210,0.18)"
                  : "0 0 18px rgba(255,140,40,0.18)",
              }}
            >
              {isEligible
                ? "✅ Оплата криптовалютой доступна"
                : "💳 Минимальная сумма для оплаты криптовалютой — $10"}
            </div>

            <div
              style={{
                marginTop: 6,
                fontSize: 11,
                fontWeight: 800,
                lineHeight: 1.35,
                color: isEligible
                  ? "rgba(140,255,210,0.80)"
                  : "rgba(255,190,150,0.72)",
              }}
            >
              {isEligible
                ? "⚡ Быстрая и безопасная транзакция"
                : `⚠️ Добавьте ещё ${missingFixed} для оплаты криптовалютой`}
            </div>

            {isEligible ? null : (
              <div
                style={{
                  marginTop: 7,
                  fontSize: 11,
                  fontWeight: 800,
                  color: "rgba(255,210,190,0.72)",
                }}
              >
                💡 Увеличьте пакет, чтобы разблокировать оплату криптой
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

