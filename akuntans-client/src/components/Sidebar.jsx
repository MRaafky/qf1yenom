import React from 'react';
import { FiSearch, FiHome, FiGrid, FiFolder, FiDollarSign, FiList, FiRefreshCcw, FiArrowDownCircle } from 'react-icons/fi';

const Sidebar = ({ isDarkMode }) => {
  // Data menu dummy agar mudah dibaca
  const menuItems = [
    { icon: FiHome, label: 'Home' },
    { icon: FiGrid, label: 'Dashboard' },
    { icon: FiFolder, label: 'Project' },
  ];

  const financialItems = [
    { icon: FiDollarSign, label: 'Revenue & Pricing', active: true }, // Yang sedang aktif di gambar
    { icon: FiList, label: 'Transactions' },
    { icon: FiRefreshCcw, label: 'Refunds & Adjusments' },
    { icon: FiArrowDownCircle, label: 'WithDrawals' },
  ];

  return (
    <div className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-screen fixed left-0 top-0 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-r p-5 flex flex-col`}>
      {/* Logo Placeholder */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        <div>
          <h1 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-sm leading-tight`}>akuntans</h1>
          <p className="text-xs text-gray-400">Surakarta</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-5">
        <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search for anything..."
          className={`w-full ${isDarkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-500' : 'bg-gray-50 text-gray-600 placeholder-gray-400'} rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300 text-sm`}
        />
      </div>

      {/* Menu Utama */}
      <nav className="space-y-0.5 mb-5">
        {menuItems.map((item, index) => (
          <a key={index} href="#" className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'} px-3 py-2.5 rounded-lg transition-colors text-sm`}>
            <item.icon size={18} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Financials Menu (Accordion style opened) */}
      <div className="mb-2">
        <div className="flex justify-between items-center text-gray-400 px-3 mb-1.5">
          <span className="flex items-center gap-3 font-medium text-sm"><FiDollarSign size={18} /> Financials</span>
        </div>
        <nav className="space-y-0.5 pl-3 relative">
          {/* Garis vertikal di kiri submenu */}
          <div className={`absolute left-6 top-0 bottom-0 w-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          {financialItems.map((item, index) => (
            <a key={index} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative z-10 text-sm ${item.active ? 'text-blue-600 bg-blue-50 font-semibold' : isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;