import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RParallaxProvider from "@/providers/RParallaxProvider";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/providers/StoreProvider";
import SignInAlertModal from "@/components/modals/SignInAlertModal";

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
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
    <ClerkProvider appearance={{ variables: { colorPrimary: "#f97316" } }}>
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
          <StoreProvider>
            <RParallaxProvider>
              <SignInAlertModal />
              <Header />
              {children}
              <Footer />
              <Toaster />
            </RParallaxProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
