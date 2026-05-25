import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppStateProvider } from "@/contexts/AppStateContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { StickyCTA } from "@/components/StickyCTA";
import { ChatBot } from "@/components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JumpToTech DevOps School — Become a DevOps Engineer in 7 Months",
  description:
    "Hands-on DevOps bootcamp in Chicago. Batch 4 starts June 1, 2026. $700/month payment plan. Linux, Docker, Kubernetes, AWS, Terraform and more.",
  keywords: [
    "DevOps bootcamp",
    "DevOps school",
    "Kubernetes",
    "Docker",
    "Terraform",
    "AWS",
    "CI/CD",
    "Linux",
    "Chicago",
    "online bootcamp",
  ],
  openGraph: {
    title: "JumpToTech DevOps School — Become a DevOps Engineer in 7 Months",
    description:
      "Hands-on DevOps bootcamp. Batch 4 starts June 1, 2026. $700/month payment plan. Linux, Docker, Kubernetes, AWS, Terraform and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen pb-16`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <AppStateProvider>
              <AnnouncementBanner />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <StickyCTA />
              <ChatBot />
            </AppStateProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
