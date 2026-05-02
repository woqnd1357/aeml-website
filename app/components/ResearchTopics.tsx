import Link from "next/link";

import type { ResearchTopic } from "@/app/lib/notion";

/**
 * Research Topics section below Hero on the home page.
 * Topics come from Notion (Featured only), passed as props from page.tsx.
 */

const STAGGER_DELAYS = ["delay-100", "delay-200", "delay-300"] as const;

function topicBlurb(topic: ResearchTopic): string {
  const short = topic.shortDescription?.trim();
  if (short) return short;
  const long = topic.longDescription?.trim();
  if (!long) return "";
  if (long.length <= 100) return long;
  return `${long.slice(0, 100)}...`;
}

export default function ResearchTopics({ topics }: { topics: ResearchTopic[] }) {
  if (topics.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#FAFAFA] py-32">
      <div className="mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* 섹션 헤더 */}
        <div className="mb-16 opacity-0-init animate-fade-in-up">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[0.25em] text-[#0047BB]">
            Our Research
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1A1A1A] lg:text-5xl">
            Research Topics
          </h2>
          <p className="max-w-xl text-lg text-[#666666]">
            Three core research areas driving the lab&apos;s work in energy materials.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <article
              key={topic.id}
              className={`group overflow-hidden border border-gray-200 bg-white opacity-0-init animate-fade-in-up transition-all duration-300 hover:-translate-y-1 hover:border-[#0047BB] ${STAGGER_DELAYS[index % 3]}`}
            >
              {/* 이미지 영역 (추상 그래픽 placeholder) */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0047BB]/20 to-[#0047BB]/5">
                {topic.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
                  <img
                    src={topic.imageUrl}
                    alt={topic.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <svg
                    className="absolute inset-0 h-full w-full transform p-6 transition-transform duration-500 group-hover:scale-[1.03]"
                    viewBox="0 0 200 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                  </svg>
                )}

                <div className="absolute inset-0 bg-[#0047BB]/0 transition-colors duration-300 group-hover:bg-[#0047BB]/5" />
              </div>

              <div className="p-5">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-[#0047BB]">
                  Research {topic.number}
                </span>
                <h3 className="mb-2 text-lg font-bold leading-tight text-[#1A1A1A]">{topic.title}</h3>
                <p className="text-sm leading-relaxed text-[#666666]">{topicBlurb(topic)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center opacity-0-init animate-fade-in-up delay-400">
          <Link
            href="/research"
            className="inline-flex items-center justify-center border-2 border-[#0047BB] px-8 py-4 text-sm font-semibold tracking-wide text-[#0047BB] transition-all duration-300 hover:bg-[#0047BB] hover:text-white"
          >
            Explore All Research
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
