'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

type FlashToasterClientProps = {
   flash: string | undefined;
   flashtrig: string | undefined;
};

const FlashToasterClient = ({ flash, flashtrig }: FlashToasterClientProps) => {
   useEffect(() => {
      if (!flash) return;
      try {
         const { type, message } = JSON.parse(flash) as { message: string; type: 'error' | 'success' };
         if (type === 'success') {
            toast.success(message);
         } else if (type === 'error') {
            toast.error(message);
         }
      } catch (error) {
         console.error(error);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [flashtrig]);

   return null;
};

export default FlashToasterClient;
