import Image from "next/image";
import BrainNetworkImage from "./BrainNetworkImage";
import SectionFooter from "./SectionFooter";

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
}

export default function Section1Content({
  currentSection,
  scrollProgress,
}: Section1ContentProps) {
  return (
    <>
      <Image
        src="/images/section3-1.png"
        alt="Brain Circuit"
        fill
        className="absolute inset-0"
      />

      <SectionFooter
        isFirstSection
        currentSection={currentSection}
        sectionIndex={2}
        scrollProgress={scrollProgress}
      >
        <div className="flex flex-row gap-8 justify-between">
          <div className="text-[100px] font-[300] leading-[1.25] text-[#232323] font-helvetica w-[800px]">
            Agentic Intelligence building block
          </div>
        </div>
        <FooterContent />
      </SectionFooter>
    </>
  );
}
