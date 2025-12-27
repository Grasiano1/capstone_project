import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Reusable Input Component defined inside to avoid import errors
const InputBox = ({ label, amount, onAmountChange, onCurrencyChange, options, selectedCurrency, disabled }) => (
  <div className="input-group">
    <label className="input-label">{label}</label>
    <div className="control-row">
      <input
        type="number"
        className="amount-input"
        value={amount}
        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        disabled={disabled}
      />
      <select
        className="currency-select"
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
      >
        {options.map((curr) => (
          <option key={curr} value={curr}>{curr.toUpperCase()}</option>
        ))}
      </select>
    </div>
  </div>
);

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [options, setOptions] = useState([]);
  const [rates, setRates] = useState({});

  const API_KEY = "852bee8379b697f07ae61374";

  // Initial fetch for all currency codes
  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then(res => {
        setOptions(Object.keys(res.data.conversion_rates));
      })
      .catch(err => alert("Error fetching initial data"));
  }, []);

  // Conversion logic
  const handleConvert = () => {
    axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`)
      .then(res => {
        const rate = res.data.conversion_rates[to];
        setConvertedAmount((amount * rate).toFixed(2));
      })
      .catch(err => alert("Conversion failed"));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div className="app-wrapper">
      <div className="converter-card">
        <h1 className="title">Currency Converter</h1>
        
        <InputBox 
          label="From"
          amount={amount}
          options={options}
          selectedCurrency={from}
          onAmountChange={(val) => setAmount(val)}
          onCurrencyChange={(val) => setFrom(val)}
        />

        <div className="swap-container">
          <button className="swap-btn" onClick={swap}>↑↓ SWAP</button>
        </div>

        <InputBox 
          label="To"
          amount={convertedAmount}
          options={options}
          selectedCurrency={to}
          onCurrencyChange={(val) => setTo(val)}
          disabled={true}
        />

        <button className="convert-btn" onClick={handleConvert}>
          Convert {from} to {to}
        </button>

        <p className="info">Real-time rates powered by ExchangeRate-API</p>
      </div>
    </div>
  );
}

export default App;