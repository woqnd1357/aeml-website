"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * AEML 네비게이션 컴포넌트
 * - 모든 페이지에서 공통 사용
 * - 데스크톱: 가로 메뉴 + 드롭다운
 * - 모바일: 햄버거 메뉴
 *
 * 메뉴 구조:
 * - Member ▾
 *   - Professor
 *   - Students
 * - Research
 * - Publications ▾
 *   - Journal Articles
 *   - Patents
 * - News
 * - Contact
 *
 * logoUrl: from Notion Logo DB ("AEML Logo - Main"); null keeps SVG + text fallback.
 */
export default function Navigation({ logoUrl }: { logoUrl: string | null }) {
  // 모바일 메뉴 열림/닫힘 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 데스크톱에서 열려있는 드롭다운 (member 또는 publications)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">

          {/* 좌측: AEML 로고 */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {logoUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
              <img
                src={logoUrl}
                alt="AEML Logo"
                fetchPriority="high"
                decoding="async"
                className="h-8 w-auto max-h-8 object-contain object-center"
              />
            ) : (
              <>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-500 group-hover:rotate-180"
                >
                  <rect x="0" y="0" width="14" height="14" fill="#0047BB" />
                  <rect x="18" y="0" width="14" height="14" fill="#0047BB" opacity="0.7" />
                  <rect x="0" y="18" width="14" height="14" fill="#0047BB" opacity="0.5" />
                  <rect x="18" y="18" width="14" height="14" fill="#0047BB" opacity="0.3" />
                </svg>
                <span className="font-bold text-lg tracking-[0.2em] text-[#1A1A1A] mt-1">
                  AEML
                </span>
              </>
            )}
          </Link>

          {/* 데스크톱 메뉴 */}
          <ul className="hidden lg:flex items-center gap-10">

            {/* Member 드롭다운 */}
            <li
              className="relative"
              onMouseEnter={() => setOpenDropdown("member")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors py-2">
                Member
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`transition-transform ${openDropdown === "member" ? "rotate-180" : ""}`}
                >
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* 드롭다운 메뉴 */}
              {openDropdown === "member" && (
                <div className="absolute top-full left-0 pt-2 min-w-[180px]">
                  <div className="bg-white border border-[#E5E5E5] shadow-lg py-2">
                    <Link
                      href="/professor"
                      className="block px-4 py-2 text-sm text-[#666666] hover:text-[#0047BB] hover:bg-[#FAFAFA] transition-colors"
                    >
                      Professor
                    </Link>
                    <Link
                      href="/members"
                      className="block px-4 py-2 text-sm text-[#666666] hover:text-[#0047BB] hover:bg-[#FAFAFA] transition-colors"
                    >
                      Students
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Research */}
            <li>
              <Link
                href="/research"
                className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors py-2"
              >
                Research
              </Link>
            </li>

            {/* Publications 드롭다운 */}
            <li
              className="relative"
              onMouseEnter={() => setOpenDropdown("publications")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors py-2">
                Publications
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={`transition-transform ${openDropdown === "publications" ? "rotate-180" : ""}`}
                >
                  <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* 드롭다운 메뉴 */}
              {openDropdown === "publications" && (
                <div className="absolute top-full left-0 pt-2 min-w-[200px]">
                  <div className="bg-white border border-[#E5E5E5] shadow-lg py-2">
                    <Link
                      href="/publications/articles"
                      className="block px-4 py-2 text-sm text-[#666666] hover:text-[#0047BB] hover:bg-[#FAFAFA] transition-colors"
                    >
                      Journal Articles
                    </Link>
                    <Link
                      href="/publications/patents"
                      className="block px-4 py-2 text-sm text-[#666666] hover:text-[#0047BB] hover:bg-[#FAFAFA] transition-colors"
                    >
                      Patents
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* News */}
            <li>
              <Link
                href="/news"
                className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors py-2"
              >
                News
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors py-2"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {isMobileMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-[#E5E5E5]">
            <ul className="flex flex-col gap-1 pt-4">
              <li className="px-2 py-2 text-xs uppercase tracking-wider text-[#0047BB] font-bold">Member</li>
              <li>
                <Link
                  href="/professor"
                  className="block px-6 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Professor
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="block px-6 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Students
                </Link>
              </li>

              <li>
                <Link
                  href="/research"
                  className="block px-2 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Research
                </Link>
              </li>

              <li className="px-2 py-2 text-xs uppercase tracking-wider text-[#0047BB] font-bold mt-2">Publications</li>
              <li>
                <Link
                  href="/publications/articles"
                  className="block px-6 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Journal Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/publications/patents"
                  className="block px-6 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Patents
                </Link>
              </li>

              <li>
                <Link
                  href="/news"
                  className="block px-2 py-2 text-sm text-[#666666] hover:text-[#0047BB] mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-2 py-2 text-sm text-[#666666] hover:text-[#0047BB]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}