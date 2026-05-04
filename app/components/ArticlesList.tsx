"use client";

// Status filters follow Status values from the Notion database automatically.
// To add a new Status option: Notion DB > Status property > add option.
// Examples: "Published", "Under Review", "Under Peer-Review", "In Preparation", etc.

import Link from "next/link";
import { useState } from "react";

import type { JournalArticle } from "@/app/lib/notion";

function isAppInternalPath(href: string): boolean {
  const t = href.trim();
  return t.startsWith("/") && !t.startsWith("//");
}

const STATUS_ORDER = ["Published", "Under Peer-Review", "Under Review"];

function sortStatuses(statuses: string[]): string[] {
  return [...statuses].sort((a, b) => {
    const ia = STATUS_ORDER.indexOf(a);
    const ib = STATUS_ORDER.indexOf(b);
    const ra = ia === -1 ? 99 : ia;
    const rb = ib === -1 ? 99 : ib;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-[#0047BB] text-white"
          : "border border-gray-200 bg-white text-[#666666] hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function doiHref(doi: string | null): string | null {
  const t = doi?.trim();
  if (!t || t === "#") return null;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  return `https://doi.org/${t.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}`;
}

function ArticleCard({ article }: { article: JournalArticle }) {
  const doiLink = doiHref(article.doi);
  const pdfRaw = article.pdfUrl?.trim();
  const pdfIsInternal = pdfRaw ? isAppInternalPath(pdfRaw) : false;

  return (
    <article className="group -mx-4 flex flex-col gap-4 rounded-xl border-b border-gray-100 px-4 py-8 transition-colors duration-200 hover:bg-[#0047BB]/5 sm:-mx-6 sm:flex-row sm:gap-8 sm:px-6">
      <div className="w-[100px] shrink-0">
        <div className="text-2xl font-bold text-[#1A1A1A] lg:text-3xl">{article.year}</div>
        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#0047BB]">
          {article.type}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="mb-2 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#0047BB] lg:text-xl">
          {article.title}
        </h3>

        <p className="mb-1 text-sm text-[#666666]">
          {article.authors.map((author, index) => (
            <span key={`${article.id}-author-${index}`}>
              <span className="font-medium text-[#1A1A1A]">{author}</span>
              {index < article.authors.length - 1 ? ", " : null}
            </span>
          ))}
        </p>

        <p className="text-sm text-[#666666]">
          <span className="italic">{article.journal}</span>
          {article.year ? `, ${article.year}` : ""}
          {article.volume ? `, ${article.volume}` : ""}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {doiLink ? (
            <a
              href={doiLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#0047BB] transition-colors hover:text-[#003B99]"
            >
              DOI
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          ) : null}
          {pdfRaw ? (
            pdfIsInternal ? (
              <Link
                href={pdfRaw}
                className="text-xs font-semibold uppercase tracking-wider text-[#0047BB] transition-colors hover:text-[#003B99]"
              >
                PDF
              </Link>
            ) : (
              <a
                href={pdfRaw}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-wider text-[#0047BB] transition-colors hover:text-[#003B99]"
              >
                PDF
              </a>
            )
          ) : null}
          {article.featured ? (
            <span className="rounded bg-[#0047BB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              FEATURED
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ArticlesList({ articles }: { articles: JournalArticle[] }) {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All Years");

  const currentYear = new Date().getFullYear();

  const usedStatuses = sortStatuses(
    Array.from(new Set(articles.map((a) => a.status).filter(Boolean))),
  );

  const usedYears = Array.from(
    new Set(articles.map((a) => a.year).filter((y) => y > 0)),
  ).sort((a, b) => b - a);

  const recentYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];
  const yearFilters = recentYears.filter((y) => usedYears.includes(y));
  const hasEarlier = usedYears.some((y) => y < currentYear - 3);

  const filteredArticles = [...articles.filter((article) => {
    if (selectedStatus !== "All" && article.status !== selectedStatus) {
      return false;
    }
    if (selectedYear !== "All Years") {
      if (selectedYear === "Earlier") {
        if (article.year >= currentYear - 3) return false;
      } else if (article.year !== Number(selectedYear)) {
        return false;
      }
    }
    return true;
  })].sort((a, b) => {
    if ((b.year || 0) !== (a.year || 0)) return (b.year || 0) - (a.year || 0);
    return (b.order || 0) - (a.order || 0);
  });

  return (
    <>
      <section className="mx-auto mb-12 w-full max-w-[1200px] px-8 lg:px-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterButton
              label="All"
              active={selectedStatus === "All"}
              onClick={() => setSelectedStatus("All")}
            />
            {usedStatuses.map((status) => (
              <FilterButton
                key={status}
                label={status}
                active={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <FilterButton
              label="All Years"
              active={selectedYear === "All Years"}
              onClick={() => setSelectedYear("All Years")}
            />
            {yearFilters.map((year) => (
              <FilterButton
                key={year}
                label={String(year)}
                active={selectedYear === String(year)}
                onClick={() => setSelectedYear(String(year))}
              />
            ))}
            {hasEarlier ? (
              <FilterButton
                label="Earlier"
                active={selectedYear === "Earlier"}
                onClick={() => setSelectedYear("Earlier")}
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
        <div className="flex flex-col">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          {filteredArticles.length === 0 ? (
            <p className="py-16 text-center text-[#666666]">No articles match the selected filters.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
