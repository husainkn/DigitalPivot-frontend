import React, { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { fetchStocks } from '../services/stockService';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const data = await fetchStocks();
        setStocks(data);
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
      }
    };
    loadStocks();
  }, []);

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
    data: stocks,
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
