"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * 대학원생 모집 첫 방문 팝업
 * - 첫 방문 시 화면 가운데 자동 표시
 * - 닫으면(X · 바깥 클릭 · Esc) 브라우저에 기록되어 다시 자동으로 뜨지 않음
 * - 닫은 뒤엔 우측 하단 작은 버튼으로 다시 열 수 있음
 * - '자세히 보기'는 Contact 모집 섹션(/contact#join)으로 이동
 *
 * 참고: 표시 여부 기록(localStorage)은 배포된 실제 사이트에서만 동작합니다.
 */

const STORAGE_KEY = "aeml_recruit_popup_dismissed";

export default function RecruitmentPopup() {
  const [mounted, setMounted] = useState(false); // 브라우저 렌더 이후에만 표시
  const [open, setOpen] = useState(false); // 팝업 열림 여부
  const [dismissed, setDismissed] = useState(true); // 이미 닫은 적 있는지
  const [animateIn, setAnimateIn] = useState(false); // 등장 애니메이션

  // 첫 방문 여부 확인
  useEffect(() => {
    setMounted(true);
    let already = false;
    try {
      already = localStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      already = false;
    }
    setDismissed(already);
    if (!already) {
      const timer = setTimeout(() => setOpen(true), 600); // 살짝 지연 후 등장
      return () => clearTimeout(timer);
    }
  }, []);

  // 열렸을 때: 등장 애니메이션 + 배경 스크롤 잠금 + Esc로 닫기
  useEffect(() => {
    if (!open) {
      setAnimateIn(false);
      return;
    }
    const raf = requestAnimationFrame(() => setAnimateIn(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleClose() {
    setOpen(false);
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // 저장 실패해도 무시 (팝업은 닫힘)
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* 최소화 상태: 우측 하단 다시 열기 버튼 */}
      {!open && dismissed && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="대학원생 모집 안내 다시 보기"
          className="fixed bottom-6 right-6 z-[90] inline-flex items-center gap-2 bg-[#0047BB] px-4 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(0,71,187,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#003B99]"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[#FEF3C7]" aria-hidden="true" />
          대학원생 모집
        </button>
      )}

      {/* 팝업 (모달) */}
      {open && (
        <div
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="대학원생 모집 안내"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300 ${
            animateIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-md border border-[#E5E5E5] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 lg:p-10 ${
              animateIn ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="닫기"
              className="absolute right-4 top-3 text-2xl leading-none text-[#999999] transition-colors hover:text-[#1A1A1A]"
            >
              ×
            </button>

            {/* 배지 */}
            <span className="mb-4 inline-flex items-center rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#92400E]">
              상시 모집 · Always Open
            </span>

            {/* 제목 */}
            <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-[#1A1A1A]">
              대학원생 모집
            </h2>

            {/* 본문 */}
            <p className="mb-1 text-base leading-relaxed text-[#666666]">
              AEML에서 함께 연구할 석사·박사 대학원생을 상시 모집합니다.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-[#999999]">
              We&apos;re recruiting graduate students (MS · PhD).
            </p>

            {/* 연구 분야 요약 */}
            <ul className="mb-8 space-y-1.5 text-sm leading-relaxed text-[#666666]">
              <li className="flex gap-2">
                <span className="text-[#0047BB]">•</span>
                <span>차세대 리튬전지 소재</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#0047BB]">•</span>
                <span>2차원(2D) 소재 용액 공정·박막 코팅</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#0047BB]">•</span>
                <span>전기화학 기반 에너지 변환</span>
              </li>
            </ul>

            {/* 버튼 */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact#join"
                onClick={handleClose}
                className="inline-flex items-center justify-center bg-[#0047BB] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#003B99]"
              >
                자세히 보기
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center justify-center border border-[#E5E5E5] px-6 py-3 text-sm font-semibold tracking-wide text-[#666666] transition-colors hover:border-[#0047BB] hover:text-[#0047BB]"
              >
                나중에
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
