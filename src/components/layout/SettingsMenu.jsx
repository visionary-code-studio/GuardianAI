import React, { useState, useEffect } from 'react';
import { User, Settings, Moon, Sun, LogOut, Shield, ChevronRight, Lock, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SettingsMenu = ({ isOpen, onClose, onLogout }) => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Load theme from local storage
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-16 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50 origin-top-right"
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                            {/* Placeholder Avatar */}
                            JD
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">John Doe</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Patient ID: #12345</p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
                            <User size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            <span>Profile</span>
                            <ChevronRight size={16} className="ml-auto text-gray-300 dark:text-gray-600" />
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
                            <Lock size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            <span>Account Settings</span>
                            <ChevronRight size={16} className="ml-auto text-gray-300 dark:text-gray-600" />
                        </button>

                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors group">
                            <Bell size={18} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            <span>Notifications</span>
                        </button>
                    </div>

                    <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

                    {/* Appearance */}
                    <div className="px-3 py-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                                {isDarkMode ? <Moon size={18} className="text-purple-500" /> : <Sun size={18} className="text-orange-500" />}
                                <span>Dark Mode</span>
                            </div>
                            <button
                                onClick={toggleTheme}
                                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

                    {/* Footer */}
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SettingsMenu;
