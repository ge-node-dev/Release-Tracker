import { SVGProps } from 'react';

const SUCCESS_GREEN = '#45b970';
const ERROR_RED = '#c00';

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg width="20" fill="none" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle r="8" cx="10" cy="10" fill={SUCCESS_GREEN} />
      <path
         fill="black"
         clipRule="evenodd"
         fillRule="evenodd"
         d="M13.857 8.191a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      />
   </svg>
);

export const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
   <svg width="20" fill="none" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle r="8" cx="10" cy="10" fill={ERROR_RED} />
      <path
         fill="#fff"
         clipRule="evenodd"
         fillRule="evenodd"
         d="M10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
      />
   </svg>
);
