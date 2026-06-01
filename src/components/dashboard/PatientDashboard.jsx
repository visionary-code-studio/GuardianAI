import React from 'react';
import { Heart, Activity, Wind, Thermometer, ChevronRight, CheckCircle, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const PatientDashboard = ({ vitalSigns, setCurrentView }) => {
    return (
        <div className="space-y-6">
            {/* Welcome & Stats Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-blue-100 mb-6">Your health is being monitored 24/7 by Guardian AI</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                        <p className="text-sm text-blue-100 font-medium">Overall Health Score</p>
                        <p className="text-4xl font-bold">87/100</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                        <p className="text-sm text-blue-100 font-medium">Active Days This Week</p>
                        <p className="text-4xl font-bold">6/7</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                        <p className="text-sm text-blue-100 font-medium">Next Appointment</p>
                        <p className="text-2xl font-bold">Feb 18</p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Vital Signs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Heart, label: 'Heart Rate', value: vitalSigns.heartRate.value, unit: 'bpm', status: vitalSigns.heartRate.status, color: 'text-rose-500', bg: 'bg-rose-50' },
                    { icon: Activity, label: 'Blood Pressure', value: `${vitalSigns.bloodPressure.systolic}/${vitalSigns.bloodPressure.diastolic}`, unit: 'mmHg', status: vitalSigns.bloodPressure.status, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { icon: Wind, label: 'Oxygen', value: vitalSigns.oxygenLevel.value, unit: '%', status: vitalSigns.oxygenLevel.status, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                    { icon: Thermometer, label: 'Temperature', value: vitalSigns.temperature.value, unit: '°F', status: vitalSigns.temperature.status, color: 'text-orange-500', bg: 'bg-orange-50' }
                ].map((vital, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 rounded-xl border-2 transition-all hover:shadow-md ${vital.status === 'normal' ? 'bg-white border-border' : 'bg-yellow-50 border-yellow-200'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${vital.bg}`}>
                                <vital.icon className={`w-6 h-6 ${vital.color}`} />
                            </div>
                            {vital.status !== 'normal' && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                    Attention
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1 font-medium">{vital.label}</p>
                        <p className="text-3xl font-bold text-foreground">
                            {vital.value} <span className="text-lg font-normal text-muted-foreground">{vital.unit}</span>
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* AI Insights Preview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl border border-border p-6 shadow-sm"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Today's AI Insights</h2>
                    <button
                        onClick={() => setCurrentView('ai-diagnosis')}
                        className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors"
                    >
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50/50 border border-green-100 rounded-lg transition-colors hover:bg-green-50">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Excellent Vital Trends</h3>
                                <p className="text-sm text-gray-600">All vitals are within the healthy range today. Keep up the good work!</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg transition-colors hover:bg-blue-50">
                        <div className="flex items-start gap-3">
                            <Brain className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Activity Recommendation</h3>
                                <p className="text-sm text-gray-600">Based on your energy levels, today is perfect for a 30-minute moderate walk.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientDashboard;
