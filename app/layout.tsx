import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://dor-noy.com"),
  title: "Dor Noy | Full Stack Developer",
  description:
    "Full Stack Developer who understands users. I build things that work and talk to people that matter.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Python", "Dor Noy"],
  openGraph: {
    title: "Dor Noy — Full Stack Developer",
    description: "I build things that work and talk to people that matter.",
    url: "https://dor-noy.com",
    siteName: "Dor Noy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dor Noy — Full Stack Developer",
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
