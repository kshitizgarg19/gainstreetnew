import { motion } from "framer-motion";

const features = [
  {
    icon: "fa-chart-line",
    title: "Proprietary Trading Expertise",
    description: "Our seasoned traders leverage sophisticated options strategies to capitalize on market inefficiencies across Indian markets."
  },
  {
    icon: "fa-robot",
    title: "Algorithmic Trading",
    description: "High-frequency algorithm trading systems for both equity and commodity markets with exceptional execution speed and precision."
  },
  {
    icon: "fa-shield-alt",
    title: "Risk Management",
    description: "Sophisticated risk protocols to preserve capital and maximize returns in volatile markets with real-time portfolio monitoring."
  },
  {
    icon: "fa-brain",
    title: "Quantitative Analysis",
    description: "Advanced mathematical models and statistical methods to identify profitable trading opportunities in both equity and commodity markets."
  },
  {
    icon: "fa-bolt",
    title: "Low-Latency Infrastructure",
    description: "State-of-the-art technology stack ensuring microsecond execution times for our algorithmic trading strategies."
  },
  {
    icon: "fa-graduation-cap",
    title: "Research & Education",
    description: "Continuous research into new trading methodologies and educational resources for aspiring traders."
  }
];

export default function Features() {
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-playfair font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Why Choose <span className="text-secondary">Gain Street Capital</span>
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="premium-card bg-card text-card-foreground p-8 rounded-md shadow-lg hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className={`fas ${feature.icon} text-secondary text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">{feature.title}</h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
