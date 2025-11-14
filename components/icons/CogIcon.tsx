import React from 'react';

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
    <path d="M12 4V2"></path>
    <path d="M12 22v-2"></path>
    <path d="m17 7 1.4-1.4"></path>
    <path d="m6.4 18.6 1.4-1.4"></path>
    <path d="M20 12h2"></path>
    <path d="M2 12h2"></path>
    <path d="m17 17-1.4 1.4"></path>
    <path d="m6.4 6.4-1.4 1.4"></path>
  </svg>
);
