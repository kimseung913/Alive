'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  circular?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-alive text-white 
    hover:bg-alive-dark active:bg-alive-dark
    shadow-[0_4px_12px_rgba(81,207,102,0.3)]
    disabled:bg-surface-secondary disabled:text-subtle disabled:shadow-none
  `,
  secondary: `
    bg-surface text-foreground border border-border
    hover:bg-surface-secondary active:bg-surface-secondary
    disabled:bg-surface-secondary disabled:text-subtle
  `,
  text: `
    bg-transparent text-alive
    hover:bg-alive-light/20 active:bg-alive-light/30
    disabled:text-subtle
  `,
  destructive: `
    bg-error text-white
    hover:bg-red-600 active:bg-red-700
    disabled:bg-surface-secondary disabled:text-subtle
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-lg',
  md: 'h-12 px-6 text-base rounded-xl',
  lg: 'h-14 px-8 text-lg rounded-2xl font-semibold',
  xl: 'h-16 px-10 text-xl rounded-3xl font-bold',
};

const circularSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-16 h-16 text-sm',
  md: 'w-24 h-24 text-base',
  lg: 'w-32 h-32 text-xl font-bold',
  xl: 'w-40 h-40 text-2xl font-bold',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    circular = false,
    className = '',
    disabled,
    children,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium cursor-pointer
          transition-all duration-200 ease-out
          active:scale-[0.98]
          disabled:cursor-not-allowed disabled:active:scale-100
          ${variantStyles[variant]}
          ${circular ? `rounded-full ${circularSizeStyles[size]}` : sizeStyles[size]}
          ${fullWidth && !circular ? 'w-full' : ''}
          ${circular ? 'animate-pulse-alive' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
