"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { NewsItem } from "@/app/lib/notion";

function isAppInternalPath(href: string): boolean {
  const t = href.trim();
  return t.startsWith("/") && !t.startsWith("//");
}

type PatternType = "A" | "B" | "C";

const PATTERN_CYCLE: PatternType[] = ["A", "B", "C"];

function pickPattern(index: number): PatternType {
  return PATTERN_CYCLE[index % 3]!;
}

function renderPattern(pattern: PatternType) {
  if (pattern === "A") {
    return (
      <g opacity="0.4">
        <line x1="20" y1="20" x2="180" y2="20" stroke="#0047BB" strokeWidth="1" />
        <line x1="20" y1="40" x2="180" y2="40" stroke="#0047BB" strokeWidth="1" />
        <line x1="20" y1="60" x2="180" y2="60" stroke="#0047BB" strokeWidth="1" />
        <line x1="20" y1="80" x2="180" y2="80" stroke="#0047BB" strokeWidth="1" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#0047BB" strokeWidth="1" />
        <line x1="20" y1="20" x2="20" y2="100" stroke="#0047BB" strokeWidth="1" />
        <line x1="60" y1="20" x2="60" y2="100" stroke="#0047BB" strokeWidth="1" />
        <line x1="100" y1="20" x2="100" y2="100" stroke="#0047BB" strokeWidth="1" />
        <line x1="140" y1="20" x2="140" y2="100" stroke="#0047BB" strokeWidth="1" />
        <line x1="180" y1="20" x2="180" y2="100" stroke="#0047BB" strokeWidth="1" />
        <circle cx="60" cy="40" r="3" fill="#0047BB" />
        <circle cx="100" cy="60" r="3" fill="#0047BB" />
        <circle cx="140" cy="80" r="3" fill="#0047BB" />
        <circle cx="60" cy="80" r="2" fill="#0047BB" />
        <circle cx="140" cy="40" r="2" fill="#0047BB" />
        <line x1="60" y1="40" x2="100" y2="60" stroke="#0047BB" strokeWidth="1" />
        <line x1="100" y1="60" x2="140" y2="80" stroke="#0047BB" strokeWidth="1" />
        <line x1="60" y1="80" x2="100" y2="60" stroke="#0047BB" strokeWidth="1" />
        <line x1="140" y1="40" x2="100" y2="60" stroke="#0047BB" strokeWidth="1" />
      </g>
    );
  }

  if (pattern === "B") {
    return (
      <g opacity="0.4">
        <path
          d="M20 100 Q50 20, 100 60 T180 40"
          fill="none"
          stroke="#0047BB"
          strokeWidth="1.5"
        />
        <path
          d="M20 80 Q60 30, 110 70 T180 60"
          fill="none"
          stroke="#0047BB"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M20 60 Q70 40, 120 80 T180 80"
          fill="none"
          stroke="#0047BB"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <circle cx="50" cy="35" r="3" fill="#0047BB" />
        <circle cx="100" cy="60" r="4" fill="#0047BB" />
        <circle cx="140" cy="50" r="3" fill="#0047BB" />
        <circle cx="180" cy="40" r="2" fill="#0047BB" />
        <circle cx="110" cy="70" r="2" fill="#0047BB" />
        <circle cx="70" cy="50" r="2" fill="#0047BB" />
        <ellipse
          cx="100"
          cy="60"
          rx="40"
          ry="25"
          fill="none"
          stroke="#0047BB"
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity="0.3"
        />
      </g>
    );
  }

  return (
    <g opacity="0.4">
      <line x1="20" y1="30" x2="180" y2="30" stroke="#0047BB" strokeWidth="1" />
      <line x1="20" y1="60" x2="180" y2="60" stroke="#0047BB" strokeWidth="1" />
      <line x1="20" y1="90" x2="180" y2="90" stroke="#0047BB" strokeWidth="1" />
      <line x1="40" y1="20" x2="40" y2="100" stroke="#0047BB" strokeWidth="1" />
      <line x1="80" y1="20" x2="80" y2="100" stroke="#0047BB" strokeWidth="1" />
      <line x1="120" y1="20" x2="120" y2="100" stroke="#0047BB" strokeWidth="1" />
      <line x1="160" y1="20" x2="160" y2="100" stroke="#0047BB" strokeWidth="1" />
      <rect x="45" y="35" width="30" height="20" fill="none" stroke="#0047BB" strokeWidth="1" />
      <rect x="85" y="45" width="30" height="20" fill="none" stroke="#0047BB" strokeWidth="1" />
      <rect x="125" y="55" width="30" height="20" fill="none" stroke="#0047BB" strokeWidth="1" />
      <line x1="75" y1="45" x2="85" y2="45" stroke="#0047BB" strokeWidth="1" />
      <line x1="115" y1="55" x2="125" y2="55" stroke="#0047BB" strokeWidth="1" />
      <circle cx="60" cy="45" r="2" fill="#0047BB" />
      <circle cx="100" cy="55" r="2" fill="#0047BB" />
      <circle cx="140" cy="65" r="2" fill="#0047BB" />
      <circle cx="160" cy="30" r="2" fill="#0047BB" />
      <circle cx="40" cy="90" r="2" fill="#0047BB" />
    </g>
  );
}

