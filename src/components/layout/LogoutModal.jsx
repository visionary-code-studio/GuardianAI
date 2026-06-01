import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 text-center transform scale-100 transition-transform">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="text-red-600 h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure you want to log out?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    You will need to sign in again to access your dashboard.
                </p>

                <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                    >
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
