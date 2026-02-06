import React, { useState } from 'react';
import Home from './pages/Home';
import InputJurnal from './pages/InputJurnal';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = (response) => {
    console.log('Login berhasil:', response);
    setIsAuthenticated(true);
    setCurrentPage('Home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentPage('Home');
  };

  // Jika belum login, tampilkan halaman login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // Jika sudah login, tampilkan dashboard dengan sidebar
  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      case 'Transaksi':
        return <InputJurnal isDarkMode={isDarkMode} />;
      case 'Log Out':
        handleLogout();
        return null;
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