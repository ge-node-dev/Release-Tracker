import { SVGProps } from 'react';

export const EyeOnIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg fill="none" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g strokeWidth="0" id="SVGRepo_bgCarrier" />
      <g strokeLinecap="round" strokeLinejoin="round" id="SVGRepo_tracerCarrier" />
      <g id="SVGRepo_iconCarrier">
         <path
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
         />
         <path
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
         />
         <circle r="3" cx="12" cy="12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
   </svg>
);
