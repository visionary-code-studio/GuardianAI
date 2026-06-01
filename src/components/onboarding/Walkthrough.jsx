import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check } from 'lucide-react';

const steps = [
    {
        target: 'body', // General welcome
        title: 'Welcome to Guardian AI',
        content: 'Your Personal Health Guardian. Let us show you around.',
        position: 'center'
    },
    {
        target: '[data-tour="health-metrics"]',
        title: 'Health Metrics',
        content: 'Track your vital signs and health status in real-time.',
        position: 'bottom'
    },
    {
        target: '[data-tour="ai-diagnosis"]',
        title: 'Health Assistant',
        content: 'Describe symptoms or upload images for instant AI analysis.',
        position: 'right'
    },
    {
        target: '[data-tour="appointments"]',
        title: 'Appointments',
        content: 'Book video or physical consultations with top doctors.',
        position: 'right'
    },
    {
        target: '[data-tour="smart-pharmacy"]',
        title: 'Smart Pharmacy',
        content: 'Comparing medicine prices from Apollo & Tata 1mg is coming soon!',
        position: 'right'
    }
];

const Walkthrough = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsVisible(false);
            onComplete && onComplete();
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] pointer-events-none">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black pointer-events-auto"
                    onClick={() => setIsVisible(false)} // Click outside to close (optional)
                />

                {/* Modal/Tooltip */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Position logic would go here, effectively centering for MVP */}
                    <motion.div
                        key={currentStep}
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white p-6 rounded-2xl shadow-xl w-96 max-w-[90vw] pointer-events-auto relative"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6">
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                                Step {currentStep + 1} of {steps.length}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {steps[currentStep].title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {steps[currentStep].content}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                                {currentStep === steps.length - 1 ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
};

export default Walkthrough;
