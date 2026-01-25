import React from "react";

interface AppbarProps {
  children?: React.ReactNode;
  className?: string;
}

export const Appbar: React.FC<AppbarProps> = ({ children, className = "" }) => {
  return (
    <nav
      className={`bg-gray-800 text-white p-4 flex items-center justify-between ${className}`}
    >
      {children}
    </nav>
  );
};
