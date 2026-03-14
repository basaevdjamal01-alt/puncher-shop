import { useState } from "react";

export default function App() {
  const products = [
    { id: 1, name: "60 UC", priceUSD: "$0.95", priceEUR: "€0.91", priceRUB: "76₽" },
    { id: 2, name: "120 UC", priceUSD: "$1.89", priceEUR: "€1.79", priceRUB: "152₽" },
    { id: 3, name: "325 UC", priceUSD: "$4.79", priceEUR: "€4.59", priceRUB: "393₽" },
    { id: 4, name: "385 UC", priceUSD: "$5.85", priceEUR: "€5.59", priceRUB: "480₽" },
    { id: 5, name: "660 UC", priceUSD: "$9.59", priceEUR: "€9.19", priceRUB: "787₽" },
    { id: 6, name: "720 UC", priceUSD: "$10.45", priceEUR: "€9.99", priceRUB: "864₽" },
    { id: 7, name: "985 UC", priceUSD: "$14.25", priceEUR: "€13.65", priceRUB: "1179₽" },
    { id: 8, name: "1320 UC", priceUSD: "$19.15", priceEUR: "€18.35", priceRUB: "1583₽" },
    { id: 9, name: "1800 UC", priceUSD: "$22.95", priceEUR: "€21.95", priceRUB: "1910₽" },
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

  function getPrice(product) {
    if (currency === "USD") return product.priceUSD;
    if (currency === "EUR") return product.priceEUR;
    return product.priceRUB;
  }

  function oldPrice(product) {
    if (currency === "USD") return `$${(parseFloat(product.priceUSD.replace("$", "")) + 0.04).toFixed(2)}`;
    if (currency === "EUR") return `€${(parseFloat(product.priceEUR.replace("€", "")) + 0.04).toFixed(2)}`;
    return `${parseInt(product.priceRUB.replace("₽", "")) + 6}₽`;
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
    setCheckoutMessage("Демо-экран оплаты готов. Следующий шаг — подключить реальную платёжку Stripe или crypto checkout.");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(180deg, #060606 0%, #120000 45%, #050505 100%)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      position: "relative",
      overflowX: "hidden",
      paddingBottom: 32,
    },
    app: {
      width: "100%",
      maxWidth: 430,
      margin: "0 auto",
      minHeight: "100vh",
      background: "#090909",
      boxShadow: "0 0 0 1px rgba(255,0,0,0.08)",
      position: "relative",
    },
    header: {
      background: "linear-gradient(180deg,#ff1919 0%,#e30d0d 100%)",
      padding: "18px 18px 14px",
      position: "sticky",
      top: 0,
      zIndex: 20,
    },
    headerRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    brand: {
      fontSize: 16,
      fontWeight: 900,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    topActions: {
      display: "flex",
      gap: 14,
      fontSize: 22,
      alignItems: "center",
    },
    content: {
      padding: 8,
      background:
        "radial-gradient(circle at top, rgba(255,0,0,0.12), transparent 22%), linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(14,0,0,1) 100%)",
    },
    categories: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10,
      marginTop: 8,
      marginBottom: 12,
    },
    catBtn: (active) => ({
      borderRadius: 18,
      border: active ? "2px solid #ff2d2d" : "2px solid rgba(255,60,60,0.45)",
      background: active ? "linear-gradient(180deg,#1b0000 0%, #080808 100%)" : "linear-gradient(180deg,#0d0d0d 0%, #080808 100%)",
      minHeight: 76,
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      fontWeight: 900,
      fontSize: 11,
      textTransform: "uppercase",
      boxShadow: active ? "0 0 18px rgba(255,0,0,0.18)" : "none",
      transition: "all .2s ease",
      cursor: "pointer",
    }),
    hero: {
      position: "relative",
      borderRadius: 22,
      overflow: "hidden",
      height: 172,
      marginBottom: 14,
      boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
    },
    heroImage: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    heroOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.24) 40%, rgba(0,0,0,0.54) 100%)",
    },
    sliderDots: {
      position: "absolute",
      left: 14,
      right: 14,
      bottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 4,
      zIndex: 2,
    },
    dotMain: {
      width: 30,
      height: 6,
      borderRadius: 99,
      background: "rgba(255,255,255,0.72)",
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 99,
      background: "rgba(255,255,255,0.56)",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: 28,
      fontWeight: 900,
      margin: "8px 0 12px",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    currencyRow: {
      display: "flex",
      justifyContent: "center",
      gap: 10,
      marginBottom: 16,
    },
    currencyBtn: (active) => ({
      minWidth: 96,
      borderRadius: 999,
      border: active ? "1px solid #ff3a3a" : "1px solid rgba(255,255,255,0.12)",
      background: active ? "linear-gradient(180deg,#ff1e1e 0%, #d30b0b 100%)" : "linear-gradient(180deg,#1a1111 0%, #110b0b 100%)",
      color: "#fff",
      padding: "14px 12px",
      fontWeight: 900,
      fontSize: 16,
      cursor: "pointer",
      transition: "all .18s ease",
      boxShadow: active ? "0 0 22px rgba(255,0,0,0.22)" : "none",
    }),
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 10,
    },
    productCard: (active) => ({
      position: "relative",
      borderRadius: 22,
      overflow: "hidden",
      background: "linear-gradient(180deg,#050505 0%, #110202 100%)",
      border: active ? "1px solid rgba(255,50,50,0.95)" : "1px solid rgba(255,0,0,0.20)",
      boxShadow: active ? "0 0 24px rgba(255,0,0,0.16)" : "0 8px 16px rgba(0,0,0,0.20)",
      transition: "all .2s ease",
      minHeight: 192,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }),
    hotBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      width: 44,
      height: 44,
      borderRadius: 999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg,#2b0000 0%, #110000 100%)",
      border: "1px solid rgba(255,0,0,0.26)",
      color: "#ffb5b5",
      fontWeight: 900,
      fontSize: 10,
      letterSpacing: 0.5,
    },
    productTop: {
      padding: "14px 10px 8px",
      textAlign: "center",
    },
    iconBox: {
      width: 68,
      height: 68,
      borderRadius: 18,
      margin: "0 auto 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(180deg,rgba(40,6,6,0.92) 0%, rgba(19,5,5,0.96) 100%)",
      border: "1px solid rgba(255,60,0,0.12)",
      boxShadow: "inset 0 0 22px rgba(255,90,0,0.07)",
    },
    productIcon: {
      fontSize: 34,
    },
    productName: {
      fontSize: 14,
      fontWeight: 900,
      marginBottom: 6,
      textTransform: "uppercase",
    },
    oldPrice: {
      fontSize: 10,
      color: "rgba(255,255,255,0.35)",
      textDecoration: "line-through",
      marginBottom: 4,
    },
    productPrice: {
      fontSize: 13,
      fontWeight: 900,
      marginBottom: 0,
    },
    chooseBtn: {
      border: "none",
      background: "linear-gradient(180deg,#ff1f1f 0%, #d10a0a 100%)",
      color: "#fff",
      minHeight: 42,
      width: "100%",
      fontWeight: 900,
      fontSize: 13,
      letterSpacing: 0.3,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all .18s ease",
      boxShadow: "0 0 16px rgba(255,0,0,0.16)",
    },
    orderBox: {
      marginTop: 18,
      background: "linear-gradient(180deg, rgba(12,0,0,0.98) 0%, rgba(8,8,8,0.98) 100%)",
      border: "1px solid rgba(255,0,0,0.20)",
      borderRadius: 24,
      padding: 16,
      boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
    },
    orderHead: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 14,
    },
    orderMini: {
      fontSize: 10,
      fontWeight: 900,
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "#ff6f6f",
    },
    orderTitle: {
      fontSize: 24,
      fontWeight: 900,
      textTransform: "uppercase",
      marginTop: 4,
    },
    orderPrice: {
      borderRadius: 16,
      padding: "10px 12px",
      minWidth: 110,
      textAlign: "right",
      border: "1px solid rgba(255,0,0,0.18)",
      background: "rgba(255,0,0,0.08)",
      color: "#ffb7b7",
      fontWeight: 900,
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 14,
      color: "#fff",
      padding: 14,
      fontSize: 15,
      outline: "none",
      marginBottom: 10,
    },
    paymentRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 6,
      marginBottom: 12,
    },
    paymentBtn: (active, red = false) => ({
      borderRadius: 14,
      padding: 14,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all .18s ease",
      border: active
        ? `1px solid ${red ? "#ff2a2a" : "#ffffff"}`
        : `1px solid ${red ? "rgba(255,0,0,0.2)" : "rgba(255,255,255,0.12)"}`,
      background: active ? (red ? "#d90d0d" : "#ffffff") : red ? "rgba(255,0,0,0.08)" : "rgba(255,255,255,0.05)",
      color: active ? (red ? "#fff" : "#000") : red ? "#ffaaaa" : "#fff",
    }),
    summary: {
      background: "rgba(0,0,0,0.28)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 16,
      padding: 14,
      color: "rgba(255,255,255,0.84)",
      whiteSpace: "pre-line",
      fontSize: 13,
      marginTop: 8,
    },
    bottomRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 14,
    },
    managerBtn: {
      border: "none",
      background: "rgba(255,255,255,0.10)",
      color: "#fff",
      borderRadius: 14,
      padding: 14,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all .18s ease",
    },
    orderBtn: {
      border: "none",
      background: "linear-gradient(180deg,#ff1f1f 0%, #d10a0a 100%)",
      color: "#fff",
      borderRadius: 14,
      padding: 14,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      transition: "all .18s ease",
      boxShadow: "0 0 16px rgba(255,0,0,0.18)",
    },
    checkoutWrap: {
      marginTop: 18,
      background: "linear-gradient(180deg, rgba(18,0,0,0.98) 0%, rgba(8,8,8,0.98) 100%)",
      border: "1px solid rgba(255,0,0,0.20)",
      borderRadius: 24,
      padding: 16,
      boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
    },
    checkoutTitle: {
      fontSize: 24,
      fontWeight: 900,
      textTransform: "uppercase",
      marginBottom: 12,
    },
    checkoutNote: {
      fontSize: 13,
      color: "rgba(255,255,255,0.72)",
      marginBottom: 14,
    },
    fullInput: {
      width: "100%",
      boxSizing: "border-box",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 14,
      color: "#fff",
      padding: 14,
      fontSize: 15,
      outline: "none",
      marginBottom: 10,
    },
    checkoutGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
    },
    payNowBtn: {
      border: "none",
      width: "100%",
      background: "linear-gradient(180deg,#ff1f1f 0%, #d10a0a 100%)",
      color: "#fff",
      borderRadius: 14,
      padding: 15,
      fontWeight: 900,
      cursor: "pointer",
      textTransform: "uppercase",
      boxShadow: "0 0 16px rgba(255,0,0,0.18)",
      marginTop: 6,
      transition: "all .18s ease",
    },
    checkoutMessage: {
      marginTop: 12,
      borderRadius: 14,
      padding: "12px 14px",
      background: "rgba(255,0,0,0.10)",
      border: "1px solid rgba(255,0,0,0.18)",
      color: "#ffd1d1",
      fontSize: 13,
    },
    footerName: {
      textAlign: "center",
      fontWeight: 800,
      color: "rgba(255,255,255,0.72)",
      padding: "12px 0 74px",
      fontSize: 14,
    },
    bottomNav: {
      position: "fixed",
      left: "50%",
      bottom: 10,
      transform: "translateX(-50%)",
      width: "min(94vw, 398px)",
      background: "rgba(44,44,44,0.70)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: 10,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 8,
      zIndex: 30,
    },
    navItem: {
      minHeight: 44,
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      background: "rgba(255,255,255,0.04)",
    },
  };

  const summaryText = `NEW ORDER — PUNCHER SHOP\n\nPackage: ${selectedProduct.name}\nPrice: ${getPrice(selectedProduct)}\nCurrency: ${currency}\nPayment: ${payment}\n\nPUBG ID: ${pubgID || "—"}\nNickname: ${nickname || "—"}\nContact: ${contact || "—"}`;

  return (
    <div style={styles.page}>
      <style>{`
        .hover-lift:hover { transform: translateY(-2px) scale(1.02); filter: brightness(1.05); }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(255,0,0,0.26); }
        .card-lift:hover { transform: translateY(-3px); box-shadow: 0 0 24px rgba(255,0,0,0.16); }
      `}</style>

      <div style={styles.pageGlowLeft} />
      <div style={styles.pageGlowRight} />

      <div style={styles.app}>
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <div style={styles.brand}>PUNCHER SHOP</div>
            <div style={styles.topActions}>
              <span>⋮</span>
              <span>✕</span>
            </div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.categories}>
            <button className="hover-lift hover-glow" style={styles.catBtn(false)}>
              <div style={{ fontSize: 20 }}>🎮</div>
              <div>Все игры</div>
            </button>
            <button className="hover-lift hover-glow" style={styles.catBtn(true)}>
              <div style={{ fontSize: 20 }}>🔥</div>
              <div>KARAT</div>
            </button>
            <button className="hover-lift hover-glow" style={styles.catBtn(false)}>
              <div style={{ fontSize: 20 }}>📢</div>
              <div>Анонсы</div>
            </button>
          </div>

          <div style={styles.hero}>
            <img src="/баннер uc.png" alt="PUNCHER SHOP banner" style={styles.heroImage} />
            <div style={styles.heroOverlay} />
            <div style={styles.fireGlow1} />
            <div style={styles.fireGlow2} />
            <div style={styles.sliderDots}>
              <div style={styles.dotMain} />
              <div style={styles.dot} />
              <div style={styles.dot} />
              <div style={styles.dot} />
              <div style={styles.dot} />
            </div>
            <div style={styles.heroContent}>
              <div style={styles.perksRow}>
                <div style={styles.perk}><div style={styles.perkIcon}>🛡️</div><div style={styles.perkText}>Fast Delivery</div></div>
                <div style={styles.perk}><div style={styles.perkIcon}>✅</div><div style={styles.perkText}>100% Safe</div></div>
                <div style={styles.perk}><div style={styles.perkIcon}>🎧</div><div style={styles.perkText}>24/7 Support</div></div>
              </div>
            </div>
          </div>

          <div style={styles.sectionTitle}>Buy UC</div>

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

          <div style={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className="card-lift" style={styles.productCard(selectedProduct.id === product.id)}>
                <div style={styles.hotBadge}>HOT</div>
                <div style={styles.productTop}>
                  <div style={styles.iconBox}><div style={styles.productIcon}>🪙</div></div>
                  <div style={styles.productName}>{product.name}</div>
                  <div style={styles.oldPrice}>{oldPrice(product)}</div>
                  <div style={styles.productPrice}>{getPrice(product)}</div>
                </div>
                <button className="hover-lift hover-glow" style={styles.chooseBtn} onClick={() => setSelectedProduct(product)}>
                  Выбрать
                </button>
              </div>
            ))}
          </div>

          <div style={styles.orderBox}>
            <div style={styles.orderHead}>
              <div>
                <div style={styles.orderMini}>Order</div>
                <div style={styles.orderTitle}>{selectedProduct.name}</div>
              </div>
              <div style={styles.orderPrice}>{getPrice(selectedProduct)}</div>
            </div>

            <input style={styles.input} placeholder="Введите PUBG ID" value={pubgID} onChange={(e) => setPubgID(e.target.value)} />
            <input style={styles.input} placeholder="Введите ник" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <input style={styles.input} placeholder="Telegram @username или номер" value={contact} onChange={(e) => setContact(e.target.value)} />

            <div style={styles.paymentRow}>
              <button className="hover-lift" style={styles.paymentBtn(payment === "CARD", false)} onClick={() => setPayment("CARD")}>Card / Bank</button>
              <button className="hover-lift" style={styles.paymentBtn(payment === "CRYPTO", true)} onClick={() => setPayment("CRYPTO")}>Crypto</button>
            </div>

            <div style={styles.summary}>{summaryText}</div>

            <div style={styles.bottomRow}>
              <button className="hover-lift" style={styles.managerBtn} onClick={() => window.open("https://t.me/el_pancher", "_blank")}>Manager</button>
              <button className="hover-lift hover-glow" style={styles.orderBtn} onClick={handleOrder}>Оформить</button>
            </div>
          </div>

          {showCheckout ? (
            <div id="checkout-block" style={styles.checkoutWrap}>
              <div style={styles.checkoutTitle}>Checkout</div>
              <div style={styles.checkoutNote}>Сейчас это внутренний экран оплаты. Следующий шаг — подключить реальную платёжку.</div>
              <input style={styles.fullInput} placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <input style={styles.fullInput} placeholder="Cardholder name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
              <div style={styles.checkoutGrid}>
                <input style={styles.fullInput} placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                <input style={styles.fullInput} placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
              </div>
              <button className="hover-lift hover-glow" style={styles.payNowBtn} onClick={handleFakePayment}>Pay now</button>
              {checkoutMessage ? <div style={styles.checkoutMessage}>{checkoutMessage}</div> : null}
            </div>
          ) : null}

          <div style={styles.footerName}>@puncher_shop</div>
        </div>
      </div>

      <div style={styles.bottomNav}>
        <div style={styles.navItem}>🪙</div>
        <div style={styles.navItem}>🔥</div>
        <div style={styles.navItem}>🎟️</div>
        <div style={styles.navItem}>🕴️</div>
      </div>
    </div>
  );
}
