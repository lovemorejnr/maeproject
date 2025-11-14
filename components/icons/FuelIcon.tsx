import React from 'react';

export const FuelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="14" y1="12" x2="14" y2="18"></line>
    <line x1="10" y1="12" x2="10" y2="18"></line>
    <path d="M8 12h8"></path>
    <path d="M15 5H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"></path>
    <path d="M18 9h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1"></path>
    <path d="M6 9H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1"></path>
  </svg>
);
