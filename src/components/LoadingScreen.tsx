import React from 'react';

const LoadingScreen = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'hsl(0, 0%, 100%)',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <div style={{ filter: 'url(#goo)', position: 'relative' }}>
        <div style={{
          width: '200px',
          height: '200px',
          position: 'relative',
          animation: 'rotate-move 2s ease-in-out infinite',
        }}>
          {/* Dot 3 - Dark Green */}
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'hsl(153, 80%, 25%)',
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            margin: 'auto',
            animation: 'dot-3-move 2s ease infinite, index 6s ease infinite',
          }} />
          {/* Dot 2 - Mid Green */}
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'hsl(153, 65%, 40%)',
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            margin: 'auto',
            animation: 'dot-2-move 2s ease infinite, index 6s -4s ease infinite',
          }} />
          {/* Dot 1 - Light Green */}
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'hsl(153, 50%, 60%)',
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            margin: 'auto',
            animation: 'dot-1-move 2s ease infinite, index 6s -2s ease infinite',
          }} />
        </div>
      </div>

      {/* SVG Goo Filter */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', width: 0, height: 0 }}
      >
        <defs>
          <filter id="goo">
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
