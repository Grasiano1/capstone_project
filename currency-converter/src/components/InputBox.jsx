import React from 'react'

function InputBox({ label, amount, onAmountChange, onCurrencyChange, currencyOptions = [], selectCurrency = "usd", amountDisable = false }) {
    return (
        <div className="input-container">
            <label className="label">{label}</label>
            <div className="input-row">
                <input
                    className="number-input"
                    type="number"
                    value={amount}
                    disabled={amountDisable}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
                <select
                    className="currency-select"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>{currency.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default InputBox;