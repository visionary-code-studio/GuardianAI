import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { User, Stethoscope } from 'lucide-react';

const RoleSelection = () => {
    return (
        <AuthLayout
            title="Join Guardian AI"
            subtitle="Choose your account type to get started"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Link
                    to="/signup?role=patient"
                    className="flex flex-col items-center p-6 border-2 border-gray-100 rounded-xl hover:border-primary hover:bg-blue-50 transition-all cursor-pointer group"
                >
                    <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Patient</h3>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Access your health records and consult with doctors.
                    </p>
                </Link>

                <Link
                    to="/signup?role=doctor"
                    className="flex flex-col items-center p-6 border-2 border-gray-100 rounded-xl hover:border-primary hover:bg-blue-50 transition-all cursor-pointer group"
                >
                    <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                        <Stethoscope className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Doctor</h3>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Manage patients and provide medical consultations.
                    </p>
                </Link>
            </div>

            <div className="mt-6 text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default RoleSelection;