function NewsCard({ item, pattern }: { item: NewsItem; pattern: PatternType }) {
  const readHref = item.link?.trim() || "#";
  const isInternal = isAppInternalPath(readHref);
  const isHttpExternal =
    readHref.startsWith("http://") || readHref.startsWith("https://");

  const readMoreClassName =
    "group/link mt-auto inline-flex items-center text-xs font-semibold uppercase tracking-wider text-[#0047BB]";
  const readMoreChevron = (
    <svg
      className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover/link:translate-x-1"
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
  );

  return (
    <article className="group flex h-full flex-col border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0047BB]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#0047BB]/20 to-[#0047BB]/5">
        {item.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <svg
            className="absolute inset-0 h-full w-full transform p-8 transition-transform duration-500 group-hover:scale-[1.03]"
            viewBox="0 0 200 120"
            fill="none"
          >
            {renderPattern(pattern)}
          </svg>
        )}
        <div className="absolute inset-0 bg-[#0047BB]/0 transition-colors duration-300 group-hover:bg-[#0047BB]/5" />
      </div>

      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-[#0047BB]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0047BB]">
            {item.category}
          </span>
          <span className="text-sm text-[#666666]">{item.date}</span>
        </div>

        <h3 className="mb-3 line-clamp-2 text-[20px] font-bold leading-tight text-[#1A1A1A]">
          {item.title}
        </h3>
        <p className="mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-[#666666]">
          {item.description}
        </p>

        {isInternal ? (
          <Link href={readHref} className={readMoreClassName}>
            READ MORE
            {readMoreChevron}
          </Link>
        ) : (
          <a
            href={readHref}
            {...(isHttpExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={readMoreClassName}
          >
            READ MORE
            {readMoreChevron}
          </a>
        )}
      </div>
    </article>
  );
}

const filterBtnActive =
  "rounded-full bg-[#0047BB] px-5 py-2 text-sm font-semibold text-white";
const filterBtnInactive =
  "rounded-full border border-gray-200 bg-white px-5 py-2 text-sm text-[#666666]";

export default function NewsList({ items }: { items: NewsItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const usedCategories = useMemo(
    () =>
      Array.from(new Set(items.map((item) => item.category).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [items],
  );

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-8 pb-12 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={selectedCategory === "All" ? filterBtnActive : filterBtnInactive}
          >
            All
          </button>
          {usedCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? filterBtnActive : filterBtnInactive}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-8 pb-16 lg:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <NewsCard key={item.id} item={item} pattern={pickPattern(index)} />
          ))}
        </div>
        {filteredItems.length === 0 ? (
          <p className="py-16 text-center text-[#666666]">No news in this category.</p>
        ) : null}
      </section>
    </>
  );
}
