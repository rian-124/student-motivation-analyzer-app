import Header from "@/components/layout/Header";


export default function MainLayout({ children } : Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="xl:px-32 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}