import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import OverviewPage from './components/OverviewPage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar isDarkMode={isDarkMode} />
      <OverviewPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App;