import React from 'react';
import { Pill, Download, Clock, AlertCircle } from 'lucide-react';

const Prescriptions = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
                    <p className="text-gray-600 mt-1">Manage your medications and refills</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Request Refill
                </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                    <h3 className="font-bold text-blue-900 text-sm">Next Dose Reminder</h3>
                    <p className="text-sm text-blue-800">Take <span className="font-semibold">Metformin 500mg</span> with dinner at 7:00 PM today.</p>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { name: 'Metformin', dosage: '500mg', freq: 'Twice daily', doctor: 'Dr. Sarah Johnson', status: 'Active', refills: 2 },
                    { name: 'Lisinopril', dosage: '10mg', freq: 'Once daily', doctor: 'Dr. Sarah Johnson', status: 'Active', refills: 1 },
                    { name: 'Amoxicillin', dosage: '500mg', freq: 'Three times daily', doctor: 'Dr. Michael Chen', status: 'Completed', refills: 0 }
                ].map((rx, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Pill className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{rx.name} <span className="text-gray-500 font-normal text-base">{rx.dosage}</span></h3>
                                <p className="text-sm text-gray-600">{rx.freq} • Prescribed by {rx.doctor}</p>
                                <div className="flex gap-2 mt-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${rx.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {rx.status}
                                    </span>
                                    {rx.status === 'Active' && (
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                                            {rx.refills} Refills Left
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
                                <Clock className="w-4 h-4" />
                                History
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition-colors">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Prescriptions;
