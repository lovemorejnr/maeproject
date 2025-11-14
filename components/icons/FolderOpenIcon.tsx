import React from 'react';

export const FolderOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-1.996 9.164a1 1 0 0 1 -.986 .836h-14.002a1 1 0 0 1 -.936 -1.351z" />
    <path d="M19 19v-11a2 2 0 0 0 -2 -2h-8.5a2 2 0 0 0 -1.683 .928l-2.317 3.972" />
  </svg>
);
