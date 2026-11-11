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
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;try{d.dataset.intro=sessionStorage.getItem('nv.intro.played')==='1'?'done':'pending'}catch(e){d.dataset.intro='pending'}" +
              // Failsafe: the cover is only lifted when the React intro mounts.
              // If the bundle is slow, errors, or never arrives, the visitor
              // would otherwise be left staring at a blank white screen, so
              // retire it unconditionally after a few seconds.
              "setTimeout(function(){if(d.dataset.intro==='pending'){d.dataset.intro='done'}},5000);})();",
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
