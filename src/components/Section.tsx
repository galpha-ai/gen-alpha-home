import { useEffect, useRef, useState } from 'react';

interface SectionProps {
  children: React.ReactNode;
  index: number;
  currentSection: number;
  progress: number;
  isLastSection: boolean;
}

export default function Section({ children, index, currentSection, progress, isLastSection }: SectionProps) {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    // 如果是最后一个section且当前在显示它，直接设置为完全不透明并返回
    if (isLastSection && index === currentSection) {
      setOpacity(1);
      return;
    }

    // 如果是最后一个section但不是当前section，保持完全透明
    if (isLastSection) {
      setOpacity(0);
      return;
    }

    // 非最后section的淡入淡出逻辑
    if (index === currentSection) {
      // 在前70%保持完全不透明
      if (progress < 0.7) {
        setOpacity(1);
      } else {
        // 在最后30%淡出
        const fadeOutProgress = (progress - 0.7) / 0.3;
        setOpacity(1 - fadeOutProgress);
      }
    } else if (index === currentSection + 1) {
      // 下一个section的淡入逻辑
      if (progress < 0.7) {
        setOpacity(0);
      } else {
        const fadeInProgress = (progress - 0.7) / 0.3;
        setOpacity(fadeInProgress);
      }
    } else {
      setOpacity(0);
    }
  }, [currentSection, index, progress, isLastSection]);

  // 如果不是当前section或下一个section，不渲染以提高性能
  if (index !== currentSection && index !== currentSection + 1) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center"
      style={{
        opacity,
        transition: isLastSection ? 'none' : 'opacity 100ms ease-out',
        pointerEvents: index === currentSection ? 'auto' : 'none',
      }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-[60px]">
        {children}
      </div>
    </div>
  );
} 