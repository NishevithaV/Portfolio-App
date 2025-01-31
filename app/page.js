import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from './components/Navbar'
import WorkSection from "./components/WorkSection";
import Projects from "./components/Projects";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] pt-[80px] lg:pt-[115px]">
      <Navbar />
      <div className="container mx-auto px-12 py-4">
        <div className="pt-0 md:pt-4 xl:pt-12 xl:pb-6">
          <Hero />
        </div>
        <div className="pt-0 lg:pt-2 xl:pt-4">
          <WorkSection />
        </div>
        <Projects />
        <ContactSection />
      </div>
    </main>
  );
}
