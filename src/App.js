
import React, { useState } from 'react';
import StockList from './components/StockList';
//import StockTile from './components/StockTile';
import StockDetails from "./components/StockTile";
import Modal from "./components/Modal";

const App = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  return (
    <div>
      <StockList onSelectStock={handleStockClick} />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <StockDetails stock={selectedStock} />
        </Modal>
      )}
    </div>
  );
};

//   return (
//     <div>
//       <StockList onSelectStock={setSelectedStock} />
//       <StockTile stock={selectedStock} />
//     </div>
//   );
// };

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
