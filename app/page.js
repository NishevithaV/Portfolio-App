import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WorkSection from "./components/WorkSection";
import Projects from "./components/Projects";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <Navbar />

      {/* Full-bleed, inverted, and its own scroll-linked 3D scene. */}
      <Hero />

      <div className="container mx-auto px-6 sm:px-12">
        <WorkSection />
        <Projects />
      </div>

      <ContactSection />
      <Footer />
    </main>
  );
}
