import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Globe,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "./Footer";

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
  
  // Handle language change
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', value);
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
                aria-label={t('navbar.keyFunctions')}
              >
                {t('navbar.keyFunctions')}
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-neutral hover:text-primary transition duration-200"
                aria-label={t('navbar.features')}
              >
                {t('navbar.features')}
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-neutral hover:text-primary transition duration-200"
                aria-label={t('navbar.about')}
              >
                {t('navbar.about')}
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-neutral hover:text-primary transition duration-200"
                aria-label={t('navbar.faq')}
              >
                {t('navbar.faq')}
              </button>
              
              {/* Language Selector Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center space-x-1 text-neutral hover:text-primary transition duration-200"
                    aria-label={t('navbar.languageSelector')}
                  >
                    <Globe className="h-4 w-4" />
                    <span className="text-base mr-1">
                      {languages.find(lang => lang.code === i18n.language)?.flag}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center gap-2 cursor-pointer ${i18n.language === lang.code ? 'bg-primary/10 font-medium' : ''}`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden ml-4" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
              aria-expanded={isMobileMenuOpen}
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
              aria-label={t('navbar.keyFunctions')}
            >
              {t('navbar.keyFunctions')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
              aria-label={t('navbar.features')}
            >
              {t('navbar.features')}
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
              aria-label={t('navbar.about')}
            >
              {t('navbar.about')}
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-neutral hover:text-primary transition duration-200 py-2 text-left"
              aria-label={t('navbar.faq')}
            >
              {t('navbar.faq')}
            </button>
            
            {/* Language selector for mobile */}
            <div className="border-t border-gray-100 pt-3 mt-1">
              <p className="text-sm text-neutral mb-2">{t('navbar.selectLanguage')}</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center gap-2 py-2 px-3 rounded text-sm ${
                      i18n.language === lang.code 
                        ? 'bg-primary/10 font-medium border-primary border' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                    aria-label={`${t('navbar.switchTo')} ${lang.name}`}
                    aria-current={i18n.language === lang.code ? 'true' : 'false'}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;