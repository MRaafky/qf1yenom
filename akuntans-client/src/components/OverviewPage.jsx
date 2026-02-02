import React, { useState } from 'react';
import Header from '../components/Header';
import { FiDollarSign, FiArrowUp, FiInfo, FiChevronDown } from 'react-icons/fi';

// --- Komponen Kecil untuk Kartu ---
const BalanceCard = ({ title, amount, icon: Icon, percentage, hasDropdown, bgColor = "bg-white", isDarkMode }) => (
    <div className={`${isDarkMode ? 'bg-gray-800' : bgColor} p-6 rounded-2xl shadow-sm flex flex-col justify-between relative`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                <Icon size={20} />
            </div>
            {percentage && (
                <div className="flex items-center gap-1 text-green-500 text-sm font-semibold">
                    <FiArrowUp size={16} /> <span>{percentage}</span> <FiInfo size={14} className="text-gray-400 ml-1" />
                </div>
            )}
            {hasDropdown && (
                <button className={`flex items-center gap-1 text-xs ${isDarkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'} px-3 py-1.5 rounded-lg transition font-medium`}>
                    Monthly <FiChevronDown size={14} />
                </button>
            )}
        </div>
        <div>
            <p className="text-gray-400 text-xs mb-2 font-medium">{title}</p>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{amount}</h2>
        </div>
    </div>
);

const ActionCard = ({ title, amount, buttonText, buttonColor, isDarkMode }) => {
    const bgClass = buttonColor === 'blue'
        ? (isDarkMode ? 'bg-blue-900' : 'bg-blue-50')
        : (isDarkMode ? 'bg-green-900' : 'bg-green-50');
    const buttonBgClass = buttonColor === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600';

    return (
        <div className={`${bgClass} p-5 rounded-2xl flex justify-between items-center`}>
            <div>
                <p className="text-gray-400 text-xs mb-1.5 font-medium">{title}</p>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{amount}</h2>
            </div>
            <button className={`${buttonBgClass} text-white px-5 py-2 rounded-xl text-sm font-semibold transition shadow-sm`}>
                {buttonText}
            </button>
        </div>
    );
}


// --- Data Dummy Transaksi ---
const transactionData = [
    { id: 1, date: 'Nov 25', name: 'nguyen', card: '**** 447', amount: '$2,624,98', status: 'Succes' },
    { id: 2, date: 'Nov 27', name: 'Raffky', card: '**** 517', amount: '$211,624,98', status: 'Processing' },
    { id: 3, date: 'Nov 29', name: 'Kama', card: '**** 517', amount: '$211,624,98', status: 'Failed' },
    { id: 4, date: 'Nov 27', name: 'Raffky', card: '**** 517', amount: '$211,624,98', status: 'Processing' },
    { id: 5, date: 'Nov 25', name: 'Nguyen', card: '**** 447', amount: '$2,624,98', status: 'Succes' },
    { id: 6, date: 'Nov 29', name: 'Kama', card: '**** 517', amount: '$211,624,98', status: 'Failed' },
];

// --- Komponen Utama Halaman ---
const OverviewPage = ({ isDarkMode, setIsDarkMode }) => {
    const [toggle30Day, setToggle30Day] = useState(true);

    // Fungsi untuk menentukan warna badge status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Succes': return 'bg-green-100 text-green-600';
            case 'Processing': return 'bg-gray-100 text-gray-600';
            case 'Failed': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    }

    return (
        <div className="ml-64 p-8 min-h-screen"> {/* Full page layout */}
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* Section Kartu Atas */}
            <div className="grid grid-cols-3 gap-5 mb-6">
                {/* Kartu 1 - dengan background putih */}
                <BalanceCard
                    title="Total Balance"
                    amount="$ 4,500.12"
                    icon={FiDollarSign}
                    percentage="+2.45%"
                    isDarkMode={isDarkMode}
                />
                {/* Kartu 2 */}
                <BalanceCard
                    title="Total Balance"
                    amount="$ 104,500.12"
                    icon={FiDollarSign}
                    hasDropdown={true}
                    isDarkMode={isDarkMode}
                />
                {/* Kartu 3 (Split 2 Aksi) */}
                <div className="flex flex-col gap-3">
                    <ActionCard title="Total Balance" amount="$ 104,500.12" buttonText="Pay" buttonColor="blue" isDarkMode={isDarkMode} />
                    <ActionCard title="Total Balance" amount="$ 104,500.12" buttonText="Approve" buttonColor="green" isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* Section Tabel Bawah */}
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm p-6`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Paid this month</h2>
                    <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs font-medium`}>
                        Last 30 day
                        {/* Toggle Switch sederhana */}
                        <div
                            className={`w-11 h-6 flex items-center ${toggle30Day ? 'bg-blue-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full p-1 cursor-pointer transition-colors`}
                            onClick={() => setToggle30Day(!toggle30Day)}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${toggle30Day ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>
                </div>

                {/* Tabel Data */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
                            {transactionData.map((item) => (
                                <tr key={item.id} className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                                    <td className="py-3.5 pl-2">
                                        <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 bg-gray-100 border-gray-300 cursor-pointer" />
                                    </td>
                                    <td className={`py-3.5 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm font-medium`}>{item.date}</td>
                                    <td className={`py-3.5 px-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{item.name}</td>
                                    <td className="py-3.5 px-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-blue-600 text-sm">VISA</span>
                                            <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{item.card}</span>
                                        </div>
                                    </td>
                                    <td className={`py-3.5 px-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-right text-sm`}>{item.amount}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OverviewPage;