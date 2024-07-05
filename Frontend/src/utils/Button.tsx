import React, { FC, HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({ text, className, ...props }) => {
  return (
    <div
      {...props}
      className={`px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200 ${className}`}
    >
      {text}
    </div>
  );
};

export default Button;
