import { useState, useEffect, useRef } from 'react';
import { SwipeDirection } from '../types';

interface UseSwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export const useSwipe = ({ onSwipeLeft, onSwipeRight, threshold = 100 }: UseSwipeProps) => {
  const [swipeState, setSwipeState] = useState<SwipeDirection>({ direction: null, distance: 0 });
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);
  const isVerticalSwipe = useRef<boolean>(false);

  const handleTouchStart = (e: Event) => {
    const touchEvent = e as TouchEvent;
    touchStartX.current = touchEvent.targetTouches[0].clientX;
    touchStartY.current = touchEvent.targetTouches[0].clientY;
    isSwiping.current = true;
    isVerticalSwipe.current = false;
  };

  const handleTouchMove = (e: Event) => {
    const touchEvent = e as TouchEvent;
    if (!isSwiping.current) return;
    
    touchEndX.current = touchEvent.targetTouches[0].clientX;
    touchEndY.current = touchEvent.targetTouches[0].clientY;
    
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = Math.abs(touchStartY.current - touchEndY.current);
    
    // 如果垂直滑动距离大于水平滑动距离，认为是垂直滑动
    if (deltaY > Math.abs(deltaX) && deltaY > 20) {
      isVerticalSwipe.current = true;
      return;
    }
    
    // 只处理水平滑动
    if (!isVerticalSwipe.current) {
      const direction = deltaX > 0 ? 'left' : 'right';
      setSwipeState({ direction, distance: Math.abs(deltaX) });
      
      // 阻止页面滚动
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current || isVerticalSwipe.current) {
      setSwipeState({ direction: null, distance: 0 });
      isSwiping.current = false;
      return;
    }
    
    const deltaX = touchStartX.current - touchEndX.current;
    const isLeftSwipe = deltaX > threshold;
    const isRightSwipe = deltaX < -threshold;

    // 添加动量效果：如果滑动速度足够快，降低阈值
    const timeDelta = Date.now() - (touchStartX.current as any);
    const velocity = Math.abs(deltaX) / (timeDelta || 1);
    const dynamicThreshold = velocity > 0.5 ? threshold * 0.6 : threshold;

    if (Math.abs(deltaX) > dynamicThreshold) {
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }
    }

    setSwipeState({ direction: null, distance: 0 });
    isSwiping.current = false;
  };

  useEffect(() => {
    // 为了获得更好的性能，只在主内容区域添加触摸事件
    const mainContent = document.querySelector('[data-swipe-area]');
    if (!mainContent) return;

    mainContent.addEventListener('touchstart', handleTouchStart, { passive: true });
    mainContent.addEventListener('touchmove', handleTouchMove, { passive: false });
    mainContent.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      mainContent.removeEventListener('touchstart', handleTouchStart);
      mainContent.removeEventListener('touchmove', handleTouchMove);
      mainContent.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSwipeLeft, onSwipeRight]);

  return swipeState;
}; 