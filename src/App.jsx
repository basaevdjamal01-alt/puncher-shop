import { useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import ucIcon from "./assets/uc-icon.png";

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
  const [payment, setPayment] = useState("CARD");
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [cryptoComingSoonVisible, setCryptoComingSoonVisible] = useState(false);
  const [showTonFallback, setShowTonFallback] = useState(false);

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

  function handleOrder() {
    if (!validateOrderFields()) return;

    if (payment === "CRYPTO") {
      handleTelegramWalletPayment();
      return;
    }

    setShowCheckout(true);
    setCheckoutMessage("");
    setTimeout(() => {
      const block = document.getElementById("checkout-block");
      if (block) block.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function handleFakePayment() {
    if (!cardNumber.trim() || !cardName.trim() || !expiry.trim() || !cvv.trim()) {
      setCheckoutMessage("Заполни данные карты.");
      return;
    }
    setCheckoutMessage(
      "Checkout работает как демо. Следующий шаг — подключить реальную оплату Stripe / crypto."
    );
  }

  function getOrderTotalUSD() {
    const usdPriceString = selectedProduct.priceUSD.replace("$", "");
    const usd = parseFloat(usdPriceString);
    if (Number.isNaN(usd)) return 0;
    return usd;
  }

  function handleTelegramWalletPayment() {
    const comment = `PUNCHER SHOP | ${selectedProduct.name} | PUBG ID: ${
      pubgID || "—"
    }`;

    const orderTotalUSD = getOrderTotalUSD();
    const orderAmountTon = orderTotalUSD || 0;

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
          ? BigInt(Math.round(orderAmountTon * 1_000_000_000)).toString()
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
      fontSize: 11,
      lineHeight: 1,
      opacity: 0.55,
      filter: "grayscale(1) saturate(0.45) brightness(1.1)",
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

  const paymentLabel =
    payment === "CRYPTO" ? "TELEGRAM WALLET" : payment;

  const summaryText = `NEW ORDER — PUNCHER SHOP

Package: ${selectedProduct.name}
Price: ${getPrice(selectedProduct)}
Currency: ${currency}
Payment: ${paymentLabel}

PUBG ID: ${pubgID || "—"}
Nickname: ${nickname || "—"}
Contact: ${contact || "—"}`;

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

              <div style={styles.paymentRow}>
                <button
                  className="hover-lift"
                  style={styles.paymentBtn(payment === "CARD", false)}
                  onClick={() => setPayment("CARD")}
                >
                  Оплата картой
                </button>
                <button
                  className="hover-lift"
                  style={styles.paymentBtn(payment === "CRYPTO", true)}
                  onClick={() => setPayment("CRYPTO")}
                >
                  <span style={styles.telegramWalletIcon}>
                    <TelegramIcon />
                  </span>
                  <span style={styles.telegramWalletText}>TELEGRAM WALLET</span>
                </button>
              </div>

              <div style={styles.summary}>{summaryText}</div>

              <div style={styles.bottomRow}>
                <button
                  className="hover-lift"
                  style={styles.managerBtn}
                  onClick={() => window.open("https://t.me/el_pancher", "_blank")}
                >
                  Написать менеджеру
                </button>
                <button
                  className="hover-lift hover-glow"
                  style={styles.orderBtn}
                  onClick={handleOrder}
                >
                  Перейти к оплате
                </button>
              </div>
            </div>
          </section>

          {showCheckout && payment === "CARD" ? (
            <section id="checkout-block" style={styles.checkoutWrap}>
              <div style={styles.checkoutInner}>
                <div style={styles.checkoutHeaderRow}>
                  <div style={styles.checkoutTitle}>Шаг 2 — оплата</div>
                  <div style={styles.checkoutBadge}>
                    <span style={styles.checkoutSecureDot} />
                    <span>Демо-оплата / тест</span>
                  </div>
                </div>

                <div style={styles.checkoutNote}>
                  Это внутренний экран оплаты внутри Telegram Mini App. Здесь позже
                  появится реальная платёжная система (Stripe / крипто–шлюз).
                </div>

                <div style={styles.checkoutGridShell}>
                  <div>
                    <input
                      style={styles.fullInput}
                      placeholder="Номер карты"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <input
                      style={styles.fullInput}
                      placeholder="Имя держателя (латиницей)"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />

                    <div style={styles.checkoutGrid}>
                      <input
                        style={styles.fullInput}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                      <input
                        style={styles.fullInput}
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>

                    <button
                      className="hover-lift hover-glow"
                      style={styles.payNowBtn}
                      onClick={handleFakePayment}
                    >
                      Оплатить (демо)
                    </button>
                  </div>

                  <div>
                    <div style={styles.checkoutSummary}>{summaryText}</div>
                    <div style={styles.checkoutPriceTag}>
                      К оплате: <strong>{getPrice(selectedProduct)}</strong>
                    </div>
                  </div>
                </div>

                {checkoutMessage ? (
                  <div style={styles.checkoutMessage}>{checkoutMessage}</div>
                ) : null}
              </div>
            </section>
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