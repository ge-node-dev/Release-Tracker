import Header from '@/modules/layout/components/Header';

export default function MainLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <Header />
         <main className="mainContainer">{children}</main>
      </>
   );
}
