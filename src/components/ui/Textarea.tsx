import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`w-full border-none resize-none placeholder:text-gray-400 focus:ring-0 focus:outline-none ${className}`}
      {...props}
    />
  )
}