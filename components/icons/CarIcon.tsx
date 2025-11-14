
import React from 'react';

export const CarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M14 16.5V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1.5" />
    <path d="M20 10h-5.3" />
    <path d="M4 10h5.3" />
    <path d="M19 17h-14" />
    <path d="M14 5.5a3.5 3.5 0 0 0-7 0" />
    <path d="M18.8 10H5.2C4.1 10 3 11.1 3 12.5v0c0 1.2 1.1 2.5 2.2 2.5h13.6c1.1 0 2.2-1.3 2.2-2.5v0c0-1.4-1.1-2.5-2.2-2.5Z" />
  </svg>
);
