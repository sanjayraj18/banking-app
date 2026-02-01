'use client'

import { ReactNode } from "react"

interface ButtonProps{
  children : ReactNode
  onClick : () => void
}

export const Button = ({onClick, children} : ButtonProps) =>{
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus : ring-4 focus :ring-gray-300"
    >
      {children}
    </button>
  );
}