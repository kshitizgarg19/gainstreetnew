import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import LiveMarkets from "@/components/home/LiveMarkets";
import OptionsChain from "@/components/home/OptionsChain";
import BlogSection from "@/components/home/BlogSection";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <Features />
      <LiveMarkets />
      <OptionsChain />
      <BlogSection />
      <About />
      <Contact />
    </div>
  );
}
