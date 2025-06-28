import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
