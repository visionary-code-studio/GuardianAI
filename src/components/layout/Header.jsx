import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SettingsMenu from './SettingsMenu';
import LogoutModal from './LogoutModal';

const Header = ({ sidebarOpen, setSidebarOpen, currentView, notifications }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const settingsRef = useRef(null);
    const navigate = useNavigate();

    // Close settings when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setIsSettingsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-border dark:border-gray-800 px-6 py-4 sticky top-0 z-40 transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <div className="hidden sm:block">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                            {currentView.replace('-', ' ')}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        {notifications > 0 && (
                            <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                                {notifications}
                            </span>
                        )}
                    </button>

                    {/* Settings Dropdown */}
                    <div className="relative" ref={settingsRef}>
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`p-2 rounded-lg transition-all duration-300 ${isSettingsOpen ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 rotate-90' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                        >
                            <Settings className="w-6 h-6" />
                        </button>

                        <SettingsMenu
                            isOpen={isSettingsOpen}
                            onClose={() => setIsSettingsOpen(false)}
                            onLogout={() => {
                                setIsSettingsOpen(false);
                                setIsLogoutModalOpen(true);
                            }}
                        />
                    </div>
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </header>
    );
};

export default Header;
