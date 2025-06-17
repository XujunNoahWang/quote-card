import React from 'react';
import { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isDarkMode: boolean;
  currentIndex: number;
  totalCount: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ 
  quote, 
  isDarkMode
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center px-6">
      {/* 卡片 - 占满60%的屏幕高度 */}
      <div className={`
        relative w-full max-w-lg h-[60vh] min-h-[400px] p-12 rounded-[2rem] shadow-2xl backdrop-blur-xl 
        transition-all duration-700 ease-out transform hover:scale-[1.02]
        ${isDarkMode 
          ? 'bg-gray-800/95 border border-gray-700/30' 
          : 'bg-white/95 border border-white/40'
        }
      `}>
        {/* 引号装饰 */}
        <div className={`
          absolute top-8 left-8 text-8xl opacity-10 font-serif leading-none
          ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}
        `}>
          "
        </div>
        
        {/* 语录内容 - 居中显示 */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <p className={`
            text-xl md:text-2xl leading-relaxed font-light text-center tracking-wide
            ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
          `}>
            {quote.content}
          </p>
        </div>
        
        {/* 右下角引号装饰 */}
        <div className={`
          absolute bottom-8 right-8 text-8xl opacity-10 font-serif leading-none rotate-180
          ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}
        `}>
          "
        </div>
      </div>
      
      {/* 背景光晕效果 */}
      <div className={`
        absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-30 scale-110
        ${isDarkMode 
          ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30' 
          : 'bg-gradient-to-br from-blue-400/30 to-purple-400/30'
        }
      `} />
    </div>
  );
}; 