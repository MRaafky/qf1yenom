import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiSun, FiMoon, FiUser, FiSettings, FiLogOut, FiCheck } from 'react-icons/fi';

const Header = ({ isDarkMode, setIsDarkMode }) => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const notifRef = useRef(null);
    const profileRef = useRef(null);

    // Sample notifications data
    const notifications = [
        { id: 1, title: 'New Transaction', message: 'Revenue received: $1,250', time: '5 min ago', unread: true },
        { id: 2, title: 'Refund Processed', message: 'Refund #12345 completed', time: '1 hour ago', unread: true },
        { id: 3, title: 'Report Ready', message: 'Monthly report is ready to download', time: '2 hours ago', unread: false },
        { id: 4, title: 'Payment Due', message: 'Invoice #789 is due tomorrow', time: '1 day ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`flex justify-between items-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <h1 className="text-2xl font-bold">Overview</h1>

            <div className="flex items-center gap-3">
                {/* Notification Button */}
                <div ref={notifRef} className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-400 hover:bg-gray-100'} p-2 rounded-lg transition`}
                    >
                        <FiBell size={18} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                    </button>

                    {/* Notification Panel */}
                    {showNotifications && (
                        <div className={`absolute right-0 mt-2 w-80 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg border z-50`}>
                            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex justify-between items-center">
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">{unreadCount} new</span>
                                    )}
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} cursor-pointer transition ${notif.unread ? (isDarkMode ? 'bg-gray-750' : 'bg-blue-50') : ''}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{notif.title}</h4>
                                            {notif.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                                        </div>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{notif.message}</p>
                                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{notif.time}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`p-3 text-center border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All Notifications</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dark/Light Mode Toggle */}
                <div className={`flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-1`}>
                    <button
                        onClick={() => setIsDarkMode(false)}
                        className={`p-1.5 rounded-md transition ${!isDarkMode ? 'bg-white text-blue-500 shadow-sm' : isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}
                    >
                        <FiSun size={14} />
                    </button>
                    <button
                        onClick={() => setIsDarkMode(true)}
                        className={`p-1.5 rounded-md transition ${isDarkMode ? 'bg-gray-600 text-yellow-400 shadow-sm' : 'text-gray-400'}`}
                    >
                        <FiMoon size={14} />
                    </button>
                </div>

                {/* Profile Dropdown */}
                <div ref={profileRef} className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="focus:outline-none"
                    >
                        <img
                            src="https://i.pravatar.cc/100?img=5"
                            alt="Profile"
                            className={`w-9 h-9 rounded-full border-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} shadow-sm cursor-pointer hover:border-blue-400 transition`}
                        />
                    </button>

                    {/* Profile Menu */}
                    {showProfile && (
                        <div className={`absolute right-0 mt-2 w-64 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg border z-50`}>
                            {/* User Info */}
                            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://i.pravatar.cc/100?img=5"
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>john.doe@example.com</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button className={`w-full flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} transition`}>
                                    <FiUser size={16} />
                                    <span className="text-sm">My Profile</span>
                                </button>
                                <button className={`w-full flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} transition`}>
                                    <FiSettings size={16} />
                                    <span className="text-sm">Settings</span>
                                </button>
                            </div>

                            {/* Logout */}
                            <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-2`}>
                                <button className={`w-full flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-50 text-red-600'} transition`}>
                                    <FiLogOut size={16} />
                                    <span className="text-sm">Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;