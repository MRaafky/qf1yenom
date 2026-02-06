import React from 'react';
import { Home, Settings, FileText, ClipboardList, BarChart3, Lock, LogOut } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, isDarkMode }) => {
  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Settings, label: 'Setup' },
    { icon: FileText, label: 'Transaksi' },
    { icon: ClipboardList, label: 'Laporan' },
    { icon: BarChart3, label: 'Rekap Laporan' },
  ];

  const generalItems = [
    { icon: Lock, label: 'Ganti Password' },
    { icon: LogOut, label: 'Log Out' },
  ];

  return (
    <div className={`w-64 h-screen ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
      {/* Logo Section */}
      <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} border-b`}>
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="w-10 h-10 relative flex-shrink-0">
            <svg viewBox="0 0 40 40" className="w-full h-full">
              {/* Leaf/Medical Icon */}
              <path
                d="M20 8C15 8 12 12 12 16C12 20 15 24 20 28C25 24 28 20 28 16C28 12 25 8 20 8Z"
                fill="#10b981"
                opacity="0.2"
              />
              <path
                d="M20 10C16 10 14 13 14 16C14 19 16 22 20 26C24 22 26 19 26 16C26 13 24 10 20 10Z"
                fill="#10b981"
              />
              {/* Medical Cross Circle */}
              <circle cx="20" cy="16" r="6" fill="#3b82f6" />
              <path
                d="M20 13V19M17 16H23"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-green-600 leading-tight">Rumah Sakit</span>
            <span className="text-xs font-semibold text-blue-600 leading-tight">UMS A.R. Fachrudin</span>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 py-6 overflow-y-auto">
        {/* Menu Label */}
        <div className="px-6 mb-3">
          <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>Menu</span>
        </div>

        {/* Menu Items */}
        <nav className="space-y-1 px-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === item.label
                ? 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* General Label */}
        <div className="px-6 mt-8 mb-3">
          <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider`}>General</span>
        </div>

        {/* General Items */}
        <nav className="space-y-1 px-3">
          {generalItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === item.label
                ? 'bg-blue-50 text-blue-600'
                : isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
              <item.icon className="w-5 h-5" strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;