"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Section from "@/components/Section";
import SectionFooter from "@/components/SectionFooter";
import Section1Content from "@/components/Section1Content";
import Image from "next/image";
import Section2Content from "@/components/Section2Content";
import Section3Content from "@/components/Section3Content";
import Section4Content from "@/components/Section4Content";

// 提取底部内容为独立组件
function FooterContent() {
  return (
    <div className="flex flex-row items-center gap-8 w-full ">
      {/* 支持者信息 */}
      <div className="flex items-center gap-8 text-[#232323] text-sm font-light uppercase tracking-wider">
        <span>Backed by</span>
        <Image
          src="/images/image-445.png"
          alt="Backer 1"
          width={38}
          height={21}
          className="h-auto"
        />
        <span>,</span>
        <div className="flex items-center gap-4">
          <Image
            src="/images/image-446.png"
            alt="Backer 2"
            width={70}
            height={10}
            className="h-auto"
          />
          <Image
            src="/images/image-447.png"
            alt="Backer 3"
            width={18}
            height={10}
            className="h-auto"
          />
        </div>
        <span>and more</span>
        <span className="ml-8">scroll down</span>
      </div>

      {/* 分隔线 */}
      <div className="w-full max-w-[516px] h-px bg-[#232323]"></div>

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

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [bgColor, setBgColor] = useState("#F3F3F3");

  useEffect(() => {
    // 强制从顶部开始
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const virtualSectionHeight = windowHeight * 4;
      const totalHeight = virtualSectionHeight * 5;

      // 计算当前section和进度
      const currentSection = Math.min(
        Math.floor(scrollTop / virtualSectionHeight),
        4
      );
      const sectionScrollTop = scrollTop % virtualSectionHeight;
      const progress = Math.min(sectionScrollTop / virtualSectionHeight, 1);

      // 计算背景色过渡
      // 在第一个section结束到第二个section开始时进行过渡
      if (currentSection === 0 && progress > 0.7) {
        // 从0.7到1.0的进度映射到0到1的过渡进度
        const transitionProgress = (progress - 0.7) / 0.3;
        const r = Math.round(243 + (255 - 243) * transitionProgress);
        const g = Math.round(243 + (255 - 243) * transitionProgress);
        const b = Math.round(243 + (255 - 243) * transitionProgress);
        setBgColor(`rgb(${r}, ${g}, ${b})`);
      } else if (currentSection === 0) {
        setBgColor("#F3F3F3");
      } else {
        setBgColor("#FFFFFF");
      }

      // 计算总进度（0-100）
      const totalProgress = Math.min(
        (scrollTop / (totalHeight - windowHeight)) * 100,
        100
      );

      setScrollProgress(totalProgress);
      setCurrentSection(currentSection);
      setSectionProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className="min-h-screen relative"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.2s ease-out",
      }}
    >
      <Header scrollProgress={scrollProgress} />

      {/* 使用固定定位，所有sections都在同一位置 */}
      <div className="fixed inset-0 w-full h-screen">
        {/* Section 1: Hero */}
        <Section
          index={0}
          currentSection={currentSection}
          progress={sectionProgress}
          isLastSection={false}
        >
          <Section1Content
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          />
        </Section>
        <Section
          index={1}
          currentSection={currentSection}
          progress={sectionProgress}
          isLastSection={false}
        >
          <Section2Content
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          />
        </Section>
        <Section
          index={2}
          currentSection={currentSection}
          progress={sectionProgress}
          isLastSection={false}
        >
          <Section3Content
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          />
        </Section>
        <Section
          index={3}
          currentSection={currentSection}
          progress={sectionProgress}
          isLastSection={false}
        >
          <Section4Content
            currentSection={currentSection}
            scrollProgress={scrollProgress}
          />
        </Section>

        {/* Section 2-5: 示例section */}
        {[4].map((index) => (
          <Section
            key={index}
            index={index}
            currentSection={currentSection}
            progress={sectionProgress}
            isLastSection={index === 4}
          >
            <div className="text-4xl font-light">Section {index + 1}</div>
            <SectionFooter
              currentSection={currentSection}
              sectionIndex={index}
              scrollProgress={scrollProgress}
            >
              <>
                <div className="flex flex-col gap-8">
                  <div className="text-[100px] font-[300] leading-[1.25] text-[#232323] font-helvetica w-[740px]">
                    Data as raw asset for AI age
                  </div>
                  <div className="text-2xl font-light leading-[1.24] text-[#232323] max-w-[700px] mt-8">
                    Incentivizing valuable Data to be accessible to intelligence
                  </div>
                </div>
                <FooterContent />
              </>
            </SectionFooter>
          </Section>
        ))}
      </div>

      {/* 创建一个隐藏的容器来保持滚动条高度，每个section高度为4个视口高度 */}
      <div className="w-full" style={{ height: `${100 * 5 * 4}vh` }}></div>
    </main>
  );
}
