import React, { useState } from 'react';
import { Heart, Activity, Wind, Thermometer, Footprints, Plus } from 'lucide-react';
import VitalCard from '../../components/dashboard/health/VitalCard';
import HealthTrends from '../../components/dashboard/health/HealthTrends';
import AIInsights from '../../components/dashboard/health/AIInsights';
import HealthInputModal from '../../components/dashboard/health/HealthInputModal';
import { Button } from '../../components/ui/Button';

// Mock Data
const heartRateData = [
    { day: 'Mon', value: 72 },
    { day: 'Tue', value: 75 },
    { day: 'Wed', value: 71 },
    { day: 'Thu', value: 73 },
    { day: 'Fri', value: 78 },
    { day: 'Sat', value: 74 },
    { day: 'Sun', value: 72 },
];

const HealthMetrics = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stats, setStats] = useState({
        heartRate: { value: 72, status: 'normal', trend: '-2 bpm from yesterday' },
        bp: { value: '120/80', status: 'normal', trend: 'Stable' },
        oxygen: { value: 98, status: 'normal', trend: 'Optimal' },
        temp: { value: 98.6, status: 'normal', trend: 'Normal' },
        sleep: { value: '7h 30m', status: 'warning', trend: '-30m from goal' },
        steps: { value: 8432, status: 'normal', trend: 'Daily goal reached' },
    });

    const handleAddData = (data) => {
        console.log('New Health Data:', data);
        // In a real app, this would update the state or backend
        setStats(prev => ({
            ...prev,
            heartRate: { ...prev.heartRate, value: data.heartRate },
            temp: { ...prev.temp, value: data.temperature },
            oxygen: { ...prev.oxygen, value: data.oxygen },
            steps: { ...prev.steps, value: data.steps || prev.steps.value },
            bp: { ...prev.bp, value: `${data.systolic}/${data.diastolic}` }
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Health Metrics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track and monitor your vital health signs</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" disabled>
                        Sync Device (Coming Soon)
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} className="mr-2" />
                        Add Measurement
                    </Button>
                </div>
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VitalCard
                    title="Heart Rate"
                    value={stats.heartRate.value}
                    unit="bpm"
                    icon={Heart}
                    status={stats.heartRate.status}
                    trend={stats.heartRate.trend}
                />
                <VitalCard
                    title="Blood Pressure"
                    value={stats.bp.value}
                    unit="mmHg"
                    icon={Activity}
                    status={stats.bp.status}
                    trend={stats.bp.trend}
                />
                <VitalCard
                    title="Oxygen Level"
                    value={stats.oxygen.value}
                    unit="%"
                    icon={Wind}
                    status={stats.oxygen.status}
                    trend={stats.oxygen.trend}
                />
                <VitalCard
                    title="Body Temp"
                    value={stats.temp.value}
                    unit="°F"
                    icon={Thermometer}
                    status={stats.temp.status}
                    trend={stats.temp.trend}
                />
                <VitalCard
                    title="Sleep Score"
                    value="85"
                    unit="/100"
                    icon={Activity}
                    status={stats.sleep.status}
                    trend={stats.sleep.trend}
                />
                <VitalCard
                    title="Steps"
                    value={stats.steps.value}
                    unit="steps"
                    icon={Footprints}
                    status={stats.steps.status}
                    trend={stats.steps.trend}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trends Chart */}
                <div className="lg:col-span-2">
                    <HealthTrends data={heartRateData} title="Heart Rate Trend (7 Days)" />
                </div>

                {/* AI Insights & Actions */}
                <div className="space-y-6">
                    <AIInsights
                        insights={[
                            "Your heart rate has been stable over the last 7 days.",
                            "Sleep quality has slightly decreased. Try going to bed 30 mins earlier.",
                            "Your daily step count is consistent with your personalized goal."
                        ]}
                    />
                </div>
            </div>

            <HealthInputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddData}
            />
        </div>
    );
};

export default HealthMetrics;
