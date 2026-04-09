import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="hero">

      <h1>
  Turn UPI Transactions into a{" "}
  <span className="highlight">Digital Credit Score</span>
</h1>

      <p>
        UdaanCredit analyzes your payment behavior using AI
        to unlock credit access for shopkeepers and small businesses.
      </p>

      <Link to="/connect">
        <button className="hero-btn">
          Connect Your UPI
        </button>
      </Link>

      {/* BACKEND IMPLEMENTATION
         SMS / Bank statement ingestion
         AI income detection
         ML credit score calculation
      */}

    </section>
  )
}