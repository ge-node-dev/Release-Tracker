import { ViewTransition } from 'react';

import Header from '@/modules/layout/components/Header';

export default function MainLayout({
   children,
   authModal,
}: Readonly<{
   children: React.ReactNode;
   authModal: React.ReactNode;
}>) {
   return (
      <>
         <ViewTransition>
            <Header />
            {children}
         </ViewTransition>
         {authModal}
      </>
   );
}
