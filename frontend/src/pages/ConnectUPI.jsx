import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ConnectUPI() {
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const verifyUPI = () => {
    if (!upiId.includes("@")) {
      setStatus("Invalid UPI ID ❌");
      return;
    }

    setLoading(true);
    setStatus("");

    setTimeout(() => {
      setLoading(false);
      setStatus("UPI Connected Successfully ✅");

      // store connection
      localStorage.setItem("upiConnected", "true");

      // redirect after success
      setTimeout(() => {
        navigate("/loans");
      }, 1200);

    }, 1200);
  };

  return (
    <div className="connect-container">

      <h1 className="connect-title">Connect UPI</h1>
      <p className="connect-subtitle">
        Link your UPI to check loan eligibility
      </p>

      <div className="connect-box">

        <input
          type="text"
          placeholder="Enter UPI ID (example@upi)"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="connect-input"
        />

        <button
          onClick={verifyUPI}
          className="connect-btn"
          disabled={loading}
        >
          {loading ? "Connecting..." : "Verify & Connect"}
        </button>

      </div>

      {/* status message */}
      {status && <p className="connect-status">{status}</p>}

      {/* extra hint */}
      <p className="connect-hint">
        Supported apps: GPay • PhonePe • Paytm
      </p>

    </div>
  );
}

export default ConnectUPI;