import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from './components/Navbar'
import WorkSection from "./components/WorkSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] pt-[80px] lg:pt-[115px]">
      <Navbar />
      <div className="container mx-auto px-12 py-4">
        <Hero />
        <WorkSection />
      </div>
    </main>
  );
}
