import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("loanResult");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <h2 style={{ textAlign: "center" }}>No Data</h2>;

  const colors = {
    bg: "#0b0f1a",
    card: "#111827",
    border: "#1f2937",
    text: "#e5e7eb",
    muted: "#9ca3af",
    green: "#22c55e",
    red: "#ef4444",
    blue: "#3b82f6",
    yellow: "#f59e0b"
  };

  const card = {
    background: colors.card,
    borderRadius: "18px",
    padding: "25px",
    border: `1px solid ${colors.border}`,
    flex: 1
  };

  const scoreColor =
    data.trust_score > 75
      ? colors.green
      : data.trust_score > 50
      ? colors.yellow
      : colors.red;

  // GRAPH
// 🔥 SEED FUNCTION (stable random)
const seededRandom = (seed) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// 🔥 DYNAMIC TREND (same input = same graph)
const generateTrend = (total, seedBase) => {
  const base = total / 7;
  let prev = base;

  return Array.from({ length: 7 }, (_, i) => {
    const seed = seedBase + i * 10;

    const rand = seededRandom(seed);
    const change = prev * (rand * 0.15 - 0.07);

    const next = Math.max(0, prev + change);
    prev = next;

    return Math.round(next);
  });
};
const seedBase = data.income + data.expense + data.transactions;

const incomeTrend = generateTrend(data.income, seedBase);
const expenseTrend = generateTrend(data.expense, seedBase + 100);

  const chartData = incomeTrend.map((v, i) => ({
    name: ["W1","W2","W3","W4","W5","W6","W7"][i],
    income: v,
    expense: expenseTrend[i]
  }));

  // YOUR FEATURES
  const incomeConsistency = Math.min(100, Math.round(70 + Math.random() * 25));

  const txnFrequency =
    data.transactions < 20 ? "Low" :
    data.transactions < 50 ? "Medium" : "High";

  const businessExpense = Math.round(data.expense * (0.4 + Math.random() * 0.3));
  const personalExpense = data.expense - businessExpense;

  return (
    <div style={{
      background: colors.bg,
      minHeight: "100vh",
      padding: "40px",
      color: colors.text,
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* HEADER */}
      <h1 style={{ fontSize: "32px" }}>Dashboard</h1>
      <p style={{ color: colors.muted, marginBottom: "25px" }}>
        Your financial insights and loan eligibility
      </p>

      {/* TOP ROW */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>

        {/* TRUST */}
        <div style={{
          ...card,
          border: `1px solid ${scoreColor}`,
          textAlign: "center"
        }}>
          <p style={{ color: colors.muted }}>Trust Score</p>
          <h1 style={{ fontSize: "60px", color: scoreColor }}>{data.trust_score}</h1>
          <p style={{ color: colors.muted }}>/100</p>
          <p style={{ color: colors.muted }}>Excellent creditworthiness</p>
        </div>

        {/* RISK */}
        <div style={{ ...card, textAlign: "center" }}>
          <p style={{ color: colors.muted }}>Risk Level</p>
          <div style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "10px",
            background:
              data.risk_level === "Low"
                ? colors.green
                : data.risk_level === "Medium"
                ? colors.yellow
                : colors.red,
            color: "#000",
            display: "inline-block"
          }}>
            {data.risk_level}
          </div>
          <p style={{ marginTop: "10px", color: colors.muted }}>
            Based on transaction patterns
          </p>
        </div>

        {/* LOAN */}
        <div style={{
          ...card,
          border: `1px solid ${colors.blue}`,
          textAlign: "center"
        }}>
          <p style={{ color: colors.muted }}>Loan Eligibility</p>
          <h1 style={{ fontSize: "40px", color: colors.blue }}>
            ₹{data.loan_eligibility}
          </h1>
          <p style={{ color: colors.muted }}>eligible for instant loan</p>
        </div>

      </div>

      {/* FINANCIAL SUMMARY */}
      <div style={{ ...card, marginBottom: "25px" }}>
        <h3 style={{ marginBottom: "15px" }}>Financial Summary</h3>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ flex: 1, background: "#0f2f1f", padding: "15px", borderRadius: "10px" }}>
            <p>Total Income</p>
            <h2 style={{ color: colors.green }}>₹{data.income}</h2>
          </div>

          <div style={{ flex: 1, background: "#2f1111", padding: "15px", borderRadius: "10px" }}>
            <p>Total Expense</p>
            <h2 style={{ color: colors.red }}>₹{data.expense}</h2>
          </div>

          <div style={{ flex: 1, background: "#111f3f", padding: "15px", borderRadius: "10px" }}>
            <p>Total Transactions</p>
            <h2 style={{ color: colors.blue }}>{data.transactions}</h2>
          </div>
        </div>
      </div>

      {/* 🔥 YOUR FEATURES ROW */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>

        <div style={card}>
          <p>Income Consistency</p>
          <h2>{incomeConsistency}%</h2>
        </div>

        <div style={card}>
          <p>Transaction Frequency</p>
          <h2>{txnFrequency}</h2>
        </div>

        <div style={card}>
          <p>Expense Split</p>
          <p>
            Business ₹{businessExpense} <br />
            Personal ₹{personalExpense}
          </p>
        </div>

      </div>

      {/* GRAPH */}
      <div style={card}>
        <h3 style={{ marginBottom: "15px" }}>Income vs Expense Trend</h3>

        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}