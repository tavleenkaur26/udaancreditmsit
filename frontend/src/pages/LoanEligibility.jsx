import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoanEligibility() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const sendData = async () => {
    try {
      if (!selectedFile) {
        alert("Please upload a file first");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      setResult(data);
      localStorage.setItem("loanResult", JSON.stringify(data));

    } catch (err) {
      console.error("Error:", err);
    }
  };

  // LOAN OFFERS
  const loanOffers = result
    ? [
        {
          label: "Best Match",
          amount: result.loan_eligibility,
          interest: 10.5,
          tenure: "12 months",
          eligible: true
        },
        {
          label: "Long Term",
          amount: result.loan_eligibility * 1.5,
          interest: 12.0,
          tenure: "24 months",
          eligible: result.risk_level === "Low"
        },
        {
          label: "Quick Loan",
          amount: result.loan_eligibility * 0.7,
          interest: 9.8,
          tenure: "6 months",
          eligible: true
        }
      ]
    : [];

  const styles = {
    primaryButton: {
      background: "linear-gradient(135deg, #2563eb, #16a34a)",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "10px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "12px"
    },

    cardWrapper: {
      display: "flex",
      justifyContent: "center",
      marginTop: "25px"
    },

    card: {
      padding: "22px",
      borderRadius: "14px",
      background: "linear-gradient(145deg, #ffffff, #eff6ff)",
      border: "1px solid #dbeafe",
      boxShadow: "0 12px 30px rgba(37,99,235,0.10)",
      maxWidth: "520px",
      width: "100%",
      color: "#0f172a"
    },

    heading: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#1e3a8a",
      marginBottom: "10px"
    }
  };
  const handleApply = () => {
  alert("Application started (demo)");
};

const handleDownload = () => {
  alert("Downloading report... (you can later connect PDF export)");
};

const handleDashboard = () => {
  navigate("/dashboard");
};

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>

      {/* TITLE */}
      <h1 style={{ color: "#2563eb" }}>
        Loan Eligibility
      </h1>

      {/* FILE INPUT */}
      <label style={{
        display: "inline-block",
        padding: "12px 16px",
        background: "linear-gradient(135deg, #2563eb, #16a34a)",
        color: "white",
        borderRadius: "10px",
        fontWeight: "600",
        cursor: "pointer"
      }}>
        📁 Choose File
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>

      {/* FILE NAME */}
      {selectedFile && (
        <div style={{ marginTop: "8px", color: "#2563eb" }}>
          📄 {selectedFile.name}
        </div>
      )}

      {/* BUTTON */}
      <button onClick={sendData} style={styles.primaryButton}>
        Check Eligibility
      </button>

      {/* RESULT */}
      {result && (
        <div style={styles.cardWrapper}>
          <div style={styles.card}>

            <h2 style={styles.heading}>Loan Summary</h2>

            <div style={{
              fontSize: "34px",
              fontWeight: "bold",
              color: "#16a34a"
            }}>
              ₹{result.loan_eligibility}
            </div>

            <p><b>Risk:</b> {result.risk_level}</p>
            <p><b>Income:</b> {result.income}</p>
            <p><b>Expense:</b> {result.expense}</p>
            <p><b>Transactions:</b> {result.transactions}</p>
            <p><b>Trust Score:</b> {result.trust_score}</p>

            {/* AI INSIGHTS */}
            <h3 style={{ color: "#1e3a8a", marginTop: "15px" }}>
              AI Insights
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {(result.insights || []).map((item, i) => (
                <div key={i} style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: "#ecfdf5",
                  border: "1px solid #dbeafe"
                }}>
                  🤖 {item}
                </div>
              ))}
            </div>

            {/* LOAN OFFERS */}
            <h3 style={{ marginTop: "20px", color: "#1e3a8a" }}>
              Loan Offers
            </h3>

            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}>
              {loanOffers.map((offer, i) => (
                <div key={i} style={{
                  flex: "1",
                  minWidth: "150px",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #dbeafe",
                  background: offer.eligible
                    ? "linear-gradient(135deg, #ecfdf5, #eff6ff)"
                    : "#f3f4f6"
                }}>

                  <div style={{ fontWeight: "700" }}>
                    {offer.label}
                  </div>

                  <div style={{ fontSize: "18px", marginTop: "5px" }}>
                    ₹{offer.amount?.toFixed?.(0)}
                  </div>

                  <div style={{ fontSize: "13px" }}>
                    Interest: {offer.interest}%
                  </div>

                  <div style={{ fontSize: "13px" }}>
                    {offer.tenure}
                  </div>

                  <div style={{
                    marginTop: "5px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: offer.eligible ? "#16a34a" : "#dc2626"
                  }}>
                    {offer.eligible ? "Eligible" : "Not Eligible"}
                  </div>

                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
<div style={{
  marginTop: "20px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
}}>

  <button
    onClick={handleApply}
    style={{
      padding: "10px 14px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(135deg, #2563eb, #16a34a)",
      color: "white",
      fontWeight: "600",
      cursor: "pointer"
    }}
  >
    Apply Now
  </button>

  <button
    onClick={handleDownload}
    style={{
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #2563eb",
      background: "white",
      color: "#2563eb",
      fontWeight: "600",
      cursor: "pointer"
    }}
  >
    Download Report
  </button>

  <button
    onClick={handleDashboard}
    style={{
      padding: "10px 14px",
      borderRadius: "10px",
      border: "1px solid #16a34a",
      background: "white",
      color: "#16a34a",
      fontWeight: "600",
      cursor: "pointer"
    }}
  >
    Dashboard
  </button>

</div>

          </div>
        </div>
      )}

    </div>
  );
}

export default LoanEligibility;