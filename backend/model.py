from sklearn.ensemble import RandomForestClassifier
import numpy as np

# -----------------------------
# 1. SYNTHETIC DATA GENERATION
# -----------------------------
X = []
y = []

for i in range(500):

    income = np.random.randint(10000, 100000)
    expense = np.random.randint(5000, 90000)
    transactions = np.random.randint(5, 100)
    avg_txn = np.random.randint(200, 5000)

    savings_ratio = (income - expense) / (income + 1)
    expense_income_ratio = expense / (income + 1)

    features = [
        income,
        expense,
        transactions,
        savings_ratio,
        avg_txn
    ]

    # LABEL RULE (SMART FINTECH LOGIC)
    if savings_ratio > 0.25 and expense_income_ratio < 0.8:
        label = 1   # good user
    else:
        label = 0   # risky user

    X.append(features)
    y.append(label)

# -----------------------------
# 2. TRAIN MODEL
# -----------------------------
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=6,
    random_state=42
)

model.fit(X, y)

# -----------------------------
# 3. PREDICTION FUNCTION
# -----------------------------
def predict_user(features):
    prob = model.predict_proba([features])[0][1]

    trust_score = int(prob * 100)

    if trust_score > 70:
        risk = "Low"
    elif trust_score > 40:
        risk = "Medium"
    else:
        risk = "High"

    return trust_score, risk