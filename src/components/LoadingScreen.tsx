import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden">
      {/* Wrapper to handle centering separately from rotation */}
      <div className="flex items-center justify-center">
        <div 
          className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]" 
          style={{ filter: 'url(#goo)', animation: 'rotate-move 2s ease-in-out infinite' }}
        >
          {/* Dot 3 - Primary Dark */}
          <div 
            className="absolute w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto"
            style={{ 
              backgroundColor: 'hsl(153, 80%, 25%)',
              animation: 'dot-3-move 2s ease infinite, index 6s ease infinite'
            }}
          />
          {/* Dot 2 - Primary */}
          <div 
            className="absolute w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto"
            style={{ 
              backgroundColor: 'hsl(153, 65%, 35%)',
              animation: 'dot-2-move 2s ease infinite, index 6s -4s ease infinite'
            }}
          />
          {/* Dot 1 - Primary Light */}
          <div 
            className="absolute w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto"
            style={{ 
              backgroundColor: 'hsl(153, 45%, 55%)',
              animation: 'dot-1-move 2s ease infinite, index 6s -2s ease infinite'
            }}
          />
        </div>
      </div>

      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <style>{`
        @keyframes dot-3-move {
          20% { transform: scale(1); }
          45% { transform: translateY(-18px) scale(0.45); }
          60% { transform: translateY(-90px) scale(0.45); }
          80% { transform: translateY(-90px) scale(0.45); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes dot-2-move {
          20% { transform: scale(1); }
          45% { transform: translate(-16px, 12px) scale(0.45); }
          60% { transform: translate(-80px, 60px) scale(0.45); }
          80% { transform: translate(-80px, 60px) scale(0.45); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes dot-1-move {
          20% { transform: scale(1); }
          45% { transform: translate(16px, 12px) scale(0.45); }
          60% { transform: translate(80px, 60px) scale(0.45); }
          80% { transform: translate(80px, 60px) scale(0.45); }
          100% { transform: translateY(0px) scale(1); }
        }

        @keyframes rotate-move {
          0% { transform: rotate(0deg); }
          55% { transform: rotate(0deg); }
          80% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes index {
          0%, 100% { z-index: 3; }
          33.3% { z-index: 2; }
          66.6% { z-index: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
