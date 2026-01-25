import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative w-[200px] h-[200px] animate-[rotate-move_2s_ease-in-out_infinite]" style={{ filter: 'url(#goo)' }}>
        {/* Dot 3 - Primary Dark */}
        <div 
          className="absolute w-[70px] h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto animate-[dot-3-move_2s_ease_infinite,index_6s_ease_infinite]"
          style={{ backgroundColor: 'hsl(153, 80%, 25%)' }}
        />
        {/* Dot 2 - Primary */}
        <div 
          className="absolute w-[70px] h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto animate-[dot-2-move_2s_ease_infinite,index_6s_-4s_ease_infinite]"
          style={{ backgroundColor: 'hsl(153, 65%, 35%)' }}
        />
        {/* Dot 1 - Primary Light */}
        <div 
          className="absolute w-[70px] h-[70px] rounded-full top-0 bottom-0 left-0 right-0 m-auto animate-[dot-1-move_2s_ease_infinite,index_6s_-2s_ease_infinite]"
          style={{ backgroundColor: 'hsl(153, 45%, 55%)' }}
        />
      </div>

      {/* SVG Filter for Gooey Effect */}
      <svg className="absolute" style={{ visibility: 'hidden', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
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
          55% { transform: translate(-50%, -50%) rotate(0deg); }
          80% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
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
