import React from 'react';

const RedCrackPattern = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: '#000000',
          backgroundImage: `
            linear-gradient(30deg, #111111 12%, transparent 12.5%, transparent 87%, #111111 87.5%, #111111),
            linear-gradient(150deg, #111111 12%, transparent 12.5%, transparent 87%, #111111 87.5%, #111111),
            linear-gradient(30deg, #111111 12%, transparent 12.5%, transparent 87%, #111111 87.5%, #111111),
            linear-gradient(150deg, #111111 12%, transparent 12.5%, transparent 87%, #111111 87.5%, #111111),
            linear-gradient(60deg, #77777777 25%, transparent 25.5%, transparent 75%, #77777777 75%, #77777777),
            linear-gradient(60deg, #77777777 25%, transparent 25.5%, transparent 75%, #77777777 75%, #77777777)
          `,
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          backgroundSize: '80px 140px',
          boxShadow: 'inset 0 0 100px rgba(255, 215, 0, 0.1)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default RedCrackPattern;
