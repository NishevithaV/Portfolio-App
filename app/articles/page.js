"use client"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TalkCard from "../components/TalkCard";
import { ARTICLES } from "../constants";
import { motion } from "framer-motion";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Articles() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] pt-16">
      <Navbar />
      <div className="container mx-auto px-6 sm:px-12 py-12 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-400 to-fuchsia-400 p-[2px] mb-6">
            <div className="flex items-center justify-center w-full h-full rounded-full bg-[#181818]">
              <PencilSquareIcon className="w-8 h-8 sm:w-10 sm:h-10 text-teal-400" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Articles
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-xl">
            Technical deep dives, featured pieces, and things I&apos;m thinking about. Published on Medium and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
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
