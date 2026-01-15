import React from 'react';
import { Cpu } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-1.5 sm:space-x-2">
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xs"></div>
        <div className="relative bg-white/10 backdrop-blur-sm p-1.5 sm:p-2 rounded-full border border-white/20 shadow-sm">
          <Cpu className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-500" />
        </div>
      </div>
      
      <div className="flex flex-col min-w-0">
        <h1 className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-tight truncate">
          ELEARN<span className="text-blue-600 font-bold">.AI</span>
        </h1>
        <span className="text-[5px] sm:text-[7px] md:text-[px] text-gray-600 font-light tracking-wide7r truncate">
          INTUITIVE LEARNING
        </span>
      </div>
    </div>
  );
};

export default Logo;