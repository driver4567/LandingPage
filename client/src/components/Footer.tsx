import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  FaInstagram, 
  FaFacebook, 
  FaYoutube 
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";

// Creating a shared social media links configuration
export const socialMediaLinks = [
  { icon: SiX, href: "https://x.com/PocketComputeOfficial", ariaLabel: "X.com" },
  { icon: FaInstagram, href: "https://instagram.com/PocketComputeOfficial", ariaLabel: "Instagram" },
  { icon: FaFacebook, href: "https://facebook.com/PocketComputeOfficial", ariaLabel: "Facebook" },
  { icon: FaYoutube, href: "https://youtube.com/PocketComputeOfficial", ariaLabel: "YouTube" }
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">PocketCompute</h3>
            <p className="text-gray-400 mb-6">{t('footer.tagline')}</p>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  aria-label={social.ariaLabel} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#functions" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.quickLinks.functions')}
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.quickLinks.features')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.quickLinks.about')}
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.quickLinks.faq')}
                </a>
              </li>
              <li>
                <a href="#kickstarter" className="text-gray-400 hover:text-white transition-colors duration-300">
                  {t('footer.quickLinks.kickstarter')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">contact@pocketcompute.tech</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Innovation Drive, Tech City, CA 94043</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-400 mb-4">{t('footer.newsletter.subtitle')}</p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder={t('footer.newsletter.placeholder')} 
                className="rounded-r-none bg-gray-800 border-gray-700 text-white focus:ring-primary"
              />
              <Button type="submit" className="rounded-l-none px-4">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">{t('footer.copyright')}</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
              {t('footer.legal.privacy')}
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
              {t('footer.legal.terms')}
            </Link>
            <Link href="/cookie-policy" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
              {t('footer.legal.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;