import React, { useState } from 'react';
import Home from './pages/Home';
import InputJurnal from './pages/InputJurnal';
import Sidebar from './components/Sidebar';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'Transaksi':
        return <InputJurnal isDarkMode={isDarkMode} />;
      default:
        return <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;