import React, { HTMLAttributes } from 'react'

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-4 py-5 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-lg font-medium leading-6 text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-4 py-5 ${className}`} {...props}>
      {children}
    </div>
  )
}