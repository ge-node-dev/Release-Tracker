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
         <Header />
         <main className="mainContainer">{children}</main>
         {authModal}
      </>
   );
}
