import Image from 'next/image';
import { useEffect, useState, ReactNode } from 'react';

interface SectionFooterProps {
  isFirstSection?: boolean;
  currentSection: number;
  sectionIndex: number;
  scrollProgress: number;
  children: ReactNode;
}

export default function SectionFooter({
  isFirstSection = false,
  currentSection,
  sectionIndex,
  scrollProgress,
  children
}: SectionFooterProps) {
  const [opacity, setOpacity] = useState(isFirstSection ? 1 : 0);
  const [translateY, setTranslateY] = useState(isFirstSection ? 0 : 50);

  useEffect(() => {
    // 计算当前section的滚动进度
    const sectionProgress = scrollProgress % 100;
    
    if (sectionIndex === currentSection) {
      // 当前section正在查看
      if (sectionProgress > 70) {
        // 开始加速淡出
        const fadeOutProgress = (sectionProgress - 70) * (1 / 30); // 在最后30%进行淡出
        setOpacity(1 - fadeOutProgress);
        setTranslateY(-50 * fadeOutProgress);
      } else {
        // 正常显示
        setOpacity(1);
        setTranslateY(0);
      }
    } else if (sectionIndex === currentSection + 1) {
      // 下一个section
      if (sectionProgress > 70) {
        // 开始加速淡入
        const fadeInProgress = (sectionProgress - 70) * (1 / 30); // 在最后30%进行淡入
        setOpacity(fadeInProgress);
        setTranslateY(50 * (1 - fadeInProgress));
      } else {
        // 保持隐藏
        setOpacity(0);
        setTranslateY(50);
      }
    } else {
      // 其他section保持隐藏
      setOpacity(0);
      setTranslateY(50);
    }
  }, [currentSection, sectionIndex, scrollProgress, isFirstSection]);

  return (
    <div 
      className="absolute left-[60px] right-[60px] transition-all duration-300"
      style={{ 
        bottom: isFirstSection ? '2rem' : '4rem',
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      <div className="max-w-[1920px] mx-auto">
        {children}
      </div>
    </div>
  );
} 