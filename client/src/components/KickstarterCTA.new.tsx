import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const KickstarterCTA = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="kickstarter" className="py-20 md:py-28 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('kickstarter.title')}</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{t('kickstarter.subtitle')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <KickstarterStat 
              value="30%" 
              label={t('kickstarter.discount')} 
              delay={0}
            />
            <KickstarterStat 
              value="$299" 
              label={t('kickstarter.price')} 
              delay={0.1}
            />
            <KickstarterStat 
              value="3 Months" 
              label={t('kickstarter.shipping')} 
              delay={0.2}
            />
          </div>
          
          <Button size="lg" variant="secondary" className="text-primary" asChild>
            <a 
              href="https://www.kickstarter.com/smartx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 font-medium text-lg rounded-lg"
            >
              {t('kickstarter.button')}
              <ChevronRight className="h-5 w-5 ml-2" />
            </a>
          </Button>
        </m.div>
      </div>
    </section>
  );
};

interface KickstarterStatProps {
  value: string;
  label: string;
  delay: number;
}

const KickstarterStat = ({ value, label, delay }: KickstarterStatProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
    >
      <h3 className="text-2xl font-bold mb-2">{value}</h3>
      <p className="text-white/80">{label}</p>
    </m.div>
  );
};

export default KickstarterCTA;