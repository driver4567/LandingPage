import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Smartphone, 
  Cpu, 
  Camera, 
  DollarSign, 
  Zap, 
  Lock 
} from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature = ({ icon, title, description, index }: FeatureProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-neutral">{description}</p>
    </m.div>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Smartphone className="h-6 w-6 text-primary" />,
      titleKey: 'features.display.title',
      descriptionKey: 'features.display.description'
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      titleKey: 'features.processor.title',
      descriptionKey: 'features.processor.description'
    },
    {
      icon: <Camera className="h-6 w-6 text-primary" />,
      titleKey: 'features.camera.title',
      descriptionKey: 'features.camera.description'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      titleKey: 'features.ports.title',
      descriptionKey: 'features.ports.description'
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      titleKey: 'features.charging.title',
      descriptionKey: 'features.charging.description'
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      titleKey: 'features.security.title',
      descriptionKey: 'features.security.description'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('features.title')}</h2>
          <p className="text-lg text-neutral">{t('features.subtitle')}</p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={t(feature.titleKey)}
              description={t(feature.descriptionKey)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;