import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RParallaxProvider from "@/lib/providers/RParallaxProvider";
import { Toaster } from "@/components/ui/toaster";

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Casting Japanese",
  description: "Find Actors, Models, Entertainers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </head>
        <body className={font.className}>
          <RParallaxProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </RParallaxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
