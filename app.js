import React, { useState } from "react";
import axios from "axios";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = async () => {
    if (!loanAmount || !tenure || !interestRate) {
      alert("Please enter all details");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/calculate_emi", {
        loan_amount: parseFloat(loanAmount),
        tenure: parseInt(tenure),
        interest_rate: parseFloat(interestRate),
      });

      setEmi(response.data.emi);
    } catch (error) {
      alert("Error calculating EMI");
    }
  };

  return (
    <div className="container">
      <h2>EMI Loan Calculator</h2>
      <input
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tenure (Months)"
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <button onClick={calculateEMI}>Calculate EMI</button>

      {emi && <h3>Monthly EMI: {emi}</h3>}
    </div>
  );
}
