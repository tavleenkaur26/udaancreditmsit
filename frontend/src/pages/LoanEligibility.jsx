import { useState } from "react";

function LoanEligibility() {
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const sendData = async () => {
    console.log("Button clicked");

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
      console.log("Result:", data);

      setResult(data); // 👈 IMPORTANT

    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Loan Eligibility</h1>

      {/* FILE INPUT */}
      <input 
        type="file" 
        accept=".csv"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={sendData}>
        Check Eligibility
      </button>

      {/* RESULT DISPLAY */}
      {result && (
        <div>
          <h3>Result:</h3>
          <p>Income: {result.income}</p>
          <p>Expense: {result.expense}</p>
          <p>Transactions: {result.transactions}</p>
          <p>Risk: {result.risk}</p>
        </div>
      )}
    </div>
  );
}

export default LoanEligibility;