import React, { useState, useRef, useEffect } from 'react';
import { FileText, Image as ImageIcon, Mic, Video, Brain, AlertCircle, Radio, Paperclip, X, Upload, Activity, CheckCircle, Smartphone, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HealthAssistant = () => {
    const [selectedInput, setSelectedInput] = useState('symptoms');
    const [symptomText, setSymptomText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    // Voice Recording State
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    // Video Consultation State
    const [showVideoCall, setShowVideoCall] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, connected
    const videoRef = useRef(null);

    // Dummy Doctors Data
    const doctors = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', available: true, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', available: true, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100' },
        { id: 3, name: 'Dr. Emily Davis', specialty: 'Neurologist', available: false, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=100&h=100' },
    ];

    // --- Voice Recognition Setup ---
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    transcript += event.results[i][0].transcript;
                }
                setSymptomText(prev => prev + ' ' + transcript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current.start();
            setIsRecording(true);
            setSelectedInput('symptoms'); // Switch to text input view to see transcription
        }
    };

    // --- Image Handling ---
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    // --- Analysis Handler ---
    const handleAnalyze = async () => {
        if (!symptomText && !imageFile) return;

        setAnalyzing(true);
        setResult(null);

        const formData = new FormData();
        formData.append('symptoms', symptomText);
        formData.append('history', 'No specific history provided.');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/ai/analyze', {
                method: 'POST',
                body: formData, // Auto-sets Content-Type to multipart/form-data
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || 'Analysis failed');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error analyzing symptoms:', error);
            alert(`Analysis failed: ${error.message}. Please ensure the backend is running and GEMINI_API_KEY is set.`);
        } finally {
            setAnalyzing(false);
        }
    };

    // --- Video Consult Logic ---
    const startVideoCall = (doctor) => {
        setSelectedDoctor(doctor);
        setShowVideoCall(true);
        setCallStatus('connecting');

        // Simulate connection delay
        setTimeout(() => {
            setCallStatus('connected');
            // Request user media
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                })
                .catch(err => console.error("Error accessing webcam:", err));
        }, 2000);
    };

    const endVideoCall = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setShowVideoCall(false);
        setCallStatus('idle');
        setSelectedDoctor(null);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Health Assistant</h1>
                    <p className="text-gray-600 mt-1">AI-powered multimodal symptom analysis</p>
                </div>
            </div>

            {/* Input Method Selector */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Input Method</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { id: 'symptoms', label: 'Text/Voice', icon: FileText },
                        { id: 'image', label: 'Image Upload', icon: ImageIcon },
                        { id: 'audio', label: 'Voice Note', icon: Mic },
                        { id: 'video', label: 'Video Consult', icon: Video }
                    ].map(input => (
                        <button
                            key={input.id}
                            onClick={() => {
                                setSelectedInput(input.id);
                                setResult(null);
                                if (input.id === 'audio') toggleRecording(); // Auto-start recording functionality check
                            }}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedInput === input.id
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300 text-gray-600'
                                }`}
                        >
                            <input.icon className={`w-6 h-6 ${selectedInput === input.id ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className="font-medium text-sm">{input.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Input Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedInput}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm min-h-[300px]"
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        {selectedInput === 'symptoms' ? 'Describe your symptoms' :
                            selectedInput === 'image' ? 'Upload visual evidence' :
                                selectedInput === 'audio' ? 'Record your symptoms' : 'Consult a Specialist'}
                    </h2>

                    {/* Text & Voice Analysis Area */}
                    {(selectedInput === 'symptoms' || selectedInput === 'audio') && (
                        <div className="space-y-4">
                            <div className="relative">
                                <textarea
                                    value={symptomText}
                                    onChange={(e) => setSymptomText(e.target.value)}
                                    className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow pr-12"
                                    placeholder="Type your symptoms here or use the microphone..."
                                />
                                <button
                                    onClick={toggleRecording}
                                    className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Image Preview in Text Mode */}
                            {imagePreview && (
                                <div className="relative w-fit inline-block">
                                    <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                                    <button
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-blue-600 transition-colors">
                                    <Paperclip className="w-5 h-5" />
                                    <span className="text-sm font-medium">Attach Image</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={(!symptomText && !imageFile) || analyzing}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                                >
                                    {analyzing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Brain className="w-4 h-4" />
                                            Analyze Symptoms
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Image Upload Area */}
                    {selectedInput === 'image' && (
                        <div className="space-y-4">
                            {!imagePreview ? (
                                <label className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} />
                                    <Upload className="w-12 h-12 mb-4 text-gray-400" />
                                    <p className="font-medium">Click or drag images here</p>
                                    <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                                </label>
                            ) : (
                                <div className="relative h-64 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                                    <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                                    <button
                                        onClick={removeImage}
                                        className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-gray-700 shadow-sm"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}

                            {imagePreview && (
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={analyzing}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition-colors"
                                    >
                                        {analyzing ? 'Analyzing...' : 'Analyze Image'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Video Consultation Area */}
                    {selectedInput === 'video' && !showVideoCall && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {doctors.map(doctor => (
                                <div key={doctor.id} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                                    <div className="relative mb-3">
                                        <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" />
                                        <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${doctor.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">{doctor.specialty}</p>
                                    <button
                                        onClick={() => startVideoCall(doctor)}
                                        disabled={!doctor.available}
                                        className={`w-full py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 ${doctor.available
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Video className="w-4 h-4" />
                                        {doctor.available ? 'Join Call' : 'Unavailable'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Video Call Modal/Overlay */}
            <AnimatePresence>
                {showVideoCall && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    >
                        <div className="bg-gray-900 rounded-2xl w-full max-w-5xl aspect-video relative overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
                            {/* Call Header */}
                            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-center">
                                <div className="text-white">
                                    <h3 className="font-bold text-lg">{selectedDoctor?.name}</h3>
                                    <p className="text-sm text-gray-300 flex items-center gap-2">
                                        {callStatus === 'connecting' ? (
                                            <span className="animate-pulse text-yellow-400">Connecting...</span>
                                        ) : (
                                            <span className="text-green-400">● Connected (00:12)</span>
                                        )}
                                    </p>
                                </div>
                                <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                                    Encrypted End-to-End
                                </div>
                            </div>

                            {/* Main Video Area (Doctor Placeholder) */}
                            <div className="flex-1 bg-gray-800 relative flex items-center justify-center">
                                {callStatus === 'connecting' ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                        <p className="text-gray-400">Establishing secure connection...</p>
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gray-700 flex items-center justify-center relative">
                                        {/* Mock remote video */}
                                        <img src={selectedDoctor?.image} alt="Doctor" className="w-full h-full object-cover opacity-50 blur-sm" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <User className="w-32 h-32 text-gray-500 opacity-50" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Self View (Webcam) */}
                            <div className="absolute bottom-6 right-6 w-48 h-36 bg-black rounded-xl overflow-hidden border-2 border-gray-700 shadow-xl">
                                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                            </div>

                            {/* Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10 flex justify-center gap-4">
                                <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                                    <Mic className="w-6 h-6" />
                                </button>
                                <button className="p-4 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                                    <Video className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={endVideoCall}
                                    className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                                >
                                    <Smartphone className="w-6 h-6 rotate-135" /> {/* Phone hung up icon simulation */}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Results Section */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-blue-200 overflow-hidden shadow-lg"
                >
                    <div className="bg-blue-50 p-6 border-b border-blue-100 flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Brain className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900">Analysis Result</h2>
                            <p className="text-blue-700">Based on provided symptoms</p>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl font-bold text-blue-600">{result.confidence}%</span>
                            <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">Confidence</span>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Possible Condition</h3>
                            <p className="text-2xl font-bold text-gray-900">{result.condition}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-orange-500" />
                                    Key Indicators
                                </h3>
                                <ul className="space-y-2">
                                    {result.indicators.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="block w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    Recommendations
                                </h3>
                                <ul className="space-y-2">
                                    {result.recommendations.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm">
                                Book Specialist
                            </button>
                            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                                Save Report
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HealthAssistant;
