import Image from 'next/image';

interface HeaderProps {
  scrollProgress: number;
}

export default function Header({ scrollProgress }: HeaderProps) {
  return (
    <div className="fixed top-[60px] left-0 w-full z-50 min-w-[1200px]">
      <div className="max-w-[1920px] mx-auto px-[126px]">
        {/* 进度条区域 */}
        <div className="h-[30px] relative">
          {/* 背景线条 */}
          <div className="w-full h-[1px] bg-[#D9D9D9]" />
          {/* 进度条 */}
          <div 
            className="absolute top-[-1px] left-0 h-[2px] bg-[#787878] transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* 导航区域 */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Image 
              src="/images/logo.png" 
              alt="GenAlpha Logo" 
              width={210} 
              height={38}
              priority
              quality={100}
            />
          </div>

          {/* 按钮组 */}
          <div className="flex gap-4">
            {/* Coming Soon 按钮 */}
            <div className="relative w-[129px] h-[35px] border border-[#393939] rounded-[17px] flex items-center">
              <div className="w-[7px] h-[7px] bg-[#393939] rounded-full ml-[13px]" />
              <span className="ml-[7px] font-inter font-normal text-[12px] leading-[29px] uppercase text-[#2A2A2A]">
                coming soon
              </span>
            </div>

            {/* Sound 按钮 */}
            <div className="w-[79px] ml-[16px] h-[35px] border border-[#393939] rounded-[17px] flex items-center justify-center">
              <span className="font-inter font-normal text-[12px] leading-[29px] uppercase text-[#2A2A2A]">
                sound
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 