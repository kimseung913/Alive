'use client';

import { useEffect, useState, useRef } from 'react';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose?: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const onCloseRef = useRef(onClose);

    // Keep the ref updated with the latest onClose callback
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onCloseRef.current?.(), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const typeStyles = {
        success: 'bg-alive text-white',
        error: 'bg-error text-white',
        info: 'bg-surface text-foreground border border-border',
    };

    const icons = {
        success: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    return (
        <div
            className={`
        fixed bottom-20 left-1/2 -translate-x-1/2
        flex items-center gap-2 px-4 py-3
        rounded-xl shadow-lg
        transition-all duration-300
        ${typeStyles[type]}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        safe-area-bottom
      `}
        >
            {icons[type]}
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}

// Toast Container for managing multiple toasts
interface ToastItem {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export function ToastContainer({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: string) => void }) {
    return (
        <div className="fixed bottom-20 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none z-50">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => onRemove(toast.id)}
                    />
                </div>
            ))}
        </div>
    );
}
