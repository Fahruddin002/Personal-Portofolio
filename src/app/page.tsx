import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

// Section di bawah fold dimuat lazy (chunk terpisah) — hero tetap eager buat LCP
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const ContactForm = dynamic(() => import("@/components/sections/ContactForm"));
const Footer = dynamic(() => import("@/components/Layout/Footer"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <TechStack />
      <ContactForm />
      <Footer />
    </>
  );
}
