import React, { useState } from 'react';

function App() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [principalAmountPaid, setPrincipalAmountPaid] = useState(0);

  const calculateEmi = () => {
    const r = interestRate / 1200;
    const n = loanTenure;
    const numerator = loanAmount * r * Math.pow(1 + r, n);
    const denominator = Math.pow(1 + r, n) - 1;
    const calculatedEmi = numerator / denominator;
    setEmi(calculatedEmi);
    setTotalAmountPaid(calculatedEmi * n);
    setPrincipalAmountPaid(loanAmount);
  };

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(parseInt(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(parseFloat(e.target.value));
  };

  const handleLoanTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(parseInt(e.target.value));
  };

  const incrementLoanAmount = (amount: number) => {
    setLoanAmount((prevAmount) => prevAmount + amount);
  };

  const decrementLoanAmount = (amount: number) => {
    setLoanAmount((prevAmount) => Math.max(0, prevAmount - amount));
  };

  const incrementInterestRate = (rate: number) => {
    setInterestRate((prevRate) => prevRate + rate);
  };

  const decrementInterestRate = (rate: number) => {
    setInterestRate((prevRate) => Math.max(0, prevRate - rate));
  };

  const incrementLoanTenure = (tenure: number) => {
    setLoanTenure((prevTenure) => prevTenure + tenure);
  };

  const decrementLoanTenure = (tenure: number) => {
    setLoanTenure((prevTenure) => Math.max(1, prevTenure - tenure));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">EMI Calculator (Paid)</h1>

      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        {/* Input sliders and number inputs (same as before) */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Loan Amount:</label>
          <div className="flex items-center">
            <button onClick={() => decrementLoanAmount(10000)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">-</button>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              className="flex-grow mx-2"
            />
            <button onClick={() => incrementLoanAmount(10000)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">+</button>
          </div>
          <input
            type="number"
            value={loanAmount}
            onChange={handleLoanAmountChange}
            className="border rounded w-full py-2 px-3 mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Interest Rate (%):</label>
          <div className="flex items-center">
            <button onClick={() => decrementInterestRate(0.5)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">-</button>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={interestRate}
              onChange={handleInterestRateChange}
              className="flex-grow mx-2"
            />
            <button onClick={() => incrementInterestRate(0.5)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">+</button>
          </div>
          <input
            type="number"
            value={interestRate}
            onChange={handleInterestRateChange}
            className="border rounded w-full py-2 px-3 mt-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Loan Tenure (months):</label>
          <div className="flex items-center">
            <button onClick={() => decrementLoanTenure(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">-</button>
            <input
              type="range"
              min="1"
              max="360"
              step="1"
              value={loanTenure}
              onChange={handleLoanTenureChange}
              className="flex-grow mx-2"
            />
            <button onClick={() => incrementLoanTenure(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">+</button>
          </div>
          <input
            type="number"
            value={loanTenure}
            onChange={handleLoanTenureChange}
            className="border rounded w-full py-2 px-3 mt-2"
          />
        </div>

        <button
          onClick={calculateEmi}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Calculate EMI
        </button>

        {emi > 0 && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">EMI: ₹{emi.toFixed(2)}</p>
            <p className="text-lg font-semibold">Principal Amount Paid: ₹{principalAmountPaid.toFixed(2)}</p>
            <p className="text-lg font-semibold">Total Amount Paid: ₹{totalAmountPaid.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;