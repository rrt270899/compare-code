from flask import Flask, request, jsonify
import sqlite3
import math

app = Flask(__name__)

def calculate_emi(principal, rate, tenure):
    monthly_rate = rate / (12 * 100)
    emi = (principal * monthly_rate * (1 + monthly_rate) ** tenure) / ((1 + monthly_rate) ** tenure - 1)
    return round(emi, 2)

@app.route('/calculate_emi', methods=['POST'])
def get_emi():
    data = request.json
    principal = data.get('loan_amount')
    tenure = data.get('tenure')
    interest_rate = data.get('interest_rate')

    if not (principal and tenure and interest_rate):
        return jsonify({"error": "Missing required fields"}), 400

    emi = calculate_emi(principal, interest_rate, tenure)
    
    return jsonify({"emi": emi})

if __name__ == '__main__':
    app.run(debug=True)
