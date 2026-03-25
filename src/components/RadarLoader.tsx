import React from 'react';

const RadarLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="radar-loader">
        <span />
        <div id="dot-1" className="dot" />
        <div id="dot-2" className="dot" />
        <div id="dot-3" className="dot" />
        <div id="dot-4" className="dot" />
        <div id="dot-5" className="dot" />
      </div>
      
      <style>{`
        .radar-loader {
          position: relative;
          width: 150px;
          height: 150px;
          background: #050505;
          border-radius: 50%;
          box-shadow: inset 0px 0px 15px rgba(255, 0, 0, 0.2);
          border: 1px solid rgba(255, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .radar-loader::before {
          content: "";
          position: absolute;
          inset: 20px;
          background: transparent;
          border: 1px solid rgba(255, 0, 0, 0.2);
          border-radius: 50%;
          box-shadow: inset 0px 0px 10px rgba(255, 0, 0, 0.1);
        }

        .radar-loader::after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid rgba(255, 0, 0, 0.4);
          box-shadow: inset 0px 0px 5px rgba(255, 0, 0, 0.2);
        }

        .radar-loader span {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: transparent;
          transform-origin: top left;
          animation: radar81 2s linear infinite;
          box-shadow: -25px -75px 30px -50px rgba(255, 0, 0, 0.5);
          border-top: 2px solid #FF0000;
        }

        @keyframes radar81 {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        #dot-1 {
          --dot-start-top: 100px;
          --dot-start-left: 140px;
          --dot-end-top: 130px;
          --dot-end-left: 20px;
          --delay: 0s;
        }

        #dot-2 {
          --dot-start-top: 100px;
          --dot-start-left: 0px;
          --dot-end-top: -3px;
          --dot-end-left: 90px;
          --delay: 1s;
        }

        #dot-3 {
          --dot-start-top: 100px;
          --dot-start-left: 105px;
          --dot-end-top: 18px;
          --dot-end-left: 18px;
          --delay: 2s;
        }

        #dot-4 {
          --dot-start-top: 110px;
          --dot-start-left: 150px;
          --dot-end-top: 140px;
          --dot-end-left: 30px;
          --delay: 3s;
        }

        #dot-5 {
          --dot-start-top: -5px;
          --dot-start-left: 85px;
          --dot-end-top: 125px;
          --dot-end-left: 120px;
          --delay: 4s;
        }

        .dot {
          width: 4px;
          height: 4px;
          position: absolute;
          top: var(--dot-start-top);
          left: var(--dot-start-left);
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
          animation: fly 20s linear infinite;
          animation-delay: var(--delay);
        }

        @keyframes fly {
          0% {
            top: var(--dot-start-top);
            left: var(--dot-start-left);
            opacity: 0;
          }
          10%, 90% {
            opacity: 1;
          }
          100% {
            top: var(--dot-end-top);
            left: var(--dot-end-left);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default RadarLoader;
