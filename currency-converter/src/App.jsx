import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('fav_currencies')) || []
  );

  const API_KEY = "852bee8379b697f07ae61374";

  // Initial Fetch
  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then(res => setOptions(Object.keys(res.data.conversion_rates)))
      .catch(() => alert("Error connecting to API"));
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
      const rate = res.data.conversion_rates[to];
      setResult((amount * rate).toFixed(2));
    } catch (err) {
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  const saveFavorite = () => {
    const pair = `${from}/${to}`;
    if (!favorites.includes(pair)) {
      const newFavs = [...favorites, pair];
      setFavorites(newFavs);
      localStorage.setItem('fav_currencies', JSON.stringify(newFavs));
    }
  };

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Currency Tracker</h2>
        
        {/* FROM SECTION */}
        <div className="input-box">
          <label>From</label>
          <div className="row">
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* TO SECTION */}
        <div className="input-box">
          <label>To (Result)</label>
          <div className="row">
            <input type="number" value={result} readOnly />
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        <button className="convert-btn" onClick={handleConvert} disabled={loading}>
          {loading ? <div className="spinner"></div> : `Convert ${from} to ${to}`}
        </button>

        <button 
          onClick={saveFavorite}
          style={{marginTop: '10px', background: 'transparent', border: '1px solid gray', color: 'white', width: '100%', padding: '10px', borderRadius: '12px', cursor: 'pointer'}}
        >
          ⭐ Save Pair to Favorites
        </button>

        {/* FAVORITES LIST */}
        <div className="favorites">
          <p>Your Favorite Pairs:</p>
          {favorites.map(pair => (
            <span key={pair} className="fav-item" onClick={() => {
              const [f, t] = pair.split('/');
              setFrom(f); setTo(t);
            }}>
              {pair}
            </span>
          ))}
          {favorites.length > 0 && 
            <button onClick={() => {setFavorites([]); localStorage.clear();}} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}>Clear All</button>
          }
        </div>
      </div>
    </div>
  );
}