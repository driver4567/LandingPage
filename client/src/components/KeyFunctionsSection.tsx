import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

interface FunctionCardProps {
  image: string;
  title: string;
  description: string;
  features: string[];
  index: number;
}

const FunctionCard = ({ image, title, description, features, index }: FunctionCardProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut" 
      }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-neutral mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const KeyFunctionsSection = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [buttonRef, buttonInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const functions = [
    {
      image: "https://images.unsplash.com/photo-1544866092-1677b4f83307?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      titleKey: 'functions.general.title',
      descriptionKey: 'functions.general.description',
      featuresKeys: [
        'functions.general.features.usb',
        'functions.general.features.hdmi',
        'functions.general.features.audio'
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      titleKey: 'functions.payment.title',
      descriptionKey: 'functions.payment.description',
      featuresKeys: [
        'functions.payment.features.nfc',
        'functions.payment.features.secure',
        'functions.payment.features.pos'
      ]
    },
    {
      image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      titleKey: 'functions.expansion.title',
      descriptionKey: 'functions.expansion.description',
      featuresKeys: [
        'functions.expansion.features.usb',
        'functions.expansion.features.modules',
        'functions.expansion.features.sdk'
      ]
    }
  ];

  return (
    <section id="functions" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('functions.title')}</h2>
          <p className="text-lg text-neutral">{t('functions.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {functions.map((func, index) => (
            <FunctionCard
              key={index}
              image={func.image}
              title={t(func.titleKey)}
              description={t(func.descriptionKey)}
              features={func.featuresKeys.map(key => t(key))}
              index={index}
            />
          ))}
        </div>

        <motion.div 
          ref={buttonRef}
          initial={{ opacity: 0, y: 20 }}
          animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.4,
            ease: "easeOut" 
          }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="inline-flex items-center gap-2" asChild>
            <a href="#kickstarter">
              {t('functions.preorderButton')}
              <ChevronRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFunctionsSection;
