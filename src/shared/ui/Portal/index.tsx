'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
   container?: HTMLElement;
   children: React.ReactNode;
};

const Portal = ({ children, container }: PortalProps) => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
   }, []);

   if (!mounted) return null;

   return createPortal(children, container ?? document.body);
};

export default Portal;
