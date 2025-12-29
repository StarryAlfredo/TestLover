import React from 'react';

const CoupleSilhouette: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-2xl px-4 pointer-events-none">
      <svg
        viewBox="0 0 500 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Hillock */}
        <path
          d="M0,200 Q150,150 250,160 T500,200 Z"
          fill="#020617" 
          opacity="0.9"
        />

        {/* Silhouette of Couple - stylized abstract forms */}
        <g transform="translate(200, 135) scale(0.6)">
            {/* Person 1 (Left) */}
            <path 
                d="M30 80 Q30 40 50 20 Q60 10 70 20 Q90 40 80 80 L90 120 L30 120 Z" 
                fill="#000"
            />
            <circle cx="60" cy="20" r="12" fill="#000" />
            
            {/* Person 2 (Right) */}
            <path 
                d="M100 85 Q110 45 90 25 Q80 15 75 25 Q60 50 70 90 L60 120 L110 120 Z" 
                fill="#000"
            />
            <circle cx="85" cy="22" r="11" fill="#000" />
            
            {/* Holding Hands / Closeness */}
             <path 
                d="M70 80 Q75 90 80 80" 
                stroke="#000" 
                strokeWidth="5"
            />
        </g>
        
        {/* Subtle grass blades */}
        <path d="M100 180 l-2 -10 l2 10 l3 -8 l-3 8" stroke="#000" strokeWidth="1" />
        <path d="M400 190 l-2 -8 l2 8 l3 -12 l-3 12" stroke="#000" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default CoupleSilhouette;
