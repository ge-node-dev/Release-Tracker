import { SVGProps } from 'react';

export const AudioPlayerArrow = (props: SVGProps<SVGSVGElement>) => (
   <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" {...props}>
      <rect x="0" y="0" rx="1" width="2" height="16" />
      <path d="M14 1L4 8L14 15Z" />
   </svg>
);
