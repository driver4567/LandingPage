import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, X } from "lucide-react";
import { languages } from "@/i18n/i18n";

// Smooth scroll function 
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const { t, i18n } = useTranslation();
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
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  // Handle link click for smooth scroll
  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
    setIsMobileMenuOpen(false);
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
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#functions" className="text-neutral hover:text-primary transition duration-200" onClick={(e) => handleLinkClick('functions', e)}>
              {t('navbar.keyFunctions')}
            </a>
            <a href="#features" className="text-neutral hover:text-primary transition duration-200" onClick={(e) => handleLinkClick('features', e)}>
              {t('navbar.features')}
            </a>
            <a href="#about" className="text-neutral hover:text-primary transition duration-200" onClick={(e) => handleLinkClick('about', e)}>
              {t('navbar.about')}
            </a>
            <a href="#faq" className="text-neutral hover:text-primary transition duration-200" onClick={(e) => handleLinkClick('faq', e)}>
              {t('navbar.faq')}
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select defaultValue={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[140px] h-9 px-3 text-sm border-gray-300">
                <SelectValue placeholder={t('navbar.language')} />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
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
            <a 
              href="#functions" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={(e) => handleLinkClick('functions', e)}
            >
              {t('navbar.keyFunctions')}
            </a>
            <a 
              href="#features" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={(e) => handleLinkClick('features', e)}
            >
              {t('navbar.features')}
            </a>
            <a 
              href="#about" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={(e) => handleLinkClick('about', e)}
            >
              {t('navbar.about')}
            </a>
            <a 
              href="#faq" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={(e) => handleLinkClick('faq', e)}
            >
              {t('navbar.faq')}
            </a>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <Link href="/privacy-policy">
                <span className="block text-neutral hover:text-primary transition duration-200 py-2 cursor-pointer">
                  {t('footer.legal.privacy')}
                </span>
              </Link>
              <Link href="/terms-of-service">
                <span className="block text-neutral hover:text-primary transition duration-200 py-2 cursor-pointer">
                  {t('footer.legal.terms')}
                </span>
              </Link>
              <Link href="/cookie-policy">
                <span className="block text-neutral hover:text-primary transition duration-200 py-2 cursor-pointer">
                  {t('footer.legal.cookies')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;