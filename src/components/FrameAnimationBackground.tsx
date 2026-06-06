import React, { useEffect, useRef, useState } from 'react';

const FrameAnimationBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const stateRef = useRef({
    currentTime: 0,
    targetTime: 0,
    isLoaded: false
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (stateRef.current.isLoaded) return;
      stateRef.current.isLoaded = true;
      setIsLoaded(true);
      setLoadProgress(100);
      handleScroll(); // Initial seek
      
      // Warm up the video decoder for instant response to scroll scrubbing
      video.play().then(() => {
        video.pause();
      }).catch(err => {
        console.warn("Video decoder warmup aborted/failed:", err);
      });
    };

    const handleProgress = () => {
      if (video.buffered.length > 0 && video.duration) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const progress = Math.min(Math.max(Math.round((bufferedEnd / video.duration) * 100), 0), 100);
        setLoadProgress(progress);
      } else if (video.readyState >= 3) {
        setLoadProgress(100);
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Determine the target element for scroll mapping
      const targetElement = document.getElementById('popular-projects-slider') || document.getElementById('popular-projects');
      let maxScroll = 1;
      
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        // The scroll offset where the popular projects section starts entering the viewport
        maxScroll = rect.top + scrollTop - window.innerHeight;
      } else {
        // Fallback to full document height scroll range
        maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      }

      if (maxScroll <= 0) maxScroll = 1;
      
      const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      
      if (video.duration) {
        stateRef.current.targetTime = progress * video.duration;
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check if metadata is already loaded (handles caches/fast loading/hot reloads)
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (video.buffered.length > 0) {
      handleProgress();
    }
    
    // Initial calls
    handleScroll();
    const timer = setTimeout(handleScroll, 100);

    let animationFrameId: number;

    const render = () => {
      const state = stateRef.current;
      
      if (video.duration && state.isLoaded) {
        // Smooth interpolation (lerp) toward the target time
        const diff = state.targetTime - state.currentTime;
        
        if (Math.abs(diff) > 0.005) {
          // Using a lerp factor of 0.08 for smooth deceleration
          state.currentTime += diff * 0.08;
          // Set video current time safely clamped
          video.currentTime = Math.min(Math.max(state.currentTime, 0), video.duration);
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden bg-transparent">
      <video
        ref={videoRef}
        src="/bg-video.mp4"
        preload="auto"
        muted
        playsInline
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: isLoaded ? 0.85 : 0 // Controlled by robust isLoaded state
        }}
      />
      {!isLoaded && loadProgress < 100 && (
        <div className="fixed bottom-4 right-4 text-[9px] font-mono text-red-600/40 uppercase tracking-[0.2em] z-50 pointer-events-none select-none">
          Syncing neural stream... {loadProgress}%
        </div>
      )}
    </div>
  );
};

export default FrameAnimationBackground;
