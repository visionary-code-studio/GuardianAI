import React, { useState } from 'react';
import { Smile, Frown, Meh, Brain, BookOpen, Activity, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const MentalHealth = () => {
    const [mood, setMood] = useState(null);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Mental Health Guardian</h1>
                    <p className="text-gray-600 mt-1">AI-powered mental wellness support</p>
                </div>
            </div>

            {/* Mood Tracker */}
            <motion.div
                layout
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">How are you feeling today?</h2>
                <div className="flex justify-between max-w-lg mx-auto gap-4">
                    {[
                        { emoji: '😢', label: 'Very Sad', value: 1 },
                        { emoji: '😕', label: 'Sad', value: 2 },
                        { emoji: '😐', label: 'Neutral', value: 3 },
                        { emoji: '🙂', label: 'Good', value: 4 },
                        { emoji: '😄', label: 'Great', value: 5 }
                    ].map((m) => (
                        <button
                            key={m.value}
                            onClick={() => setMood(m.value)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${mood === m.value
                                    ? 'bg-white text-purple-900 transform scale-110 shadow-xl'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            <span className="text-4xl">{m.emoji}</span>
                            <span className="text-xs font-bold">{m.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Recommended Activities */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        Recommended for you
                    </h3>
                    <div className="space-y-3">
                        {[
                            { title: 'Morning Meditation', time: '10 mins', type: 'Audio' },
                            { title: 'Anxiety Relief Breathing', time: '5 mins', type: 'Exercise' },
                            { title: 'Sleep Stories', time: '20 mins', type: 'Audio' }
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-purple-50 hover:border-purple-100 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                        {activity.type === 'Audio' ? <BookOpen className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{activity.title}</h4>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full hover:bg-purple-600 hover:text-white hover:border-transparent transition-all">
                                    Start
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Crisis Support */}
                <div className="bg-rose-50 rounded-xl border border-rose-100 p-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-rose-100 rounded-full">
                            <Phone className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1">Need someone to talk to?</h3>
                            <p className="text-sm text-gray-600 mb-4">Our crisis support team is available 24/7 for you.</p>
                            <div className="flex gap-3">
                                <button className="px-5 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors shadow-sm">
                                    Call Hotline
                                </button>
                                <button className="px-5 py-2 bg-white text-rose-600 border border-rose-200 rounded-lg text-sm font-bold hover:bg-rose-50 transition-colors">
                                    Chat Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentalHealth;
