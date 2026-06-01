import React from 'react';
import { Calendar, Video, MapPin, Clock, Search, Filter } from 'lucide-react';

const Appointments = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-600 mt-1">Book and manage your doctor consultations</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    Book New
                </button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search doctors, specialties..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {[
                    { doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.9, time: 'Today, 2:00 PM', type: 'Video', status: 'Upcoming' },
                    { doctor: 'Dr. Michael Chen', specialty: 'Dermatologist', rating: 4.8, time: 'Feb 18, 10:30 AM', type: 'In-person', status: 'Confirmed' },
                    { doctor: 'Dr. Emily Wilson', specialty: 'General Physician', rating: 4.7, time: 'Feb 10', type: 'Video', status: 'Completed' }
                ].map((apt, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-600">
                                    {apt.doctor.split(' ').map(n => n[0]).slice(1).join('')}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{apt.doctor}</h3>
                                    <p className="text-sm text-gray-600">{apt.specialty}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                    apt.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                        'bg-gray-100 text-gray-700'
                                }`}>
                                {apt.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                {apt.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                {apt.type === 'Video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                                {apt.type === 'Video' ? 'Video Consultation' : 'City General Hospital, NYC'}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors">
                                Reschedule
                            </button>
                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                                {apt.type === 'Video' ? 'Join Call' : 'View Details'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Appointments;
