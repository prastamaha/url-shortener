import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "A simple URL shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
          <div className="min-h-screen bg-background text-foreground">
            <header className="container mx-auto py-4 px-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold">URL Shortener</h1>
            </header>
            <main className="container mx-auto py-8 px-4">
              {children}
            </main>
          </div>
      </body>
    </html>
  );
}
