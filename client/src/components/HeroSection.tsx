import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { ChevronRight } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { socialMediaLinks } from "./Footer";

const HeroSection = () => {
  const { t } = useTranslation();
  const [leftContentRef, leftContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [rightContentRef, rightContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };
  
  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <m.div 
            ref={leftContentRef}
            initial="hidden"
            animate={leftContentInView ? "visible" : "hidden"}
            variants={leftVariants}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-neutral mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="inline-flex items-center justify-center gap-2" asChild>
                <a href="#kickstarter">
                  {t('hero.kickstarterButton')}
                  <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
              {/* Learn More button removed as requested */}
            </div>
          </m.div>
          
          <m.div 
            ref={rightContentRef}
            initial="hidden"
            animate={rightContentInView ? "visible" : "hidden"}
            variants={rightVariants}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                <m.img 
                  src="https://images.unsplash.com/photo-1570891836654-d4961a7b6929?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt={t('hero.deviceImageAlt')} 
                  className="w-[280px] h-auto object-cover"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                />
              </div>
            </div>
            <m.div 
              className="absolute -bottom-6 -right-6 p-4 bg-white rounded-xl shadow-lg hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <p className="text-sm font-semibold text-primary">
                {t('hero.discount')}
              </p>
            </m.div>
          </m.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6">
        {socialMediaLinks.map((social, index) => (
          <a 
            key={index}
            href={social.href} 
            aria-label={social.ariaLabel} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-neutral hover:text-primary transition-colors duration-300"
          >
            <social.icon className="h-6 w-6" />
          </a>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;