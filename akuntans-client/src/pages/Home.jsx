import React, { useState, useMemo } from 'react';
import { Home as HomeIcon, Settings, FileText, ClipboardList, BarChart3, Lock, LogOut, Search, Bell, Sun, Moon, User } from 'lucide-react';

export default function Home({ isDarkMode, setIsDarkMode }) {
    const transactions = [
        { id: 1, date: 'Nov 25', name: 'nguyen', card: 'VISA', lastDigits: '447', amount: '$2,624.98', status: 'Success' },
        { id: 2, date: 'Nov 27', name: 'Raffky', card: 'VISA', lastDigits: '517', amount: '$211,624.98', status: 'Processing' },
        { id: 3, date: 'Nov 29', name: 'Kama', card: 'VISA', lastDigits: '517', amount: '$211,624.98', status: 'Failed' },
        { id: 4, date: 'Nov 27', name: 'Raffky', card: 'VISA', lastDigits: '517', amount: '$211,624.98', status: 'Processing' },
        { id: 5, date: 'Nov 25', name: 'Nguyen', card: 'VISA', lastDigits: '447', amount: '$2,624.98', status: 'Success' },
        { id: 6, date: 'Nov 29', name: 'Kama', card: 'VISA', lastDigits: '517', amount: '$211,624.98', status: 'Failed' },
    ];

    const bankData = [
        { name: 'BRI', count: 10, color: '#16a34a', bgColor: 'bg-green-600', logo: 'BRI' },
        { name: 'BNI', count: 3, color: '#eab308', bgColor: 'bg-yellow-500', logo: 'BNI' },
        { name: 'Bank Jateng', count: 5, color: '#9ca3af', bgColor: 'bg-gray-400', logo: 'Bank Jateng' },
    ];

    // Calculate total and donut chart segments dynamically
    const chartData = useMemo(() => {
        const total = bankData.reduce((sum, bank) => sum + bank.count, 0);
        const circumference = 2 * Math.PI * 40; // radius = 40

        let currentOffset = 0;
        const segments = bankData.map(bank => {
            const percentage = (bank.count / total) * 100;
            const dashArray = (percentage / 100) * circumference;
            const segment = {
                ...bank,
                percentage,
                dashArray,
                dashOffset: currentOffset
            };
            currentOffset += dashArray;
            return segment;
        });

        return { total, segments, circumference };
    }, [bankData]);

    const getStatusColor = (status) => {
        if (isDarkMode) {
            switch (status) {
                case 'Success': return 'bg-green-900 text-green-300';
                case 'Processing': return 'bg-purple-900 text-purple-300';
                case 'Failed': return 'bg-red-900 text-red-300';
                default: return 'bg-gray-800 text-gray-300';
            }
        }
        switch (status) {
            case 'Success': return 'bg-green-100 text-green-700';
            case 'Processing': return 'bg-purple-100 text-purple-700';
            case 'Failed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-8 py-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex-1 max-w-xl">
                        <div className="relative">
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="text"
                                placeholder="Search for anything..."
                                className={`w-full pl-10 pr-4 py-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200'} border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-6">
                        <button className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}>
                            <Bell className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        </button>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} rounded-lg transition-colors`}
                        >
                            {isDarkMode ? <Moon className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-white" />}
                        </button>
                        <button className={`w-8 h-8 ${isDarkMode ? 'bg-red-900' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                            <span className={`text-xs font-semibold ${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>U</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className={`flex-1 overflow-auto p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-8`}>Overview</h1>

                {/* Balance Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 border`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>$</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <span className="text-xs">↗</span>
                                <span>+2.45%</span>
                            </div>
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Total Balance</div>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$ 4,500.12</div>
                    </div>

                    {/* Card 2 */}
                    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 border`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center`}>
                                <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-semibold`}>$</span>
                            </div>
                            <select className={`text-sm ${isDarkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-transparent'} border-none focus:outline-none cursor-pointer`}>
                                <option>Monthly</option>
                                <option>Weekly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Total Balance</div>
                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>$ 104,500.12</div>
                    </div>

                    {/* Card 3 - Payment Cards */}
                    <div className="space-y-3">
                        <div className={`${isDarkMode ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-100'} rounded-2xl p-4 border`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className={`text-xs ${isDarkMode ? 'text-blue-300' : 'text-blue-600'} mb-1`}>2 Doe Payment</div>
                                    <div className={`text-xl font-bold ${isDarkMode ? 'text-blue-100' : 'text-blue-900'}`}>$ 104,500.12</div>
                                </div>
                                <button className={`px-4 py-1.5 ${isDarkMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-100'} text-sm font-medium rounded-lg transition-colors`}>
                                    Pay
                                </button>
                            </div>
                        </div>
                        <div className={`${isDarkMode ? 'bg-green-900 border-green-800' : 'bg-green-50 border-green-100'} rounded-2xl p-4 border`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className={`text-xs ${isDarkMode ? 'text-green-300' : 'text-green-600'} mb-1`}>Submision</div>
                                    <div className={`text-xl font-bold ${isDarkMode ? 'text-green-100' : 'text-green-900'}`}>$ 104,500.12</div>
                                </div>
                                <button className="px-4 py-1.5 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Transactions Table */}
                    <div className={`col-span-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border overflow-hidden`}>
                        <div className={`p-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                            <div className="flex items-center justify-between">
                                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Paid this month</h2>
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last 30 day</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                                            <td className="px-6 py-4">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>{transaction.date}</td>
                                            <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{transaction.name}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-blue-600">{transaction.card}</span>
                                                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>**** {transaction.lastDigits}</span>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{transaction.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Global Team Chart */}
                    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-6 border`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Global Team</h2>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{bankData.length} Bank</span>
                        </div>

                        {/* Donut Chart - Dynamic */}
                        <div className="relative w-48 h-48 mx-auto mb-8">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={isDarkMode ? '#374151' : '#e5e7eb'}
                                    strokeWidth="12"
                                />
                                {/* Dynamic segments */}
                                {chartData.segments.map((segment, index) => (
                                    <circle
                                        key={index}
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke={segment.color}
                                        strokeWidth="12"
                                        strokeDasharray={`${segment.dashArray} ${chartData.circumference}`}
                                        strokeDashoffset={-segment.dashOffset}
                                    />
                                ))}
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{chartData.total}</span>
                            </div>
                        </div>

                        {/* Bank List */}
                        <div className="space-y-4">
                            {chartData.segments.map((segment, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: segment.color }}
                                    >
                                        <span className="text-white text-xs font-bold">
                                            {segment.logo === 'BRI' ? 'BRI' : segment.logo === 'BNI' ? 'BNI' : 'JT'}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{segment.name}</span>
                                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{segment.count}</span>
                                        </div>
                                        <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${segment.percentage}%`,
                                                    backgroundColor: segment.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}