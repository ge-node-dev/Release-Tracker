import { cookies } from 'next/headers';
import { Toaster } from 'sonner';

import FlashToasterClient from './FlashToasterClient';
import { ErrorIcon, SuccessIcon } from './ToastIcons';

import styles from './FlashToaster.module.scss';

export type FlashType = 'error' | 'success';

export const setFlash = async (flash: { type: FlashType; message: string }) => {
   const cookieStore = await cookies();
   const flashtrig = cookieStore.get('flashtrig')?.value;
   const nextTrig = flashtrig?.startsWith('1') ? '2' : '1';

   cookieStore.set('flashtrig', nextTrig, {
      path: '/',
      expires: new Date(Date.now() + 100_000),
   });
   cookieStore.set('flash', JSON.stringify(flash), {
      path: '/',
      expires: new Date(Date.now() + 1000),
   });
};

export const FlashToasterProvider = async () => {
   const cookieStore = await cookies();
   const flash = cookieStore.get('flash')?.value;
   const flashtrig = cookieStore.get('flashtrig')?.value;

   return (
      <>
         <Toaster
            theme="system"
            closeButton={true}
            position="top-center"
            icons={{ error: <ErrorIcon />, success: <SuccessIcon /> }}
            toastOptions={{
               classNames: {
                  error: styles.error,
                  toast: styles.toast,
                  success: styles.success,
               },
            }}
         />
         <FlashToasterClient flash={flash} flashtrig={flashtrig} />
      </>
   );
};
