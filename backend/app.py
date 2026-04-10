from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from model import predict_user

app = Flask(__name__)
from flask_cors import CORS

CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5173"
    }
})

@app.route('/analyze', methods=['POST'])
def analyze():

    file = request.files['file']
    df = pd.read_csv(file)

    # -----------------------------
    # FEATURE ENGINEERING
    # -----------------------------
    income = df[df['type'] == 'credit']['amount'].sum()
    expense = df[df['type'] == 'debit']['amount'].sum()
    transactions = len(df)

    savings_ratio = (income - expense) / (income + 1)
    avg_transaction = df['amount'].mean()

    features = [
        income,
        expense,
        transactions,
        savings_ratio,
        avg_transaction
    ]

    # -----------------------------
    # ML PREDICTION
    # -----------------------------
    trust_score, risk = predict_user(features)

    # -----------------------------
    # LOAN ELIGIBILITY ENGINE
    # -----------------------------
    loan_amount = int(income * 0.3 * (trust_score / 100))

    # -----------------------------
    # INSIGHTS ENGINE
    # -----------------------------
    insights = []

    if savings_ratio > 0.3:
        insights.append("Strong savings behavior detected")

    if expense < income:
        insights.append("Income exceeds expenses")

    if transactions > 20:
        insights.append("Active financial behavior")

    if savings_ratio < 0.1:
        insights.append("Low savings pattern detected")

    # -----------------------------
    # RESPONSE
    # -----------------------------
    return jsonify({
        "income": int(income),
        "expense": int(expense),
        "transactions": int(transactions),

        "trust_score": trust_score,
        "risk_level": risk,
        "loan_eligibility": loan_amount,

        "insights": insights
    })


if __name__ == '__main__':
    app.run(debug=True)