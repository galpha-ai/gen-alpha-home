import Image from "next/image";
import BrainNetworkImage from "./BrainNetworkImage";
import SectionFooter from "./SectionFooter";
import { useEffect, useState, useRef } from "react";

// 提取底部内容为独立组件
function FooterContent() {
  return (
    <div className="flex flex-row items-center  w-full justify-end">
      {/* 支持者信息 */}
      <div className="flex items-center text-[#232323] text-sm font-light uppercase tracking-wider border-b border-[#232323] border-width-[1.5px] min-w-[516px]">
        <span>Backed by</span>
        <Image
          src="/images/image-445.png"
          alt="Backer 1"
          width={38}
          height={21}
          className="h-auto"
        />
        <span>,</span>
        <div className="flex items-center mr-1 mt-[1px]">
          <Image
            src="/images/image-446.png"
            alt="Backer 2"
            width={70}
            height={10}
            className="h-auto"
          />
        </div>
        <span>and more</span>
        <span className="ml-8 flex-1 text-right">scroll down</span>
      </div>

      {/* 下箭头 */}
      <div className="flex items-center justify-center w-8 h-8">
        <svg
          width="8"
          height="19"
          viewBox="0 0 8 19"
          fill="none"
          className="text-[#232323]"
        >
          <path
            d="M3.646 18.354a.5.5 0 00.708 0l3.182-3.182a.5.5 0 00-.708-.708L4 17.293l-2.828-2.829a.5.5 0 10-.708.708l3.182 3.182zM3.5 0v18h1V0h-1z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

interface Section1ContentProps {
  currentSection: number;
  scrollProgress: number;
  onScrollControl?: (disabled: boolean) => void;
}

export default function Section1Content({
  currentSection,
  scrollProgress,
  onScrollControl,
}: Section1ContentProps) {
  const [showSecondText, setShowSecondText] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // 调试信息
    console.log('Current section:', currentSection);
    console.log('Scroll progress:', scrollProgress);
    console.log('Has triggered:', hasTriggeredRef.current);
    console.log('Show second text:', showSecondText);

    const handleSectionChange = () => {
      if (currentSection === 3 && scrollProgress >= 1 && !hasTriggeredRef.current) {
        console.log('Triggering text change sequence');
        hasTriggeredRef.current = true;
        
        // 禁用滚动
        if (onScrollControl) {
          onScrollControl(true);
        }
        document.body.style.overflow = 'hidden';

        // 5秒后切换文本
        setTimeout(() => {
          console.log('Switching to second text');
          setShowSecondText(true);
          
          // 恢复滚动
          if (onScrollControl) {
            onScrollControl(false);
          }
          document.body.style.overflow = '';
        }, 3000);
      }
    };

    handleSectionChange();

    // 重置逻辑
    if (currentSection !== 3) {
      console.log('Resetting section state');
      hasTriggeredRef.current = false;
      setShowSecondText(false);
      if (onScrollControl) {
        onScrollControl(false);
      }
      document.body.style.overflow = '';
    }
  }, [currentSection, scrollProgress, onScrollControl]);

  return (
    <>
      <div className="relative w-full h-screen flex flex-row">
        <div className="relative w-[80vmin] h-[80vmin] mt-[15vmin] ml-[-10vmin]">
          <Image
            src="/images/section4-1.png"
            alt="thinker"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative w-[60vmin] h-[60vmin] mt-[13vmin] ml-[-6vmin]">
          <Image
            src="/images/section4-2.png"
            alt="particle"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <SectionFooter
        isFirstSection
        currentSection={currentSection}
        sectionIndex={3}
        scrollProgress={scrollProgress}
      >
        <div className="flex flex-col gap-5 text-right items-end mb-8 relative min-h-[400px]">
          <div className="text-[22px] font-[300] leading-[1.24] text-[#232323] max-w-[716px] mt-[12px] mb-4">
            Use AI to build Algo to trade
          </div>
          
          <div className="relative h-[300px] w-[800px]">
            {/* 第一个文本 */}
            <div 
              className={`text-[80px] font-[300] leading-[1.25] text-[#232323] font-helvetica w-full transition-all duration-[2000ms] ease-in-out absolute top-0 left-0 ${
                !showSecondText ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16 pointer-events-none'
              }`}
            >
              Our AI is writing algorithm trading $1 Trillion per year
            </div>
            
            {/* 第二个文本 */}
            <div 
              className={`text-[80px] w-[750px] font-[300] leading-[1.25] ml-[50px] text-[#232323] font-helvetica transition-all duration-[2000ms] ease-in-out absolute top-0 left-0 ${
                showSecondText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
              }`}
            >
              Building exchanges for new and proven assets in AI age
            </div>
          </div>
        </div>
        <FooterContent />
      </SectionFooter>
    </>
  );
}
