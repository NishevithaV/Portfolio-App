"use client"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Articles() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] pt-16">
      <Navbar />
      <div className="container mx-auto px-6 sm:px-12 py-4 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center flex-1 text-center py-20 sm:py-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-teal-400 to-fuchsia-400 p-[2px]">
              <div className="flex items-center justify-center w-full h-full rounded-full bg-[#181818]">
                <PencilSquareIcon className="w-9 h-9 sm:w-11 sm:h-11 text-teal-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Articles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="text-lg sm:text-xl text-neutral-400 max-w-xl mb-6"
          >
            Technical deep dives, featured pieces, and things I&apos;m thinking about. Published on Medium and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-700 bg-[#181818]"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-neutral-400 text-sm sm:text-base">Coming soon, check back later</span>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
