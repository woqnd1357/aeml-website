import Link from "next/link";

/**
 * Hero Section 컴포넌트
 * - 메인 페이지 상단의 영웅 영역
 * - 좌측: 텍스트 콘텐츠 (라벨, 제목, 부제, 슬로건, CTA 버튼 2개)
 * - 우측: 배터리 SVG 그래픽 (떠다니는 애니메이션)
 */
export default function HeroSection() {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between relative z-10 min-h-[90vh] pb-12">

      {/* 좌측: 텍스트 콘텐츠 */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center pt-12 lg:pt-0 pr-0 lg:pr-12">

        {/* AEML 작은 라벨 */}
        <div className="opacity-0-init animate-fade-in-up">
          <span className="inline-block text-[#0047BB] font-bold tracking-[0.25em] text-sm mb-6 uppercase">
            AEML
          </span>
        </div>

        {/* 메인 제목 */}
        <h1 className="opacity-0-init animate-fade-in-up delay-100 text-5xl md:text-6xl lg:text-[72px] font-extrabold text-[#1A1A1A] leading-[1.05] tracking-tight mb-6">
          Advanced Energy<br />
          Materials Laboratory
        </h1>

        {/* 부제 (소속) */}
        <h2 className="opacity-0-init animate-fade-in-up delay-200 text-xl lg:text-2xl text-[#666666] font-normal mb-8 max-w-[90%] leading-relaxed">
          Department of Materials Science and Engineering,<br className="hidden sm:block" />
          Hongik University
        </h2>

        {/* 슬로건 (좌측 파란 보더) */}
        <div className="opacity-0-init animate-fade-in-up delay-300 w-full mb-12">
          <div className="border-l-4 border-[#0047BB]/20 pl-6 py-2">
            <p className="text-lg lg:text-xl text-[#1A1A1A] font-medium leading-snug max-w-[85%]">
              Engineering advanced materials for next-generation energy storage
            </p>
          </div>
        </div>

        {/* CTA 버튼 2개 */}
        <div className="opacity-0-init animate-fade-in-up delay-400 flex flex-wrap gap-5 w-full">
          <Link
            href="/research"
            className="inline-flex items-center justify-center bg-[#0047BB] text-white px-8 py-4 text-[15px] font-semibold tracking-wide hover:bg-[#003B99] transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,71,187,0.39)] hover:shadow-[0_6px_20px_rgba(0,71,187,0.23)] hover:-translate-y-0.5"
          >
            Explore Research
          </Link>
          <Link
            href="/members"
            className="inline-flex items-center justify-center bg-transparent border-2 border-[#0047BB]/20 text-[#0047BB] px-8 py-4 text-[15px] font-semibold tracking-wide hover:border-[#0047BB] hover:bg-[#0047BB]/5 transition-all duration-300"
          >
            Meet the Team
          </Link>
        </div>
      </div>

      {/* 우측: 배터리 SVG 그래픽 */}
      <div className="w-full lg:w-[40%] h-[300px] lg:h-[500px] relative flex items-center justify-center mt-16 lg:mt-0 opacity-0-init animate-fade-in-up delay-500 pointer-events-none">
        <svg
          viewBox="0 0 400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-[320px] lg:max-w-[400px]"
        >
          <defs>
            {/* 배터리 안쪽 충전 그라데이션 */}
            <linearGradient id="batteryFill" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0047BB" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#66A3FF" stopOpacity="0.6" />
            </linearGradient>

            {/* 배터리 외관 그라데이션 */}
            <linearGradient id="batteryBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F8F9FA" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F8F9FA" />
            </linearGradient>

            {/* 그림자 필터 */}
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="15" />
              <feOffset dx="0" dy="20" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.15" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* 글로우 효과 */}
            <radialGradient id="batteryGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0047BB" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0047BB" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 배터리 아래 글로우 */}
          <ellipse
            cx="200"
            cy="420"
            rx="120"
            ry="30"
            fill="url(#batteryGlow)"
            className="animate-pulse-glow"
          />

          {/* 배터리 본체 (떠다니는 애니메이션 적용) */}
          <g className="animate-float-battery">
            {/* 상단 캡 (양극 단자) */}
            <rect x="155" y="30" width="90" height="25" rx="5" fill="#0047BB" />
            <rect x="140" y="50" width="120" height="40" rx="8" fill="#0047BB" />

            {/* 본체 (외관) */}
            <rect
              x="130"
              y="80"
              width="140"
              height="320"
              rx="16"
              fill="url(#batteryBodyGrad)"
              stroke="#0047BB"
              strokeWidth="2"
              filter="url(#softShadow)"
            />

            {/* 충전 게이지 (안쪽 파란 부분) */}
            <rect
              x="140"
              y="160"
              width="120"
              height="225"
              rx="10"
              fill="url(#batteryFill)"
            />

            {/* 충전 게이지 라인 */}
            <rect x="135" y="280" width="130" height="1" fill="#0047BB" fillOpacity="0.15" />
            <rect x="135" y="310" width="130" height="1" fill="#0047BB" fillOpacity="0.15" />
            <rect x="135" y="340" width="130" height="1" fill="#0047BB" fillOpacity="0.15" />
          </g>
        </svg>
      </div>
    </section>
  );
}