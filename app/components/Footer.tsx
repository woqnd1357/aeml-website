/**
 * AEML Footer 컴포넌트
 * - 모든 페이지 하단 공통
 * - 저작권 연도 자동 처리
 *
 * logoUrl: Notion "AEML Logo - White" (dark footer); hongikLogoUrl: "Hongik University Logo".
 * Null imageUrl keeps SVG/text fallbacks.
 */
export default function Footer({
  logoUrl,
  hongikLogoUrl,
}: {
  logoUrl: string | null;
  hongikLogoUrl: string | null;
}) {
  // 현재 연도 자동 계산 (매년 자동 갱신)
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* 메인 영역 */}
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-2">
          {/* 좌측: 랩실 정보 */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              {logoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
                <img
                  src={logoUrl}
                  alt="AEML Logo"
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto max-h-8 max-w-none object-contain object-center"
                />
              ) : (
                <>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="0" y="0" width="14" height="14" fill="#0047BB" />
                    <rect x="18" y="0" width="14" height="14" fill="#0047BB" opacity="0.7" />
                    <rect x="0" y="18" width="14" height="14" fill="#0047BB" opacity="0.5" />
                    <rect x="18" y="18" width="14" height="14" fill="#0047BB" opacity="0.3" />
                  </svg>
                  <span className="text-lg font-bold tracking-[0.2em] text-white">AEML</span>
                </>
              )}
            </div>

            <h3 className="mb-2 text-xl font-semibold">Advanced Energy Materials Laboratory</h3>
            <p className="mb-6 text-sm text-white/60">
              Department of Materials Science and Engineering
              <br />
              Hongik University
            </p>

            <p className="border-l-2 border-[#0047BB] pl-4 text-sm italic text-white/80">
              Engineering advanced materials for next-generation energy storage
            </p>
          </div>

          {/* 우측: 연락처 */}
          <div className="lg:text-right">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
              Contact
            </h4>

            <div className="space-y-4 text-sm">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-white/60">Address</p>
                <p className="text-white/90">
                  Hongik University, Room K415
                  <br />
                  94 Wausan-ro, Mapo-gu
                  <br />
                  Seoul, 04066, Republic of Korea
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-white/60">Phone</p>
                <a
                  href="tel:+82-2-320-1623"
                  className="text-white/90 transition-colors hover:text-[#0047BB]"
                >
                  +82 2-320-1623
                </a>
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-wider text-white/60">Email</p>
                <a
                  href="mailto:dongwook@hongik.ac.kr"
                  className="text-white/90 transition-colors hover:text-[#0047BB]"
                >
                  dongwook@hongik.ac.kr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            {/* 좌측: 저작권 (자동 연도) */}
            <p className="text-xs text-white/50">
              © {currentYear} Advanced Energy Materials Laboratory. All rights reserved.
            </p>

            {/* 가운데: 홍익대 로고 placeholder */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                In Affiliation With
              </span>
              {hongikLogoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
                <img
                  src={hongikLogoUrl}
                  alt="Hongik University"
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto max-h-8 max-w-[140px] object-contain object-center"
                />
              ) : (
                <span className="border border-white/30 px-3 py-1.5 text-sm">
                  Hongik University
                </span>
              )}
            </div>

            {/* 우측: 맨 위로 */}
            <a
              href="#top"
              className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white"
            >
              Back to top
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M3 7L6 4L9 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
