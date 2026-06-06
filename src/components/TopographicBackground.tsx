import React from 'react';

const TopographicBackground = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Red Lines */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.65,
          background: 'black',
          filter: 'url(#octave1) brightness(5) contrast(1.5)',
          transform: 'scale(1)',
        }} 
      />
      
      {/* White Lines */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          opacity: 0.4,
          background: 'transparent',
          filter: 'url(#octave2) brightness(5) contrast(1.5)',
          transform: 'scale(1)',
        }} 
      />
      
      <svg width="0" height="0">
        <filter id="octave1">
          <feTurbulence type="fractalNoise" baseFrequency="0.0004" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o2" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0001" numOctaves={8} seed={4} result="o3" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0018" numOctaves={8} seed={4} result="o4" />
          <feMerge result="finalIsland">
            <feMergeNode in="o1" />
            <feMergeNode in="o3" />
            <feMergeNode in="o1" />
            <feMergeNode in="o3" />
          </feMerge>
          <feGaussianBlur in="finalIsland" stdDeviation={5} result="noiseo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o2" />
          <feMerge result="noiseo">
            <feMergeNode in="o2" />
            <feMergeNode in="o4" />
            <feMergeNode in="noiseo" />
          </feMerge>
          <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves={8} seed={4} result="o2" />
          <feMerge result="noiseo">
            <feMergeNode in="o1" />
            <feMergeNode in="o1" />
            <feMergeNode in="noiseo" />
          </feMerge>
          <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
          <feDiffuseLighting in="noiseo" surfaceScale={12} diffuseConstant={1} lightingColor="#dc2626" result="lit">
            <feDistantLight azimuth={90} elevation={2} />
          </feDiffuseLighting>
          <feBlend in="lit" in2="SourceGraphic" mode="normal" />
        </filter>
        
        <filter id="octave2">
          <feTurbulence type="fractalNoise" baseFrequency="0.0004" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o2" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0001" numOctaves={8} seed={4} result="o3" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0018" numOctaves={8} seed={4} result="o4" />
          <feMerge result="finalIsland">
            <feMergeNode in="o1" />
            <feMergeNode in="o3" />
            <feMergeNode in="o1" />
            <feMergeNode in="o3" />
          </feMerge>
          <feGaussianBlur in="finalIsland" stdDeviation={5} result="noiseo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0008" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o2" />
          <feMerge result="noiseo">
            <feMergeNode in="o2" />
            <feMergeNode in="o4" />
            <feMergeNode in="noiseo" />
          </feMerge>
          <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
          <feTurbulence type="fractalNoise" baseFrequency="0.0016" numOctaves={8} seed={4} result="o1" />
          <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves={8} seed={4} result="o2" />
          <feMerge result="noiseo">
            <feMergeNode in="o1" />
            <feMergeNode in="o1" />
            <feMergeNode in="noiseo" />
          </feMerge>
          <feGaussianBlur in="noiseo" stdDeviation={5} result="noiseo" />
          <feDiffuseLighting in="noiseo" surfaceScale={12} diffuseConstant={1} lightingColor="#ffffff" result="lit">
            <feDistantLight azimuth={-90} elevation={2} />
          </feDiffuseLighting>
          <feBlend in="lit" in2="SourceGraphic" mode="normal" />
        </filter>
      </svg>
    </div>
  );
}

export default TopographicBackground;
