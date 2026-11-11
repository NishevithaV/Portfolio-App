import { Big_Shoulders_Display, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

const bigShoulders = Big_Shoulders_Display({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nishevitha Venkatesh",
  description:
    "Product Engineer at SnapTrade (YC W22), previously Morgan Stanley. I build software across AI, fintech and full-stack systems. Explore my work, projects, talks and writing.",
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
    description:
      "Product Engineer at SnapTrade (YC W22), previously Morgan Stanley. I build software across AI, fintech and full-stack systems.",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bigShoulders.variable} ${newsreader.variable} ${jetbrainsMono.variable} antialiased bg-bg text-ink font-serif`}
      >
        {/*
          Decide before first paint whether the intro still has to play, so the
          CSS cover in globals.css can hold the screen until the React overlay
          mounts. Without this the inverted hero flashes on every load.
        */}
        {/*
          The hero's 3D wordmark fetches this typeface as soon as it mounts.
          Preloading it here means the geometry is ready the moment the intro
          clears, instead of the hero briefly rendering empty.
        */}
        <link
          rel="preload"
          as="fetch"
          href="/fonts/big-shoulders-800.typeface.json"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{document.documentElement.dataset.intro=sessionStorage.getItem('nv.intro.played')==='1'?'done':'pending'}catch(e){document.documentElement.dataset.intro='pending'}})();",
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
