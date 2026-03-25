import React from 'react';

export const Alert = ({ type = 'info', message, onClose = null, className = '' }) => {
  const baseClasses = 'p-4 rounded-lg flex items-start justify-between gap-4';
  
  const typeClasses = {
    success: 'bg-green-50 border border-green-200 text-green-900',
    error: 'bg-red-50 border border-red-200 text-red-900',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border border-blue-200 text-blue-900',
  };

  const iconMap = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info} ${className}`}>
      <div className="flex items-start gap-3 flex-1">
        <span className="text-lg font-bold">{iconMap[type]}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl font-bold hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};
