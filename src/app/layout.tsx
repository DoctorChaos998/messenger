import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import StoreProvider from "@/app/StoreProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import MainLayout from "@/components/MainLayout/MainLayout";
import AuthLoader from "@/components/AuthLoader/AuthLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat messenger",
  description: "Powered by doctor, a1exx, mcZeta, shiroNed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <StoreProvider>
            <html lang="en">
                  <body className={inter.className}>
                      <Header/>
                      <MainLayout>
                          <AuthLoader>
                              {children}
                          </AuthLoader>
                      </MainLayout>
                      <Footer/>
                  </body>
            </html>
      </StoreProvider>
  );
}
