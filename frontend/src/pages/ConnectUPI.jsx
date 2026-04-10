import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ConnectUPI() {
  const [upiId, setUpiId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const hasData = upiId || selectedFile || selectedDemo;

  // 📂 FILE UPLOAD
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setSelectedDemo(null);
    setUpiId("");
    setStatus("");
  };

  // 🔘 DEMO SELECT
  const selectDemo = (type) => {
    setSelectedDemo(type);
    setSelectedFile(null);
    setUpiId("");
    setStatus("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 🔗 MAIN SUBMIT
  const handleSubmit = () => {
    if (!hasData || loading) return;

    // better UPI validation
    if (upiId && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setStatus("Invalid UPI ID ❌");
      return;
    }

    setLoading(true);
    setStatus("");

    // store data
    if (selectedDemo) {
      localStorage.setItem("upiSource", "demo");
      localStorage.setItem("upiDemoType", selectedDemo);
    } else if (selectedFile) {
      localStorage.setItem("upiSource", "upload");
      localStorage.setItem("upiFileName", selectedFile.name);
    } else {
      localStorage.setItem("upiSource", "manual");
      localStorage.setItem("upiId", upiId);
    }

    localStorage.setItem("upiConnected", "true");

    setTimeout(() => {
      setLoading(false);
      setStatus("UPI Connected Successfully ✅");

      setTimeout(() => {
        navigate("/loans");
      }, 1200);
    }, 1500);
  };

  const demoProfiles = [
    { id: "shopkeeper", icon: "🏪", label: "Shopkeeper" },
    { id: "delivery", icon: "🛵", label: "Delivery" },
    { id: "freelancer", icon: "💻", label: "Freelancer" },
  ];

  return (
    <div className="connect-container">

      <h1 className="connect-title">Connect UPI</h1>
      <p className="connect-subtitle">
        Link your UPI or upload transactions to check loan eligibility
      </p>

      {/* 🔗 INPUT + BUTTON INLINE */}
      <div className="connect-box">
        <input
          type="text"
          placeholder="Enter UPI ID (example@upi)"
          value={upiId}
          onChange={(e) => {
            setUpiId(e.target.value);
            setSelectedFile(null);
            setSelectedDemo(null);
            setStatus("");
          }}
          className="connect-input"
        />

        <button
          onClick={handleSubmit}
          className="connect-btn"
          disabled={!hasData || loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Analyzing...
            </>
          ) : (
            "Verify & Continue"
          )}
        </button>
      </div>

      
      

      {/* STATUS */}
      {status && <p className="connect-status">{status}</p>}

      <p className="connect-hint">
        Supported: GPay • PhonePe • Paytm
      </p>

    </div>
  );
}

export default ConnectUPI;