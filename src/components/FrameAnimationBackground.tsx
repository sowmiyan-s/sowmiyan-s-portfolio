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

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || stateRef.current.isLoaded) return;
    stateRef.current.isLoaded = true;
    setIsLoaded(true);
    setLoadProgress(100);
    
    // Perform initial scroll check
    handleScroll();
    
    // Warm up the video decoder
    video.play().then(() => {
      video.pause();
    }).catch(err => {
      console.warn("Video decoder warmup aborted/failed:", err);
    });
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.buffered.length > 0 && video.duration) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const progress = Math.min(Math.max(Math.round((bufferedEnd / video.duration) * 100), 0), 100);
      setLoadProgress(progress);
    } else if (video.readyState >= 3) {
      setLoadProgress(100);
    }
  };

  const handleScroll = () => {
    const video = videoRef.current;
    if (!video) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
    
    if (video.duration) {
      stateRef.current.targetTime = progress * video.duration;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial triggers if media has loaded prior to useEffect mounting
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
    if (video.buffered.length > 0) {
      handleProgress();
    }

    // Secondary fallback sync timer
    const timer = setTimeout(handleScroll, 100);
    let animationFrameId: number;

    const render = () => {
      const state = stateRef.current;
      if (video.duration && state.isLoaded) {
        const diff = state.targetTime - state.currentTime;
        if (Math.abs(diff) > 0.002) {
          state.currentTime += diff * 0.08;
          video.currentTime = Math.min(Math.max(state.currentTime, 0), video.duration);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
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
        onLoadedMetadata={handleLoadedMetadata}
        onProgress={handleProgress}
        className="w-full h-full object-cover transition-opacity duration-1000"
        style={{
          opacity: isLoaded ? 0.85 : 0
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
