import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { m } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play, X } from "lucide-react";
import { useVideoScrubbing } from "../utils/videoScrubbing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";

const VideoShowcase = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [videoContainerRef, videoContainerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Initialize video scrubbing
  const { setupVideoScrubbing } = useVideoScrubbing();

  useEffect(() => {
    if (videoRef.current && containerRef.current) {
      const cleanup = setupVideoScrubbing(videoRef.current, containerRef.current);
      return cleanup;
    }
  }, [setupVideoScrubbing]);

  // Show the coming soon dialog when play is clicked
  const handlePlayClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <section id="video-showcase" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <m.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('videoShowcase.title')}</h2>
          <p className="text-lg text-neutral">{t('videoShowcase.subtitle')}</p>
        </m.div>
        
        <m.div
          ref={videoContainerRef}
          initial={{ opacity: 0 }}
          animate={videoContainerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gray-900 shadow-xl"
        >
          <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/src/assets/deviceVideo.webm"
              muted
              playsInline
              preload="auto"
            />
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button 
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center focus:outline-none hover:bg-white/30 transition-colors duration-300"
                  onClick={handlePlayClick}
                  aria-label={t('videoShowcase.playButton')}
                >
                  <Play className="h-10 w-10 text-white" />
                </button>
              </div>
            )}
          </div>
        </m.div>
        

      </div>
      
      {/* Coming Soon Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {t('videoShowcase.comingSoon.title')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t('videoShowcase.comingSoon.message')}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 mt-4">
            <p className="text-center text-sm">
              {t('videoShowcase.comingSoon.releaseInfo')}
            </p>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary">2025</div>
                <div className="text-xs text-muted-foreground">{t('videoShowcase.comingSoon.year')}</div>
              </div>
              <div className="h-10 w-px bg-muted"></div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-primary">Q2</div>
                <div className="text-xs text-muted-foreground">{t('videoShowcase.comingSoon.quarter')}</div>
              </div>
            </div>
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">{t('videoShowcase.comingSoon.close')}</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoShowcase;