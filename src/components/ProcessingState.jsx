import { useEffect, useMemo, useState } from "react";

const PROCESSING_SECONDS = 25;

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function ProcessingState({ isProcessing, attemptKey }) {
  const [remainingSeconds, setRemainingSeconds] = useState(PROCESSING_SECONDS);

  useEffect(() => {
    if (!isProcessing) return undefined;

    setRemainingSeconds(PROCESSING_SECONDS);

    const timer = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isProcessing, attemptKey]);

  const timerLabel = useMemo(
    () => formatTime(remainingSeconds),
    [remainingSeconds]
  );
  const isSlowProcessing = isProcessing && remainingSeconds === 0;

  if (!isProcessing) return null;

  return (
    <div style={styles.wrap} aria-live="polite">
      <style>{`
        @keyframes processingPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(0, 255, 210, 0); }
          50% { box-shadow: 0 0 26px rgba(0, 255, 210, 0.2); }
        }
        @keyframes processingDots {
          0%, 20% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-1px); }
          80%, 100% { opacity: 0.2; transform: translateY(0); }
        }
        @keyframes processingTimerGlow {
          0%, 100% { box-shadow: 0 0 14px rgba(0, 255, 210, 0.2); }
          50% { box-shadow: 0 0 26px rgba(0, 255, 210, 0.42); }
        }
      `}</style>

      <div style={styles.mainText}>Ваш заказ обрабатывается</div>
      <div style={styles.subText}>
        Подготавливаем безопасную оплату
        <span style={styles.dotsWrap} aria-hidden="true">
          <span style={{ ...styles.dot, animationDelay: "0ms" }} />
          <span style={{ ...styles.dot, animationDelay: "180ms" }} />
          <span style={{ ...styles.dot, animationDelay: "360ms" }} />
        </span>
      </div>

      <div style={styles.timer}>{timerLabel}</div>

      {isSlowProcessing ? (
        <div style={styles.slowText}>
          Обработка занимает больше времени, чем обычно...
        </div>
      ) : null}
    </div>
  );
}

const styles = {
  wrap: {
    marginTop: 10,
    maxWidth: "100%",
    boxSizing: "border-box",
    borderRadius: 16,
    border: "1px solid rgba(90, 245, 215, 0.36)",
    background:
      "radial-gradient(circle at top, rgba(0,255,210,0.14), transparent 62%), linear-gradient(160deg, rgba(7,20,24,0.98), rgba(4,8,12,0.98))",
    padding: "12px 12px 11px",
    textAlign: "left",
    animation: "processingPulse 1.6s ease-in-out infinite",
    boxShadow:
      "0 0 0 1px rgba(90,245,215,0.08), 0 12px 24px rgba(0,0,0,0.62), 0 0 20px rgba(0,255,210,0.12)",
  },
  mainText: {
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 0.2,
    color: "rgba(220,255,248,0.96)",
  },
  subText: {
    marginTop: 5,
    fontSize: 11,
    color: "rgba(176, 232, 223, 0.84)",
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  dotsWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "rgba(120, 255, 230, 0.95)",
    animation: "processingDots 1s ease-in-out infinite",
  },
  timer: {
    marginTop: 8,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    padding: "6px 11px",
    fontSize: 14,
    fontWeight: 900,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: 1.2,
    color: "rgba(210,255,248,0.98)",
    border: "1px solid rgba(120, 255, 230, 0.46)",
    background:
      "linear-gradient(145deg, rgba(8,18,22,0.96), rgba(4,10,14,0.98))",
    boxShadow: "0 0 18px rgba(0, 255, 210, 0.24)",
    animation: "processingTimerGlow 2s ease-in-out infinite",
  },
  slowText: {
    marginTop: 8,
    fontSize: 11,
    color: "rgba(185, 255, 240, 0.85)",
  },
};
