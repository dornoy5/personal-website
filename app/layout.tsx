import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://personal-website-ten-ochre-37.vercel.app"),
  title: "Dor Noy | Full Stack Developer + SDR",
  description:
    "Full Stack Developer with a strong background in sales. I build things that work and talk to people that matter.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Python", "SDR", "Dor Noy"],
  openGraph: {
    title: "Dor Noy — Full Stack Developer + SDR",
    description: "I build things that work and talk to people that matter.",
    url: "https://personal-website-ten-ochre-37.vercel.app",
    siteName: "Dor Noy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dor Noy — Full Stack Developer + SDR",
    description: "I build things that work and talk to people that matter.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
