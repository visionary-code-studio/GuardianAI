import React from 'react';
import {
    Home, Activity, Brain, AlertTriangle, Calendar, MessageSquare,
    Pill, Smile, Target, FileText, Stethoscope, Users, Clipboard,
    BarChart3, Shield, ShoppingBag
} from 'lucide-react';
import LogoIcon from './LogoIcon';

const Sidebar = ({ userType, currentView, setCurrentView, sidebarOpen }) => {
    const patientMenuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'health-metrics', label: 'Health Metrics', icon: Activity },
        { id: 'ai-diagnosis', label: 'Health Assistant', icon: Brain },
        { id: 'sos-system', label: 'The Crown Jewel — Guardian SOS System', icon: AlertTriangle },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2 },
        { id: 'medications', label: 'Prescriptions', icon: Pill },
        { id: 'mental-health', label: 'Mental Health', icon: Smile },
        { id: 'nutrition', label: 'Nutrition Plan', icon: Target },
        { id: 'records', label: 'Health Records', icon: FileText },
        { id: 'devices', label: 'Connected Devices', icon: Stethoscope }
    ];

    const doctorMenuItems = [
        { id: 'doctor-dashboard', label: 'Dashboard', icon: Home },
        { id: 'patient-vault', label: 'Patient Vault', icon: Users },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'ai-copilot', label: "AI Co-pilot", icon: Brain },
        { id: 'prescriptions', label: 'Prescriptions', icon: Clipboard },
        { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 5 },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
    ];

    const menuItems = userType === 'patient' ? patientMenuItems : doctorMenuItems;

    return (
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white dark:bg-gray-900 border-r border-border dark:border-gray-800 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
            <div className="p-6 border-b border-border dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <LogoIcon className="w-10 h-10 flex-shrink-0" />
                    {sidebarOpen && <h1 className="text-xl font-bold text-gray-900 dark:text-white">Guardian AI</h1>}
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${currentView === item.id
                            ? userType === 'patient' ? 'bg-blue-600 text-white shadow-md' : 'bg-green-600 text-white shadow-md'
                            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && (
                            <>
                                <span className="font-medium">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {item.badge}
                                    </span>
                                )}
                            </>
                        )}
                    </button>
                ))}

                {/* Smart Pharmacy - Disabled State */}
                {userType === 'patient' && (
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                        <div className="relative group cursor-not-allowed">
                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative bg-black dark:bg-gray-950 border-2 border-red-500 text-gray-400 opacity-80`}
                                disabled
                            >
                                <ShoppingBag className="w-5 h-5 flex-shrink-0 text-red-500" />
                                {sidebarOpen && (
                                    <div className="flex flex-col items-start">
                                        <span className="font-bold text-gray-200">Smart Pharmacy</span>
                                        <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Under Maintenance</span>
                                    </div>
                                )}
                            </button>

                            {/* Tooltip */}
                            {sidebarOpen && (
                                <div className="absolute left-full top-0 ml-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                                    Coming Soon – Price Comparison & Delivery
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <div className="p-6 border-t border-border dark:border-gray-800">
                <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${userType === 'patient' ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-green-600 to-teal-600'
                        }`}>
                        {userType === 'patient' ? 'JD' : 'SJ'}
                    </div>
                    {sidebarOpen && (
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">{userType === 'patient' ? 'John Doe' : 'Dr. Sarah Johnson'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userType === 'patient' ? 'ID: #12345' : 'MD, Cardiologist'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
