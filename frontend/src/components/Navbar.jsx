import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">UdaanCredit</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/connect">Connect UPI</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/loans">Loan Offers</Link>
      </div>

    </nav>
  )
}