"use client"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TalkCard from "../components/TalkCard";
import { ARTICLES } from "../constants";
import { motion } from "framer-motion";

export default function Articles() {
  return (
    <main className="flex min-h-screen flex-col bg-bg pt-16">
      <Navbar />
      <div className="container mx-auto px-6 sm:px-12 py-16 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 border-b border-ink pb-8"
        >
          <p className="fig-label mb-3">NO. 002 / WRITING</p>
          <h1 className="font-display uppercase text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            Articles
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-xl font-serif">
            Technical deep dives, featured pieces, and things I&apos;m thinking about. Published on Medium and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-full hover:z-10"
            >
              <TalkCard
                title={article.title}
                desc={article.desc}
                img={article.img}
                type={article.type}
                link={article.link}
                imgFit="contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
