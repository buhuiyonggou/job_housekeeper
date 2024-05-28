import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";
import NavBar from "./NavBar";
import { fonts } from "./fonts";
import { Providers } from "./Providers";
import { ApplicationProvider } from "./ApplicationProvider";
import AuthProvider from "./auth/AuthenProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
        <Providers>
          <QueryClientProvider>
            <AuthProvider>
          <ApplicationProvider>
            <NavBar />
            <main className="p-4">{children}</main>
            </ApplicationProvider>
            </AuthProvider>
          </QueryClientProvider>
        </Providers>
      </body>
    </html>
  );
}
