import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      

      {/* HERO */}
      <section className="hero">
        <div className="badge">
          <span className="badge-dot"></span>
          Now in early access — join 2,000+ users
        </div>

        <h1 className="hero-title">
          Turn your UPI history into<br />
          a <span className="highlight">credit score</span>
        </h1>

        <p className="hero-subtitle">
          UdaanCredit helps you unlock loans by analyzing your UPI transactions —
          even if you have no traditional credit history.
        </p>

        <div className="pills">
          <span className="pill pill-red"><span className="pill-icon">✕</span> No credit history → No loans</span>
          <span className="pill pill-red"><span className="pill-icon">✕</span> Millions remain financially invisible</span>
          <span className="pill pill-green"><span className="pill-icon">✓</span> AI-powered transaction analysis</span>
          <span className="pill pill-green"><span className="pill-icon">✓</span> Instant trust score + loan eligibility</span>
        </div>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={() => navigate("/connect")}>
            Connect UPI &nbsp;→
          </button>
          <button className="secondary-btn" onClick={() => navigate("/loans")}>
            Try Demo
          </button>
        </div>

        <div className="trust-bar">
          <span className="trust-item">🔒 <strong>Bank-grade encryption</strong></span>
          <span className="trust-divider"></span>
          <span className="trust-item">⚡ <strong>Score in 60 seconds</strong></span>
          <span className="trust-divider"></span>
          <span className="trust-item">📋 <strong>RBI compliant</strong></span>
          <span className="trust-divider"></span>
          <span className="trust-item">✅ <strong>No hard credit pull</strong></span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <p className="section-label">Why UdaanCredit</p>
        <h2 className="section-title">Built for India's next billion</h2>
        <div className="features-grid">
          {[
            { icon: "📊", title: "AI Transaction Analysis", desc: "Our model reads patterns in your UPI payments — income stability, spending habits, recurring payments — to build a financial fingerprint." },
            { icon: "⚡", title: "Instant Trust Score", desc: "Get a dynamic credit score in under 60 seconds. No paperwork, no branch visits, no waiting weeks for a decision." },
            { icon: "🏦", title: "Loan Matching", desc: "We connect your score directly to partner lenders offering competitive rates — personal loans, business credit, BNPL and more." },
            { icon: "🔒", title: "Privacy First", desc: "Your UPI data is read-only, encrypted in transit, and never stored beyond the scoring process. You stay in control." },
            { icon: "📈", title: "Score History", desc: "Track your credit score over time. See exactly what improves or hurts your score with plain-language explanations." },
            { icon: "🤝", title: "For Lenders Too", desc: "Banks and NBFCs can integrate our API to underwrite borrowers who have no bureau history — unlocking a massive new market." },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <p className="section-label">The process</p>
        <h2 className="section-title">Three steps to your first loan</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Connect UPI</h4>
            <p>Link your UPI account securely via our read-only integration with your bank.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Get Scored</h4>
            <p>Our AI analyzes 12+ months of transactions and computes your UdaanScore instantly.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Access Credit</h4>
            <p>View matched loan offers from partner lenders and apply — all in one place.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <p>© 2025 UdaanCredit Technologies Pvt. Ltd.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}