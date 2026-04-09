from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from model import predict_user

app = Flask(__name__)
CORS(app)
@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files['file']
    df = pd.read_csv(file)

    # Feature extraction
    income = df[df['type'] == 'credit']['amount'].sum()
    expense = df[df['type'] == 'debit']['amount'].sum()
    transactions = len(df)

    savings_ratio = (income - expense) / (income + 1)
    avg_transaction = df['amount'].mean()

    features = [income, expense, transactions, savings_ratio, avg_transaction]

    # AI prediction
    prediction = predict_user(features)

    return jsonify({
    "income": int(income),
    "expense": int(expense),
    "transactions": int(transactions),
    "risk": "Low" if prediction == 1 else "High"
})

if __name__ == '__main__':
    app.run(debug=True)