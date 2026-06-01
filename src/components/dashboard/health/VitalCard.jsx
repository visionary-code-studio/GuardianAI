import React from 'react';
import { cn } from '../../../lib/utils';

const VitalCard = ({ title, value, unit, status, icon: Icon, trend }) => {
    const statusColors = {
        normal: 'bg-green-50 border-green-200 text-green-700',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
        critical: 'bg-red-50 border-red-200 text-red-700',
    };

    const iconColors = {
        normal: 'text-green-600',
        warning: 'text-yellow-600',
        critical: 'text-red-600',
    };

    return (
        <div className={cn(
            "p-5 rounded-xl border transition-all duration-200 hover:shadow-md bg-white dark:bg-gray-800 dark:border-gray-700",
            statusColors[status] || 'border-gray-100 dark:border-gray-700'
        )}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className={cn("p-2 rounded-full bg-white/50 dark:bg-gray-700/50", iconColors[status])}>
                        <Icon size={20} />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</span>
                </div>
                {status && (
                    <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium uppercase tracking-wide",
                        status === 'normal' ? 'bg-green-100 text-green-800' :
                            status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                    )}>
                        {status}
                    </span>
                )}
            </div>

            <div className="mt-2 text-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{unit}</span>
            </div>

            {trend && (
                <div className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                    {trend}
                </div>
            )}
        </div>
    );
};

export default VitalCard;
