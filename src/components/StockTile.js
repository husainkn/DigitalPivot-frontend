import React from 'react';

const StockTile = ({ stock }) => {
  if (!stock) return <div>Select a stock to view details</div>;

  return (
    <div style={{ border: '1px solid black', padding: '20px', margin: '20px' }}>
      <h2>{stock.Name} ({stock.Ticker})</h2>
      <p><strong>Min Buy Price:</strong> {stock.MinBuyPrice}</p>
      <p><strong>Max Sell Price:</strong> {stock.MaxSellPrice}</p>
      <p><strong>Quantity Held:</strong> {stock.QuantityHeld}</p>
    </div>
  );
};

export default StockTile;
