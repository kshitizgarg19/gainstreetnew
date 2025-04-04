import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./Logo";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const scrollToSection = (id: string) => {
    closeMobileMenu();
    
    // If we're not on the home page, navigate to home first
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    
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
    <header className={`bg-primary text-white fixed w-full z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-secondary text-2xl`}></i>
        </button>

        {/* Navigation links - desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection("home")} 
            className={`nav-link text-white hover:text-secondary transition ${isActive("/") && location === "/" ? "text-secondary" : ""}`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("markets")} 
            className="nav-link text-white hover:text-secondary transition"
          >
            Markets
          </button>
          <button 
            onClick={() => scrollToSection("options")} 
            className="nav-link text-white hover:text-secondary transition"
          >
            Options Chain
          </button>
          <Link 
            href="/blog" 
            className={`nav-link text-white hover:text-secondary transition ${isActive("/blog") ? "text-secondary" : ""}`}
          >
            Blog
          </Link>
          <button 
            onClick={() => scrollToSection("about")} 
            className="nav-link text-white hover:text-secondary transition"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("contact")} 
            className="nav-link text-white hover:text-secondary transition"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'} bg-primary-foreground/10`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <button 
            onClick={() => scrollToSection("home")} 
            className="text-white hover:text-secondary py-2 transition"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection("markets")} 
            className="text-white hover:text-secondary py-2 transition"
          >
            Markets
          </button>
          <button 
            onClick={() => scrollToSection("options")} 
            className="text-white hover:text-secondary py-2 transition"
          >
            Options Chain
          </button>
          <Link 
            href="/blog" 
            onClick={closeMobileMenu}
            className="text-white hover:text-secondary py-2 transition"
          >
            Blog
          </Link>
          <button 
            onClick={() => scrollToSection("about")} 
            className="text-white hover:text-secondary py-2 transition"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection("contact")} 
            className="text-white hover:text-secondary py-2 transition"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
