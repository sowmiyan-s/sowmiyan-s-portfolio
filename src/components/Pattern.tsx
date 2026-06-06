import React from 'react';

const Pattern = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(145deg, rgb(0, 0, 0), rgba(15, 0, 0, 0.9), rgb(30, 0, 0))',
        }}
      >
        <div className="absolute inset-0" style={{ filter: 'url(#advanced-texture)' }}>
           <div className="w-full h-full bg-black/40" />
        </div>
        
        <span className="absolute inset-0 ripple-overlay opacity-20 pointer-events-none" />
        
        <svg className="absolute w-0 h-0 overflow-hidden">
          <filter id="advanced-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves={8} result="noise" />
            <feSpecularLighting in="noise" surfaceScale={300} specularConstant={2000} specularExponent={20} lightingColor="#dc2626" result="specular">
              <fePointLight x={50} y={50} z={600} />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceGraphic" operator="in" result="litNoise" />
            <feBlend in="SourceGraphic" in2="litNoise" mode="overlay" />
          </filter>
        </svg>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default Pattern;
