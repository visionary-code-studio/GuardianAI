import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PatientDashboard from './components/dashboard/PatientDashboard';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import HealthAssistant from './components/features/HealthAssistant';
import Appointments from './components/features/Appointments';
import Prescriptions from './components/features/Prescriptions';
import MentalHealth from './components/features/MentalHealth';
import Walkthrough from './components/onboarding/Walkthrough';
import Login from './pages/auth/Login';
import RoleSelection from './pages/auth/RoleSelection';
import Signup from './pages/auth/Signup';
import HealthMetrics from './pages/patient/HealthMetrics';

// Placeholder components for views not yet implemented or doctor specific
const PlaceholderView = ({ title }) => (
  <div className="p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm h-96 flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold text-gray-300 mb-4">{title}</h2>
    <p className="text-gray-400">This feature is currently under development.</p>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const DashboardLayout = ({ children, userType, currentView, setCurrentView, sidebarOpen, setSidebarOpen, notifications }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <Sidebar
        userType={userType}
        currentView={currentView}
        setCurrentView={setCurrentView}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentView={currentView}
          notifications={notifications}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth bg-gray-50/50">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('role') || 'patient');
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState(3);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show walkthrough on first load for patient
    if (userType === 'patient') {
      const hasSeenWalkthrough = localStorage.getItem('guardian_walkthrough_seen');
      if (!hasSeenWalkthrough && location.pathname === '/') {
        setShowWalkthrough(true);
      }
    }
  }, [userType, location]);

  const handleWalkthroughComplete = () => {
    setShowWalkthrough(false);
    localStorage.setItem('guardian_walkthrough_seen', 'true');
  };

  // Mock Vital Signs Data
  const [vitalSigns, setVitalSigns] = useState({
    heartRate: { value: 72, status: 'normal', threshold: { min: 60, max: 100 } },
    bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
    oxygenLevel: { value: 98, status: 'normal', threshold: { min: 95 } },
    temperature: { value: 98.6, status: 'normal', threshold: { min: 97, max: 99 } },
    respiratoryRate: { value: 16, status: 'normal' },
    glucose: { value: 95, status: 'normal' },
    movement: { value: 'Active', lastDetected: new Date() }
  });

  const renderDashboardContent = () => {
    if (userType === 'patient') {
      switch (currentView) {
        case 'dashboard': return <PatientDashboard vitalSigns={vitalSigns} setCurrentView={setCurrentView} />;
        case 'ai-diagnosis': return <HealthAssistant />;
        case 'appointments': return <Appointments />;
        case 'medications': return <Prescriptions />;
        case 'mental-health': return <MentalHealth />;
        case 'health-metrics': return <HealthMetrics />;
        case 'sos-system': return <PlaceholderView title="The Crown Jewel — Guardian SOS System" />;
        case 'nutrition': return <PlaceholderView title="Nutrition Plan" />;
        case 'records': return <PlaceholderView title="Health Records" />;
        case 'devices': return <PlaceholderView title="Connected Devices" />;
        default: return <PlaceholderView title={currentView.replace('-', ' ')} />;
      }
    } else {
      switch (currentView) {
        case 'doctor-dashboard': return <DoctorDashboard />;
        case 'appointments': return <PlaceholderView title="Doctor Appointments" />;
        case 'patient-vault': return <PlaceholderView title="Patient Vault" />;
        case 'ai-copilot': return <PlaceholderView title="AI Co-pilot" />;
        case 'prescriptions': return <PlaceholderView title="Prescription Generator" />;
        default: return <PlaceholderView title={currentView.replace('-', ' ')} />;
      }
    }
  };

  // Update userType from localStorage on route change or when needed
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) setUserType(role);
  }, [location]);

  return (
    <>
      {showWalkthrough && <Walkthrough onComplete={handleWalkthroughComplete} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/role-selection" element={<RoleSelection />} />

        {/* Protected Dashboard Route */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout
                userType={userType}
                currentView={currentView}
                setCurrentView={setCurrentView}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                notifications={notifications}
              >
                {renderDashboardContent()}
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
