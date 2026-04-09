import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import ConnectUPI from "./pages/ConnectUPI"
import LoanEligibility from "./pages/LoanEligibility"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connect" element={<ConnectUPI />} />
        <Route path="/loans" element={<LoanEligibility />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App