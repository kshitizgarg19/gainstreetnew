import { Link } from "wouter";
import Logo from "./Logo";

export default function Footer() {
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

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-gray-400 mb-6">
              Proprietary trading firm specializing in options strategies for the Indian markets.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-secondary transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-secondary transition-colors">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-secondary transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://wa.me/918307378790" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-secondary transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("markets")}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Markets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("options")}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Options Chain
                </button>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Trading Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">Options Basics</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">Strategy Guides</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">Market Research</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">Risk Management</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-secondary transition-colors">Technical Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for latest market insights.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-sm w-full focus:outline-none text-primary"
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="bg-secondary hover:bg-secondary/80 text-primary px-4 py-2 rounded-r-sm transition-colors"
                  aria-label="Subscribe"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Gain Street Capital. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-secondary text-sm transition-colors">Privacy Policy</Link>
              <Link href="/" className="text-gray-500 hover:text-secondary text-sm transition-colors">Terms of Service</Link>
              <Link href="/" className="text-gray-500 hover:text-secondary text-sm transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
