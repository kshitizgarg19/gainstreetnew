import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              About <span className="text-secondary">Gain Street Capital</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded with a vision to revolutionize options trading in the Indian markets, Gain Street Capital combines sophisticated quantitative analysis with deep market expertise.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our proprietary trading strategies are designed to capitalize on market inefficiencies while maintaining strict risk management protocols.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Meet Our Leader</h3>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150" 
                  alt="Kshitiz Garg" 
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-lg">Kshitiz Garg</h4>
                  <p className="text-secondary">Founder & Chief Strategist</p>
                  <div className="flex mt-2 space-x-3">
                    <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">
                      <i className="fab fa-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h4 className="text-2xl font-bold text-secondary mb-1">5+ Years</h4>
                <p className="text-gray-600">Market Experience</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <h4 className="text-2xl font-bold text-secondary mb-1">₹100Cr+</h4>
                <p className="text-gray-600">Assets Under Management</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div className="relative" variants={itemVariants}>
            <div className="bg-primary absolute top-10 -left-10 w-48 h-48 rounded-md z-0"></div>
            <div className="bg-secondary absolute bottom-10 -right-10 w-48 h-48 rounded-md z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&h=800" 
              alt="Trading Office" 
              className="w-full h-auto rounded-md shadow-lg relative z-10"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
