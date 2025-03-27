import { useState } from "react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  questionKey: string;
  answerKey: string;
  answerType: "text" | "list";
  listItemsKeys?: string[];
}

const FAQSection = () => {
  const { t } = useTranslation();
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqItems: FAQItem[] = [
    {
      questionKey: 'faq.availability.question',
      answerKey: 'faq.availability.answer',
      answerType: "text"
    },
    {
      questionKey: 'faq.os.question',
      answerKey: 'faq.os.answer',
      answerType: "text"
    },
    {
      questionKey: 'faq.expansion.question',
      answerKey: 'faq.expansion.answer',
      answerType: "text"
    },
    {
      questionKey: 'faq.payment.question',
      answerKey: 'faq.payment.answer',
      answerType: "text"
    },
    {
      questionKey: 'faq.specs.question',
      answerKey: 'faq.specs.answer',
      answerType: "list",
      listItemsKeys: [
        'faq.specs.list.display',
        'faq.specs.list.processor',
        'faq.specs.list.ram',
        'faq.specs.list.storage',
        'faq.specs.list.battery',
        'faq.specs.list.camera',
        'faq.specs.list.ports'
      ]
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('faq.title')}</h2>
          <p className="text-lg text-neutral">{t('faq.subtitle')}</p>
        </m.div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <FAQAccordionItem
                key={index}
                question={t(item.questionKey)}
                answer={t(item.answerKey)}
                answerType={item.answerType}
                listItems={item.listItemsKeys ? item.listItemsKeys.map(key => t(key)) : []}
                index={index}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  answerType: "text" | "list";
  listItems?: string[];
  index: number;
}

const FAQAccordionItem = ({ question, answer, answerType, listItems = [], index }: FAQAccordionItemProps) => {
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
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
    >
      <AccordionItem value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
        <AccordionTrigger className="px-5 py-4 text-lg font-medium hover:no-underline">
          {question}
        </AccordionTrigger>
        <AccordionContent className="px-5 py-4 border-t border-gray-200 bg-gray-50">
          {answerType === "text" ? (
            <p className="text-neutral">{answer}</p>
          ) : (
            <>
              <p className="text-neutral mb-4">{answer}</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral">
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </m.div>
  );
};

export default FAQSection;