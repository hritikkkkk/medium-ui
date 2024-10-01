import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
  const variantStyles = {
    default: 'bg-slate-800 text-white hover:bg-slate-900',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-slate-900 hover:text-white',
    ghost: 'text-gray-700 hover:bg-gray-100',
  }
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}