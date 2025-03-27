import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Navbar from "./components/Navbar.new";
import HeroSection from "./components/HeroSection.new";
import FeaturesSection from "./components/FeaturesSection";
import KeyFunctionsSection from "./components/KeyFunctionsSection";
import VideoShowcase from "./components/VideoShowcase";
import InstagramFeed from "./components/InstagramFeed";
import NewsletterSignup from "./components/NewsletterSignup";
import AboutSection from "./components/AboutSection";
import FAQSection from "./components/FAQSection";
import KickstarterCTA from "./components/KickstarterCTA";
import Footer from "./components/Footer";
import NotFound from "@/pages/not-found";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Set page title dynamically
    document.title = t('meta.title');
  }, [t]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <KeyFunctionsSection />
        <FeaturesSection />
        <VideoShowcase />
        <InstagramFeed />
        <NewsletterSignup />
        <AboutSection />
        <FAQSection />
        <KickstarterCTA />
      </main>
      <Footer />
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;