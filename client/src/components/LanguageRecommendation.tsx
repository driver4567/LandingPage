import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, X } from 'lucide-react';
import { languages } from '@/i18n/i18n';
import { 
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport 
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

const LanguageRecommendation = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [browserLanguage, setBrowserLanguage] = useState<string | null>(null);
  const [matchedLanguage, setMatchedLanguage] = useState<{code: string, name: string, flag: string} | null>(null);
  const [hasShownToast, setHasShownToast] = useState(false);

  // Check for existing preference in localStorage to avoid showing recommendation if user already chose
  const hasUserChosenLanguage = () => {
    return localStorage.getItem('user_language_preference') === 'true';
  };

  useEffect(() => {
    // Skip if user has previously selected a language
    if (hasUserChosenLanguage()) {
      return;
    }
    
    // Get the browser language
    const detectBrowserLanguage = () => {
      // navigator.language returns the preferred language of the user (e.g., 'en-US')
      const navLang = navigator.language || (navigator as any).userLanguage;
      
      // Store the browser language
      if (navLang) {
        setBrowserLanguage(navLang.toLowerCase());
      }
    };

    detectBrowserLanguage();
  }, []);

  useEffect(() => {
    // Skip if user has previously selected a language
    if (hasUserChosenLanguage()) {
      return;
    }
    
    // Check if we should recommend a language
    if (browserLanguage && !hasShownToast) {
      // First check if the exact language code matches
      let matched = languages.find(lang => lang.code === browserLanguage);
      
      // If no exact match, check if it's a variant (like en-US for en)
      if (!matched) {
        matched = languages.find(lang => browserLanguage.startsWith(lang.code + '-'));
      }

      // If we found a match and it's not the current language
      if (matched && matched.code !== i18n.language) {
        setMatchedLanguage(matched);
        
        // Show toast notification
        toast({
          title: t('languageRecommendation.title'),
          description: t('languageRecommendation.detected', { language: matched.name }) + ' ' + 
                      t('languageRecommendation.question', { language: matched.name }),
          action: (
            <ToastAction altText={t('languageRecommendation.switchButton', { language: matched.name })} 
                        onClick={() => switchLanguage(matched.code)}>
              <span className="flex items-center gap-2">
                <span>{matched.flag}</span>
                <span>{t('languageRecommendation.switchButton', { language: matched.name })}</span>
              </span>
            </ToastAction>
          ),
        });
        
        setHasShownToast(true);
      }
    }
  }, [browserLanguage, i18n.language, hasShownToast, t]);

  const switchLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Save user's preference to avoid showing this again
    localStorage.setItem('user_language_preference', 'true');
  };

  return null; // This component doesn't render anything, it just shows the toast
};

export default LanguageRecommendation;