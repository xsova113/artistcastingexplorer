import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RParallaxProvider from "@/components/providers/RParallaxProvider";
import { Toaster as ShadcnToaster } from "@/components/ui/toaster";
import SignInAlertModal from "@/components/modals/SignInAlertModal";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import ReviewModal from "@/components/modals/ReviewModal";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../app/api/uploadthing/core";
import { Toaster } from "sonner";
import ContactModalProvider from "@/components/providers/ContactModalProvider";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Artist Casting Explorer",
  description:
    "Database of Japanese and Nikkei actors/performer/artists/creators in Canada. Free access to artists' profiles, images and video.",
  icons: {
    icon: [
      {
        url: "/ace.png",
        href: "/ace.png",
      },
    ],
  },
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

        <Script
          id=""
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />

        <Script id="" strategy="lazyOnload">
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>

        <body className={font.className}>
          <ReactQueryProvider>
            <RParallaxProvider>
              <SignInAlertModal />
              <ReviewModal />
              <Header />
              <div className="mb-[89px]" />
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <Toaster richColors />
              <ContactModalProvider />
              {children}
              <SpeedInsights />
              <Footer />
              <ShadcnToaster />
            </RParallaxProvider>
          </ReactQueryProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
