import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nishevitha Venkatesh",
  description: "A computer science student passionate about cloud computing, web development, and driving innovation in the tech community. This summer, I'll be interning as a Technology Analyst at Morgan Stanley. Explore my work, projects, and let's connect!",
  keywords: [
    "Nishevitha Venkatesh", 
    "Fintech",
    "Cloud Computing",
    "Web Development",
    "Full-Stack Development",
    "Portfolio",
  ],
  openGraph : {
    title: "Nishevitha Venkatesh",
    description : 
      "Passionate about cloud computing, web development, and fintech. This summer, I'll be interning as a Technology Analyst at Morgan Stanley. Check out my projects and let's connect!",
    url: "https://nishevithavenkatesh.com",
    siteName: "Nishevitha Venkatesh",
    images: [
      {
        url: "https://nishevithavenkatesh.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nishevitha Venkatesh Portfolio"
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
