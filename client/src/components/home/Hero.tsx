import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="home" className="pt-24 md:pt-28 bg-primary text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="order-2 md:order-1" variants={itemVariants}>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-secondary">Elite</span> Options Trading<br />
              <span className="text-secondary">Exceptional</span> Returns
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Gain Street Capital is a premier proprietary trading firm specializing in advanced options strategies and algorithm trading for both equity and commodity markets in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection("contact")}
                className="bg-secondary hover:bg-secondary/80 text-primary font-bold py-3 px-8 rounded-sm transition duration-300 text-center"
              >
                Connect With Us
              </button>
              <button 
                onClick={() => scrollToSection("markets")}
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-primary font-bold py-3 px-8 rounded-sm transition duration-300 text-center"
              >
                View Live Markets
              </button>
            </div>
          </motion.div>
          <motion.div className="order-1 md:order-2 relative" variants={itemVariants}>
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-secondary/30 to-transparent opacity-80"></div>
            <img 
              src="https://images.unsplash.com/photo-1620266757065-5814239881fd?auto=format&fit=crop&w=800&h=600" 
              alt="Algorithm Trading" 
              className="w-full h-auto rounded-md shadow-lg"
            />
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-sm text-sm backdrop-blur-sm">
              <span className="text-secondary font-bold">High-Frequency</span> Algorithmic Trading
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="h-16 bg-primary relative">
          <div className="absolute -bottom-8 left-0 right-0 h-16 bg-background" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 100%, 0% 100%)' }}></div>
        </div>
      </div>
    </section>
  );
}
