import React from 'react';
import { Plus, Brain, Clipboard, BarChart3, Video, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorDashboard = () => {
    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg"
            >
                <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Johnson!</h1>
                <p className="text-emerald-100 mb-6">Here's your practice overview for today</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Today's Appointments", value: 12 },
                        { label: "Active Patients", value: 248 },
                        { label: "Pending Prescriptions", value: 5 },
                        { label: "AI Alerts", value: 3 }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/20 backdrop-blur-md rounded-lg p-4 transition-transform hover:scale-105">
                            <p className="text-sm text-emerald-100 font-medium">{stat.label}</p>
                            <p className="text-4xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'New Patient', icon: Plus, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
                    { label: 'AI Co-pilot', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
                    { label: 'Prescriptions', icon: Clipboard, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                    { label: 'Analytics', icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' }
                ].map((action, i) => (
                    <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 ${action.bg} border-2 ${action.border} rounded-xl hover:shadow-lg transition-all flex flex-col items-center justify-center gap-3`}
                    >
                        <action.icon className={`w-8 h-8 ${action.color}`} />
                        <p className="font-bold text-gray-900">{action.label}</p>
                    </motion.button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-border p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        Today's Schedule
                    </h2>
                    <div className="space-y-3">
                        {[
                            { time: '9:00 AM', patient: 'John Smith', type: 'Follow-up', status: 'completed' },
                            { time: '9:30 AM', patient: 'Emily Davis', type: 'Video Call', status: 'in-progress' },
                            { time: '10:00 AM', patient: 'Michael Brown', type: 'New Patient', status: 'upcoming' },
                            { time: '10:30 AM', patient: 'Sarah Johnson', type: 'Check-up', status: 'upcoming' }
                        ].map((apt, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-lg transition-colors ${apt.status === 'completed' ? 'bg-gray-50' :
                                    apt.status === 'in-progress' ? 'bg-emerald-50 border border-emerald-200' :
                                        'bg-blue-50 border border-blue-100'
                                }`}>
                                <div className="flex items-center gap-4">
                                    <div className="text-center min-w-[60px]">
                                        <p className="text-sm font-bold text-gray-900">{apt.time.split(' ')[0]}</p>
                                        <p className="text-xs text-gray-500">{apt.time.split(' ')[1]}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">{apt.patient}</p>
                                        <p className="text-sm text-gray-600">{apt.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {apt.status === 'in-progress' && (
                                        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2 text-sm font-medium transition-colors">
                                            <Video className="w-4 h-4" />
                                            Join
                                        </button>
                                    )}
                                    {apt.status === 'upcoming' && (
                                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                                            Details
                                        </button>
                                    )}
                                    {apt.status === 'completed' && (
                                        <span className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium">
                                            <CheckCircle className="w-4 h-4" />
                                            Done
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Patient Alerts */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-red-100 p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        AI Patient Alerts
                    </h2>
                    <div className="space-y-3">
                        {[
                            { patient: 'Robert Wilson', alert: 'Irregular blood pressure readings', priority: 'high', time: '1 hour ago' },
                            { patient: 'Linda Martinez', alert: 'Missed 2 medication doses', priority: 'medium', time: '3 hours ago' },
                            { patient: 'James Anderson', alert: 'Sleep quality declining', priority: 'low', time: '1 day ago' }
                        ].map((alert, i) => (
                            <div key={i} className={`p-4 rounded-lg border transition-all hover:shadow-sm ${alert.priority === 'high' ? 'bg-red-50 border-red-200' :
                                    alert.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                                        'bg-blue-50 border-blue-200'
                                }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <AlertCircle className={`w-4 h-4 ${alert.priority === 'high' ? 'text-red-600' :
                                                    alert.priority === 'medium' ? 'text-yellow-600' :
                                                        'text-blue-600'
                                                }`} />
                                            <p className="font-bold text-gray-900">{alert.patient}</p>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-blue-100 text-blue-700'
                                                }`}>
                                                {alert.priority}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">{alert.alert}</p>
                                        <p className="text-xs text-gray-500">{alert.time}</p>
                                    </div>
                                    <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium text-xs transition-colors self-start shadow-sm">
                                        Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
