import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Language options with flags (Unicode characters used for flags)
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
  ];

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-primary cursor-pointer">
                SmartX
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-neutral hover:text-primary transition duration-200">
              {t('navbar.features')}
            </a>
            <a href="#functions" className="text-neutral hover:text-primary transition duration-200">
              {t('navbar.keyFunctions')}
            </a>
            <a href="#about" className="text-neutral hover:text-primary transition duration-200">
              {t('navbar.about')}
            </a>
            <a href="#faq" className="text-neutral hover:text-primary transition duration-200">
              {t('navbar.faq')}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={i18n.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {({ value }) => {
                    const language = languages.find(lang => lang.code === value);
                    return (
                      <span className="flex items-center gap-2">
                        <span className="text-base">{language?.flag}</span>
                        <span>{language?.name}</span>
                      </span>
                    );
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
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
              href="#features" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navbar.features')}
            </a>
            <a 
              href="#functions" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navbar.keyFunctions')}
            </a>
            <a 
              href="#about" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navbar.about')}
            </a>
            <a 
              href="#faq" 
              className="text-neutral hover:text-primary transition duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('navbar.faq')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;