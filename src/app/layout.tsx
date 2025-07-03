import Footer from "@/libs/components/common/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-grow mb-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
