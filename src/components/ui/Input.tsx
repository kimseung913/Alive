'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    hint?: string;
    error?: string;
    showCount?: boolean;
    maxLength?: number;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({
        label,
        hint,
        error,
        showCount = false,
        maxLength,
        className = '',
        value,
        onChange,
        ...props
    }, ref) => {
        const [internalValue, setInternalValue] = useState('');
        const currentValue = value !== undefined ? String(value) : internalValue;
        const charCount = currentValue.length;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setInternalValue(e.target.value);
            }
            onChange?.(e);
        };

        return (
            <div className="flex flex-col gap-2">
                {/* Label */}
                {label && (
                    <label className="text-sm font-medium text-muted">
                        {label}
                    </label>
                )}

                {/* Input */}
                <div className="relative">
                    <input
                        ref={ref}
                        value={currentValue}
                        onChange={handleChange}
                        maxLength={maxLength}
                        className={`
              w-full h-12 px-4
              bg-surface text-foreground
              border rounded-xl
              text-base
              placeholder:text-subtle
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-alive/30 focus:border-alive
              disabled:bg-surface-secondary disabled:text-subtle disabled:cursor-not-allowed
              ${error ? 'border-error focus:ring-error/30 focus:border-error' : 'border-border'}
              ${className}
            `.trim().replace(/\s+/g, ' ')}
                        {...props}
                    />

                    {/* Character Count */}
                    {showCount && maxLength && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-subtle">
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>

                {/* Hint or Error */}
                {(hint || error) && (
                    <p className={`text-sm ${error ? 'text-error' : 'text-muted'}`}>
                        {error || hint}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
