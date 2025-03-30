import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutSection = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [leftContentRef, leftContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [rightContentRef, rightContentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-16">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('about.title')}</h2>
          <p className="text-lg text-neutral">{t('about.subtitle')}</p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <m.div 
            ref={leftContentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-2xl font-bold mb-4">{t('about.story.title')}</h3>
            <p className="text-neutral mb-6">{t('about.story.content')}</p>
            
            <h3 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h3>
            <p className="text-neutral mb-6">{t('about.mission.content')}</p>
            
            <h3 className="text-2xl font-bold mb-4">{t('about.team.title')}</h3>
            <p className="text-neutral">{t('about.team.content')}</p>
          </m.div>
          
          <m.div 
            ref={rightContentRef}
            initial={{ opacity: 0, x: 50 }}
            animate={rightContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt={t('about.imageAlt')} 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={rightContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                delay: 0.4,
                duration: 0.6,
                ease: "easeOut" 
              }}
              className="absolute -bottom-6 -left-6 p-4 bg-white rounded-xl shadow-lg max-w-xs hidden md:block"
            >
              <p className="font-medium text-primary">{t('about.foundedText')}</p>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;