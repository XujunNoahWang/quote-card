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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [keyboardDirection, setKeyboardDirection] = useState<'left' | 'right' | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startTime = useRef<number>(0);

  const threshold = 80; // 滑动阈值
  const velocityThreshold = 0.5; // 速度阈值

  // 获取要显示的卡片（前一张、当前、后一张）
  const getVisibleCards = useCallback(() => {
    if (quotes.length === 0) return [];
    
    const prevIndex = currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === quotes.length - 1 ? 0 : currentIndex + 1;
    
    return [
      { quote: quotes[prevIndex], position: 'prev', key: `${prevIndex}-prev` },
      { quote: quotes[currentIndex], position: 'current', key: `${currentIndex}-current` },
      { quote: quotes[nextIndex], position: 'next', key: `${nextIndex}-next` }
    ];
  }, [quotes, currentIndex]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    if (isTransitioning || quotes.length <= 1) return;
    
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
    startTime.current = Date.now();
    setDragOffset(0);
  }, [isTransitioning, quotes.length]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging || isTransitioning) return;
    
    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    
    // 只在水平滑动时处理
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset(deltaX);
    }
  }, [isDragging, isTransitioning]);

  const handleEnd = useCallback(() => {
    if (!isDragging || isTransitioning) return;
    
    setIsDragging(false);
    
    const deltaTime = Date.now() - startTime.current;
    const velocity = Math.abs(dragOffset) / deltaTime;
    
    // 判断是否触发切换
    const shouldSwitch = Math.abs(dragOffset) > threshold || velocity > velocityThreshold;
    
    if (shouldSwitch) {
      setIsTransitioning(true);
      
      if (dragOffset > 0) {
        // 向右滑动，显示前一张
        const newIndex = currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
        onIndexChange(newIndex);
      } else {
        // 向左滑动，显示后一张
        const newIndex = currentIndex === quotes.length - 1 ? 0 : currentIndex + 1;
        onIndexChange(newIndex);
      }
      
      // 动画完成后重置
      setTimeout(() => {
        setIsTransitioning(false);
        setDragOffset(0);
      }, 300);
    } else {
      // 回弹到原位
      setDragOffset(0);
    }
  }, [isDragging, isTransitioning, dragOffset, currentIndex, quotes.length, onIndexChange]);

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
    if (isDragging) {
      e.preventDefault(); // 防止页面滚动
    }
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

  // 全局鼠标事件监听
  React.useEffect(() => {
    if (!isDragging) return;
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };
    
    const handleGlobalMouseUp = () => {
      handleEnd();
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, handleMove, handleEnd]);

  // 键盘事件监听
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || quotes.length <= 1 || isDragging) return;
      
      if (e.key === 'ArrowLeft') {
        // 左箭头键：当前卡片向右滑出，前一张从左边滑入
        e.preventDefault();
        setIsTransitioning(true);
        setKeyboardDirection('left');
        
        // 立即切换到新索引，让动画开始
        const newIndex = currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
        onIndexChange(newIndex);
        
        // 动画完成后重置
        setTimeout(() => {
          setIsTransitioning(false);
          setKeyboardDirection(null);
        }, 400);
        
      } else if (e.key === 'ArrowRight') {
        // 右箭头键：当前卡片向左滑出，后一张从右边滑入
        e.preventDefault();
        setIsTransitioning(true);
        setKeyboardDirection('right');
        
        // 立即切换到新索引，让动画开始
        const newIndex = currentIndex === quotes.length - 1 ? 0 : currentIndex + 1;
        onIndexChange(newIndex);
        
        // 动画完成后重置
        setTimeout(() => {
          setIsTransitioning(false);
          setKeyboardDirection(null);
        }, 400);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning, quotes.length, currentIndex, onIndexChange, isDragging]);

  const visibleCards = getVisibleCards();

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
        touchAction: 'pan-y' // 允许垂直滚动，禁止水平滚动
      }}
    >
      <div className="relative w-full max-w-lg h-[60vh] min-h-[400px] mx-4">
        {visibleCards.map((card, index) => {
          let translateX = 0;
          let scale = 0.9;
          let opacity = 0.5;
          let zIndex = 1;
          let blur = 8;

          // 键盘动画逻辑
          if (keyboardDirection && isTransitioning) {
            if (keyboardDirection === 'right') {
              // 向右切换：当前卡片向左滑出，下一张从右边滑入
              if (card.position === 'current') {
                translateX = -100; // 当前卡片向左滑出
                scale = 1;
                opacity = 0.8;
                zIndex = 5;
                blur = 2;
              } else if (card.position === 'next') {
                translateX = 0; // 下一张卡片滑入中心
                scale = 1;
                opacity = 1;
                zIndex = 10;
                blur = 0;
              } else {
                translateX = card.position === 'prev' ? -150 : 150;
                scale = 0.9;
                opacity = 0.3;
                zIndex = 1;
                blur = 8;
              }
            } else if (keyboardDirection === 'left') {
              // 向左切换：当前卡片向右滑出，前一张从左边滑入
              if (card.position === 'current') {
                translateX = 100; // 当前卡片向右滑出
                scale = 1;
                opacity = 0.8;
                zIndex = 5;
                blur = 2;
              } else if (card.position === 'prev') {
                translateX = 0; // 前一张卡片滑入中心
                scale = 1;
                opacity = 1;
                zIndex = 10;
                blur = 0;
              } else {
                translateX = card.position === 'next' ? 150 : -150;
                scale = 0.9;
                opacity = 0.3;
                zIndex = 1;
                blur = 8;
              }
            }
          } 
          // 手动拖拽逻辑
          else {
            if (card.position === 'current') {
              translateX = dragOffset;
              scale = 1;
              opacity = 1;
              zIndex = 10;
              blur = 0;
            } else if (card.position === 'prev') {
              translateX = -100 + (dragOffset > 0 ? dragOffset * 0.4 : 0);
              if (dragOffset > 0) {
                scale = 0.9 + (dragOffset / 800);
                opacity = 0.5 + (dragOffset / 400);
                blur = Math.max(0, 8 - (dragOffset / 20));
              }
              zIndex = 5;
            } else if (card.position === 'next') {
              translateX = 100 + (dragOffset < 0 ? dragOffset * 0.4 : 0);
              if (dragOffset < 0) {
                scale = 0.9 + (Math.abs(dragOffset) / 800);
                opacity = 0.5 + (Math.abs(dragOffset) / 400);
                blur = Math.max(0, 8 - (Math.abs(dragOffset) / 20));
              }
              zIndex = 5;
            }
          }

          return (
            <div
              key={card.key}
              className={`
                absolute inset-0 transition-all ease-out
                ${isDragging ? 'duration-0' : 'duration-300'}
                ${isTransitioning && keyboardDirection ? 'duration-400 ease-in-out' : 'duration-300'}
              `}
              style={{
                transform: `translateX(${translateX}px) scale(${Math.max(0.8, Math.min(1.1, scale))})`,
                opacity: Math.max(0.2, Math.min(1, opacity)),
                zIndex,
                filter: `blur(${Math.max(0, blur)}px)`,
              }}
            >
              {/* 卡片内容 */}
              <div className={`
                w-full h-full p-8 md:p-12 rounded-[2rem] shadow-2xl backdrop-blur-xl 
                transition-all duration-700 ease-out border
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
                    {card.quote.content}
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
        })}
      </div>
      

    </div>
  );
}; 