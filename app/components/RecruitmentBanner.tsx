import Link from "next/link";

/**
 * 대학원생 모집 상단 배너
 * - 홈(Hero) 최상단에 표시되는 얇은 띠
 * - 클릭하면 Contact 페이지의 모집 섹션(/contact#join)으로 이동
 * - 사이트 브랜드 컬러(#0047BB) 사용, 항상 표시(닫기 없음)
 */
export default function RecruitmentBanner() {
  return (
    <Link
      href="/contact#join"
      aria-label="대학원생 모집 안내 보기"
      className="group block w-full bg-[#0047BB] text-white transition-colors duration-300 hover:bg-[#003B99]"
    >
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-3 gap-y-1 px-8 py-2.5 text-center lg:px-16">
        {/* 눈에 띄는 작은 배지 (Contact 섹션의 '상시 모집' 배지와 통일) */}
        <span className="inline-flex items-center rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#92400E]">
          모집중
        </span>

        {/* 안내 문구 */}
        <span className="text-sm font-semibold tracking-wide text-white">
          대학원생 상시 모집
          <span className="hidden text-white/80 sm:inline"> · Now recruiting graduate students</span>
        </span>

        {/* 자세히 보기 링크 */}
        <span className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-white/40 underline-offset-4 transition-colors group-hover:decoration-white">
          자세히 보기
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
