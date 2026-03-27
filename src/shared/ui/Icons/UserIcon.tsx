import { SVGProps } from 'react';

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg
      fill="none"
      width="64px"
      height="64px"
      viewBox="0 0 16 16"
      stroke="currentColor"
      strokeWidth="0.00016"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
   >
      <g strokeWidth="0" id="SVGRepo_bgCarrier" />
      <g strokeLinecap="round" strokeLinejoin="round" id="SVGRepo_tracerCarrier" />
      <g id="SVGRepo_iconCarrier">
         <path
            fill="currentColor"
            d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
         />
         <path fill="currentColor" d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" />
      </g>
   </svg>
);
