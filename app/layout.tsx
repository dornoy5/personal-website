import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dor-noy.com"),
  title: "Dor Noy | AI Builder: Web, AI Video, Automations",
  description:
    "I build with AI: live websites, AI video ads and property films, and the multi-agent Claude Code setup that runs my projects.",
  keywords: ["AI Builder", "AI Video", "Claude Code", "AI Agents", "Automation", "Next.js", "React", "TypeScript", "Dor Noy"],
  openGraph: {
    title: "Dor Noy | AI Builder: Web, AI Video, Automations",
    description: "Websites, AI video and automations, built end to end with AI.",
    url: "https://dor-noy.com",
    siteName: "Dor Noy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dor Noy | AI Builder: Web, AI Video, Automations",
    description: "Websites, AI video and automations, built end to end with AI.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
