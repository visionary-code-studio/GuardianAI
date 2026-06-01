import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { useForm } from 'react-hook-form';

const HealthInputModal = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    if (!isOpen) return null;

    const onFormSubmit = (data) => {
        onSubmit(data);
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border dark:border-gray-800">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add New Measurement</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Heart Rate (BPM)"
                            type="number"
                            placeholder="72"
                            error={errors.heartRate?.message}
                            {...register('heartRate', { required: 'Required', min: 30, max: 220 })}
                        />
                        <Input
                            label="Oxygen Level (%)"
                            type="number"
                            placeholder="98"
                            error={errors.oxygen?.message}
                            {...register('oxygen', { required: 'Required', min: 70, max: 100 })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blood Pressure</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Sys"
                                    type="number"
                                    error={errors.systolic?.message}
                                    {...register('systolic', { required: true })}
                                />
                                <span className="text-gray-400 self-center">/</span>
                                <Input
                                    placeholder="Dia"
                                    type="number"
                                    error={errors.diastolic?.message}
                                    {...register('diastolic', { required: true })}
                                />
                            </div>
                        </div>
                        <Input
                            label="Temperature (°F)"
                            type="number"
                            step="0.1"
                            placeholder="98.6"
                            error={errors.temperature?.message}
                            {...register('temperature', { required: 'Required' })}
                        />
                    </div>

                    <Input
                        label="Steps Today"
                        type="number"
                        placeholder="5000"
                        {...register('steps')}
                    />

                    <div className="pt-2 flex gap-3">
                        <Button type="button" variant="outline" className="w-full" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full">
                            Save Data
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HealthInputModal;
