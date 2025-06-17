import React, { useState, useRef, useCallback } from 'react';
import { Quote } from '../types';

interface SwipeableQuoteCardsProps {
  quotes: Quote[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  isDarkMode: boolean;
}

export const SwipeableQuoteCards: React.FC<SwipeableQuoteCardsProps> = ({
  quotes,
  currentIndex,
  onIndexChange,
  isDarkMode
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startTime = useRef<number>(0);

  const threshold = 100; // 滑动阈值
  const velocityThreshold = 0.3; // 速度阈值

  // 获取相邻卡片的索引
  const getPrevIndex = useCallback(() => currentIndex === 0 ? quotes.length - 1 : currentIndex - 1, [currentIndex, quotes.length]);
  const getNextIndex = useCallback(() => currentIndex === quotes.length - 1 ? 0 : currentIndex + 1, [currentIndex, quotes.length]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (isTransitioning || quotes.length <= 1) return;
    
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
    startTime.current = Date.now();
  }, [isTransitioning, quotes.length]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || isTransitioning) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    // 只在水平滑动时处理
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setSlideOffset(deltaX);
    }
  }, [isDragging, isTransitioning]);

  const handleEnd = useCallback(() => {
    if (!isDragging || isTransitioning) return;
    
    setIsDragging(false);
    
    const deltaTime = Date.now() - startTime.current;
    const velocity = Math.abs(slideOffset) / deltaTime;
    
    // 判断是否触发切换
    const shouldSwitch = Math.abs(slideOffset) > threshold || velocity > velocityThreshold;
    
    if (shouldSwitch) {
      setIsTransitioning(true);
      
      if (slideOffset > 0) {
        // 向右滑动，显示前一张 - 直接切换到新内容
        onIndexChange(getPrevIndex());
      } else {
        // 向左滑动，显示后一张 - 直接切换到新内容
        onIndexChange(getNextIndex());
      }
      
      // 切换内容后，卡片回到中心位置（现在显示的是新内容）
      setSlideOffset(0);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    } else {
      // 回到原位
      setSlideOffset(0);
    }
  }, [isDragging, isTransitioning, slideOffset, onIndexChange, getPrevIndex, getNextIndex]);

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {  
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // 全局事件监听
  React.useEffect(() => {
    if (!isDragging) return;
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
    
    const handleGlobalMouseUp = () => {
      handleEnd();
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // 防止页面滚动
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const handleGlobalTouchEnd = () => {
      handleEnd();
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // 键盘事件监听
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || quotes.length <= 1 || isDragging) return;
      
      const containerWidth = containerRef.current?.offsetWidth || 400;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsTransitioning(true);
        
        // 模拟向右滑动动画
        setSlideOffset(containerWidth);
        setTimeout(() => {
          onIndexChange(getPrevIndex());
          setSlideOffset(0);
          setTimeout(() => setIsTransitioning(false), 200);
        }, 100);
        
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIsTransitioning(true);
        
        // 模拟向左滑动动画
        setSlideOffset(-containerWidth);
        setTimeout(() => {
          onIndexChange(getNextIndex());
          setSlideOffset(0);
          setTimeout(() => setIsTransitioning(false), 200);
        }, 100);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning, quotes.length, isDragging, getPrevIndex, getNextIndex, onIndexChange]);

  // 没有语录时的显示
  if (quotes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            📝
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            还没有语录
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            点击右上角的 + 号添加第一条语录
          </p>
        </div>
      </div>
    );
  }

  const currentQuote = quotes[currentIndex];
  const prevQuote = quotes[getPrevIndex()];
  const nextQuote = quotes[getNextIndex()];

  // 渲染单个卡片的函数
  const renderCard = (quote: Quote, position: 'current' | 'prev' | 'next') => {
    let translateX = 0;
    const containerWidth = containerRef.current?.offsetWidth || 400;
    
    // 统一的位置计算逻辑
    if (position === 'current') {
      translateX = slideOffset;
    } else if (position === 'prev') {
      // 前一张卡片在左边，随着向右滑动而进入
      translateX = slideOffset - containerWidth;
    } else if (position === 'next') {
      // 后一张卡片在右边，随着向左滑动而进入
      translateX = slideOffset + containerWidth;
    }

    return (
      <div 
        className={`
          absolute inset-0 w-full max-w-lg h-[60vh] min-h-[400px] mx-4
          transition-transform ease-out
          ${isDragging ? 'duration-0' : 'duration-200'}
          ${isTransitioning ? 'duration-200 ease-in-out' : ''}
        `}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        {/* 卡片内容 */}
        <div className={`
          w-full h-full p-8 md:p-12 rounded-[2rem] shadow-2xl backdrop-blur-xl 
          border transition-all duration-700 ease-out
          ${isDarkMode 
            ? 'bg-gray-800/95 border-gray-700/40' 
            : 'bg-white/95 border-white/50'
          }
        `}>
          {/* 引号装饰 */}
          <div className={`
            absolute top-6 left-6 text-6xl md:text-8xl opacity-10 font-serif leading-none
            ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}
          `}>
            "
          </div>
          
          {/* 语录内容 - 居中显示 */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <p className={`
              text-lg md:text-2xl leading-relaxed font-light text-center tracking-wide
              ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}
            `}>
              {quote.content}
            </p>
          </div>
          
          {/* 右下角引号装饰 */}
          <div className={`
            absolute bottom-6 right-6 text-6xl md:text-8xl opacity-10 font-serif leading-none rotate-180
            ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}
          `}>
            "
          </div>
        </div>
        
        {/* 背景光晕效果 */}
        <div className={`
          absolute inset-0 -z-10 rounded-[2rem] blur-3xl opacity-20 scale-105
          ${isDarkMode 
            ? 'bg-gradient-to-br from-blue-600/40 to-purple-600/40' 
            : 'bg-gradient-to-br from-blue-400/40 to-purple-400/40'
          }
        `} />
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing focus:outline-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
      tabIndex={0}
      style={{ 
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'pan-y'
      }}
    >
      <div className="relative w-full max-w-lg h-[60vh] min-h-[400px] mx-4">
        {/* 渲染三张卡片：前一张、当前、后一张 */}
        {renderCard(prevQuote, 'prev')}
        {renderCard(currentQuote, 'current')}
        {renderCard(nextQuote, 'next')}
      </div>
    </div>
  );
}; 