import React from 'react';

export const ScaleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 6h18"></path>
    <path d="M3 12h18"></path>
    <path d="M3 18h18"></path>
    <path d="M7 3v18"></path>
    <path d="M17 3v18"></path>
  </svg>
);
