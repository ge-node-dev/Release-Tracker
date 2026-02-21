export default function NoHeaderLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return <main className="mainContainer">{children}</main>;
}
