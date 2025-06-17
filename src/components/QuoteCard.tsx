import React from 'react';
import { Quote } from '../types';
import { getColorForTag } from '../utils/colors';

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
  isDarkMode, 
  currentIndex, 
  totalCount 
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* 卡片 */}
      <div className={`
        relative p-8 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-500
        ${isDarkMode 
          ? 'bg-gray-800/90 border border-gray-700/50' 
          : 'bg-white/90 border border-white/20'
        }
      `}>
        {/* 引号装饰 */}
        <div className={`
          absolute top-4 left-6 text-6xl opacity-20 font-serif
          ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}
        `}>
          "
        </div>
        
        {/* 语录内容 */}
        <div className="relative z-10 mb-6">
          <p className={`
            text-lg leading-relaxed font-medium text-center
            ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
          `}>
            {quote.content}
          </p>
        </div>
        
        {/* 标签 */}
        {quote.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {quote.tags.map((tag, index) => {
              const colors = getColorForTag(tag);
              return (
                <span
                  key={index}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium border transition-colors
                    ${colors.bg} ${colors.text} ${colors.border}
                    ${colors.darkBg} ${colors.darkText}
                  `}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
        
        {/* 计数器 */}
        <div className={`
          text-center text-sm opacity-50
          ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
        `}>
          {currentIndex + 1} / {totalCount}
        </div>
        
        {/* 滑动提示 */}
        <div className={`
          absolute bottom-4 left-1/2 transform -translate-x-1/2
          text-xs opacity-30 flex items-center space-x-2
          ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}
        `}>
          <span>←</span>
          <span>滑动查看更多</span>
          <span>→</span>
        </div>
      </div>
      
      {/* 侧面装饰 */}
      <div className={`
        absolute inset-0 -z-10 rounded-3xl blur-xl opacity-20
        ${isDarkMode 
          ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
          : 'bg-gradient-to-br from-blue-400 to-purple-400'
        }
      `} />
    </div>
  );
}; 