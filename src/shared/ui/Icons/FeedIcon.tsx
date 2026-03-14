import { SVGProps } from 'react';

export const FeedIcon = (props: SVGProps<SVGSVGElement>) => {
   return (
      <svg
         role="img"
         fill="none"
         width="64px"
         height="64px"
         strokeWidth="1"
         viewBox="0 0 24 24"
         color="currentColor"
         stroke="currentColor"
         strokeLinecap="square"
         strokeLinejoin="miter"
         aria-labelledby="feedIconTitle"
         xmlns="http://www.w3.org/2000/svg"
         {...props}
      >
         <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
         <g strokeLinecap="round" strokeLinejoin="round" id="SVGRepo_tracerCarrier"></g>
         <g id="SVGRepo_iconCarrier">
            <title id="feedIconTitle">Feed</title> <circle r="2.5" cx="7.5" cy="7.5"></circle>
            <path d="M22 13H2"></path> <path d="M18 6h-5m5 3h-5"></path>
            <path d="M5 2h14a3 3 0 0 1 3 3v17H2V5a3 3 0 0 1 3-3z"></path>
         </g>
      </svg>
   );
};

export default FeedIcon;
