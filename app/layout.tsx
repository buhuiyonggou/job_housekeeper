// RootLayout.tsx
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
  title: "Job Housekeeper",
  description: "You job application manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Providers>
              <ApplicationProvider>
                <NavBar />
                <div className="content-container">
                  <main className="main-content">{children}</main>
                </div>
              </ApplicationProvider>
            </Providers>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
