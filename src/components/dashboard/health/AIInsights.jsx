import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const AIInsights = ({ insights }) => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">AI Health Insights</h3>
            </div>

            <div className="space-y-3">
                {insights.map((insight, index) => (
                    <div key={index} className="flex gap-3 items-start bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-100/50 dark:border-blue-900/30">
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {insight}
                        </p>
                    </div>
                ))}
            </div>

            <button className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 transition-colors py-2">
                Generate Detailed Report <ArrowRight size={16} />
            </button>
        </div>
    );
};

export default AIInsights;
