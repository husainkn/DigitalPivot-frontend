import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fetchStocks, fetchStockDetails } from '../services/stockService';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterTicker, setFilterTicker] = useState('');

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
        setFilteredStocks(data);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      }
    };
    loadStocks();
  }, []);

  useEffect(() => {
    // Apply filters whenever filter inputs or stock data change
    const filtered = stocks.filter((stock) =>
      stock.name.toLowerCase().includes(filterName.toLowerCase()) &&
      stock.ticker.toLowerCase().includes(filterTicker.toLowerCase())
    );
    setFilteredStocks(filtered);
  }, [filterName, filterTicker, stocks]);

  const handleRowClick = async (ticker) => {
    try {
      const stockDetails = await fetchStockDetails(ticker);
      setModalData(stockDetails);
      setShowModal(true);
    } catch (error) {
      console.error('Failed to fetch stock details:', error);
    }
  };

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Stock Name',
      cell: (info) => info.getValue(),
      enableSorting: true,
    }),
    columnHelper.accessor('ticker', {
      header: 'Ticker',
      enableSorting: true,
    }),
    columnHelper.accessor('quantityDB', {
      header: 'Quantity',
      enableSorting: true,
    }),
    columnHelper.accessor('minBuy', {
      header: 'Min Buy',
      enableSorting: true,
    }),
    columnHelper.accessor('maxSell', {
      header: 'Max Sell',
      enableSorting: true,
    }),
    columnHelper.accessor('currentPrice', {
      header: 'Current Price',
      enableSorting: true,
    }),
    columnHelper.accessor('averagePrice', {
      header: 'Average Price',
      enableSorting: true,
    }),
    columnHelper.accessor('pieQuantity', {
      header: 'Pie Quantity',
      enableSorting: true,
    }),
  ];

  const table = useReactTable({
    data: filteredStocks,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <h1>Stocks</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filter by Stock Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Filter by Ticker"
          value={filterTicker}
          onChange={(e) => setFilterTicker(e.target.value)}
        />
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'
                  ) : (
                    ''
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.original.ticker)}
              style={{ cursor: 'pointer' }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && modalData && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowModal(false)}>Close</button>
            <h2>Stock Details</h2>
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Currency</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {modalData.map((row, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor:
                        row.Action &&
                        row.Action.toLowerCase().includes('sell')
                          ? 'red'
                          : 'transparent',
                      color:
                        row.Action &&
                        row.Action.toLowerCase().includes('sell')
                          ? 'white'
                          : 'black',
                    }}
                  >
                    <td>{row.Action}</td>
                    <td>{row.NoOfShares}</td>
                    <td>{row.PricePerShare}</td>
                    <td>{row.Currency_PPS}</td>
                    <td>{row.TransactionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockList;
