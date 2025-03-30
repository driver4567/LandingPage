import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
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

  const isEven = index % 2 === 0;
  
  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut" 
      }}
      className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="md:w-2/3 h-64 md:h-auto overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        <div className="absolute inset-0 bg-primary/10"></div>
      </div>
      <div className="md:w-1/3 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-neutral mb-6 text-lg">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-lg">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
};

const KeyFunctionsSection = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
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
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('functions.title')}</h2>
          <p className="text-xl text-neutral">{t('functions.subtitle')}</p>
        </m.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16 space-y-16">
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


    </section>
  );
};

export default KeyFunctionsSection;