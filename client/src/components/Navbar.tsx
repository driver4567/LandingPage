import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Close mobile menu if open
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      
      // Scroll to section with smooth behavior
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-primary cursor-pointer">
                PocketCompute
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-8 justify-end">
              <button 
                onClick={() => scrollToSection('functions')} 
                className="text-neutral hover:text-primary transition duration-200"
              >
                {t('navbar.keyFunctions')}
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-neutral hover:text-primary transition duration-200"
              >
                {t('navbar.features')}
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-neutral hover:text-primary transition duration-200"
              >
                {t('navbar.about')}
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-neutral hover:text-primary transition duration-200"
              >
                {t('navbar.faq')}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden ml-4" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-4 py-3 shadow-lg">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('functions')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
            >
              {t('navbar.keyFunctions')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
            >
              {t('navbar.features')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
            >
              {t('navbar.about')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
            >
              {t('navbar.faq')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;