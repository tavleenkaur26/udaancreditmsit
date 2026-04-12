# UdaanCredit – Transaction-Based Credit Scoring System

## Overview

UdaanCredit is a backend-first FinTech prototype that evaluates transaction data to generate a financial trust score. It is designed for users like street vendors, shopkeepers, and gig workers who earn regularly but lack formal credit history.
The system analyzes income, expenses, and transaction patterns to estimate creditworthiness and loan eligibility.

---

## Problem

Many individuals in the informal economy have stable income but cannot access loans because they lack:
- Salary slips
- Credit history
- Formal financial records

As a result, they remain financially excluded despite having repayment capacity.

---

## Solution

UdaanCredit uses transaction data to assess financial behavior instead of relying on traditional credit history. It evaluates:
- Income consistency
- Spending patterns
- Savings behavior

and converts these into a simple, interpretable trust score.

---

## How It Works

1. **Input**  
   Upload transaction data in CSV format (simulating UPI or bank data).

2. **Feature Extraction**  
   The system computes:
   - Total income  
   - Total expenses  
   - Transaction count  
   - Savings ratio  
   - Average transaction value  

3. **Model Prediction**  
   A Random Forest model predicts the likelihood of a user being financially stable.

4. **Scoring & Risk Classification**  
   - Trust score (0–100)  
   - Risk level: Low / Medium / High  

5. **Loan Estimation**
   loan = income × 0.3 × (trust_score / 100)
6. **Insights**  
Basic financial insights are generated based on user behavior.

---

## Demo Flow

1. Upload a CSV file  
2. Backend processes transaction data  
3. Model generates trust score and risk level  
4. System returns loan eligibility and insights  

---

## Machine Learning Approach

- Model: Random Forest Classifier  
- Features: income, expenses, transactions, savings ratio, average transaction  
- Training: synthetic financial data with rule-based labeling  

This approach is used because real financial datasets are private and regulated. The goal is to demonstrate how behavioral signals can be used for credit scoring.

---
## How to Run
1. Install dependencies: pip install flask pandas scikit-learn flask-cors
2. Run the backend: python app.py
3. Send a POST request to: /analyze with a CSV file

## Future Work

- Integration with RBI Account Aggregator framework  
- Real transaction ingestion (SMS / UPI parsing)  
- Improved ML models with real anonymized data  
- Lender-side dashboard  
- Fraud and anomaly detection  
