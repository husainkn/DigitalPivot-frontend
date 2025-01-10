import React, { useEffect, useState } from 'react';
import { fetchStocks } from '../services/stockService';

const StockList = ({ onSelectStock }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      const data = await fetchStocks();
      setStocks(data);
    };
    loadStocks();
  }, []);

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.Ticker} onClick={() => onSelectStock(stock)}>
            {stock.Name} ({stock.Ticker})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
