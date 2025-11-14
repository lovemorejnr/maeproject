import React from 'react';

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
    <path d="M12 2a7 7 0 0 0-4.95 11.95A3.5 3.5 0 0 1 9 18"></path>
    <path d="M12 2a7 7 0 0 1 4.95 11.95A3.5 3.5 0 0 0 15 18"></path>
  </svg>
);
