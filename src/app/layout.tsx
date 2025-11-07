import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HydrationSanitizer } from "@/components/hydration-sanitizer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthSessionProvider } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clevio",
  description: "Empowering People to Innovate",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: ["Clev.io", "Clevio Coder Camp", "Clevio Innovator", "Clevio Innovaotor Camp", "Kursus Coding", "Clevio Innovator Pro", "Clevio AI Employees"],
  authors: [{ name: "Z.ai Team" }],
  openGraph: {
    title: "Clevio",
    description: "Empowering People to Innovate",
    url: "https://clev.io",
    siteName: "clev.io",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Z.ai Code Scaffold",
  //   description: "AI-powered development with modern React stack",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <AuthSessionProvider>
            <HydrationSanitizer />
            {children}
            <Toaster />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
