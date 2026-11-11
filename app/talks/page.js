"use client"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TalkCard from "../components/TalkCard";
import { TALKS } from "../constants";
import { motion } from "framer-motion";

export default function Talks() {
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
          <p className="fig-label mb-3">NO. 003 &mdash; SPEAKING</p>
          <h1 className="font-display uppercase text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight mb-4">
            Talks
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-xl font-serif">
            I speak at conferences, universities and community events, sharing what I learn as I build.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TALKS.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative h-full hover:z-10"
            >
              <TalkCard
                title={talk.title}
                desc={talk.desc}
                img={talk.img}
                type={talk.type}
                link={talk.link}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
