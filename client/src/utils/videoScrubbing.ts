import { useState, useEffect, useCallback } from 'react';

export const useVideoScrubbing = () => {
  const setupVideoScrubbing = useCallback((videoElement: HTMLVideoElement, containerElement: HTMLElement) => {
    // Load the video and get its duration when loaded
    let videoDuration = 0;
    
    const handleVideoLoaded = () => {
      videoDuration = videoElement.duration;
      videoElement.pause();
      // Set initial frame
      videoElement.currentTime = 0;
    };
    
    videoElement.addEventListener('loadedmetadata', handleVideoLoaded);
    
    // Function to update video currentTime based on scroll position
    const updateVideoPlayback = () => {
      if (!videoDuration) return;
      
      const rect = containerElement.getBoundingClientRect();
      const containerHeight = containerElement.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the container is in view
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(rect.bottom, windowHeight);
      
      // If container is not visible at all, return
      if (visibleBottom <= visibleTop) return;
      
      // Calculate visible percentage (0 to 1)
      const visibleHeight = visibleBottom - visibleTop;
      const percentageInView = visibleHeight / containerHeight;
      
      // Calculate scroll progress (0 to 1)
      // This gives us a value from 0 (when the container first enters view)
      // to 1 (when the container is about to exit view at the top)
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + containerHeight);
      const boundedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Update video currentTime based on scroll progress
      videoElement.currentTime = boundedProgress * videoDuration;
    };
    
    // Attach scroll event listener
    window.addEventListener('scroll', updateVideoPlayback, { passive: true });
    
    // Call once initially to set correct position
    updateVideoPlayback();
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', updateVideoPlayback);
      videoElement.removeEventListener('loadedmetadata', handleVideoLoaded);
    };
  }, []);

  return { setupVideoScrubbing };
};
