import Link from "next/link";

import { getResearchTopics, type ResearchTopic } from "@/app/lib/notion";

/**
 * Research page
 * URL: /research
 *
 * Data from Notion via getResearchTopics() (all topics, not featured-only).
 */

type PatternId = "crystal" | "electron" | "circuit";

const PATTERN_CYCLE: PatternId[] = ["crystal", "electron", "circuit"];

function patternForIndex(index: number): PatternId {
  return PATTERN_CYCLE[index % 3]!;
}

function TopicPattern({
  pattern,
  paintId,
}: {
  pattern: PatternId;
  paintId: string;
}) {
  if (pattern === "crystal") {
    return (
      <svg className="absolute inset-0 h-full w-full" width="100%" height="100%">
        <defs>
          <pattern
            id={paintId}
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M60 0 L120 60 L60 120 L0 60 Z"
              fill="none"
              stroke="#0047BB"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <circle cx="60" cy="60" r="3" fill="#0047BB" fillOpacity="0.6" />
            <circle cx="0" cy="0" r="3" fill="#0047BB" fillOpacity="0.6" />
            <line
              x1="0"
              y1="0"
              x2="120"
              y2="120"
              stroke="#0047BB"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="4 4"
            />
            <line
              x1="120"
              y1="0"
              x2="0"
              y2="120"
              stroke="#0047BB"
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="4 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${paintId})`} />
      </svg>
    );
  }

  if (pattern === "electron") {
    return (
      <svg className="absolute inset-0 h-full w-full p-8">
        <g opacity="0.5">
          <path
            d="M0 50% Q 25% 30%, 50% 50% T 100% 50%"
            fill="none"
            stroke="#0047BB"
            strokeWidth="1.5"
          />
          <path
            d="M0 60% Q 30% 40%, 60% 60% T 100% 60%"
            fill="none"
            stroke="#0047BB"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx="30%"
            ry="15%"
            fill="none"
            stroke="#0047BB"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <circle cx="20%" cy="40%" r="4" fill="#0047BB" />
          <circle cx="50%" cy="50%" r="5" fill="#0047BB" />
          <circle cx="80%" cy="55%" r="3" fill="#0047BB" />
        </g>
      </svg>
    );
  }

  return (
    <svg className="absolute inset-0 h-full w-full p-6">
      <g opacity="0.5">
        <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="#0047BB" strokeWidth="1" />
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#0047BB" strokeWidth="1" />
        <line x1="10%" y1="80%" x2="90%" y2="80%" stroke="#0047BB" strokeWidth="1" />
        <line x1="20%" y1="10%" x2="20%" y2="90%" stroke="#0047BB" strokeWidth="1" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#0047BB" strokeWidth="1" />
        <line x1="80%" y1="10%" x2="80%" y2="90%" stroke="#0047BB" strokeWidth="1" />
        <rect x="22%" y="35%" width="15%" height="10%" fill="none" stroke="#0047BB" strokeWidth="1" />
        <rect x="55%" y="55%" width="15%" height="10%" fill="none" stroke="#0047BB" strokeWidth="1" />
        <circle cx="20%" cy="50%" r="3" fill="#0047BB" />
        <circle cx="50%" cy="50%" r="3" fill="#0047BB" />
        <circle cx="80%" cy="50%" r="3" fill="#0047BB" />
      </g>
    </svg>
  );
}

export default async function ResearchPage() {
  const topics = await getResearchTopics();

  if (topics.length === 0) {
    return (
      <div className="pb-24 pt-12">
        <section className="mx-auto mb-16 w-full max-w-[1200px] px-8 lg:px-16">
          <div className="border-b border-gray-200 pb-12">
            <p className="mb-4 text-sm text-[#666666]">
              <Link href="/" className="transition-colors hover:text-[#0047BB]">
                Home
              </Link>{" "}
              / <span className="text-[#0047BB]">Research</span>
            </p>
            <h1 className="mb-4 text-5xl font-extrabold text-[#1A1A1A] lg:text-6xl">Research</h1>
            <p className="max-w-[800px] text-lg leading-relaxed text-[#666666]">
              Explore the research areas pursued by the Advanced Energy Materials Laboratory.
            </p>
          </div>
        </section>
        <p className="py-32 text-center text-[#666666]">
          Research topics are not available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-12">
      {/* 페이지 헤더 영역 */}
      <section className="mx-auto mb-16 w-full max-w-[1200px] px-8 lg:px-16">
        <div className="border-b border-gray-200 pb-12">
          <p className="mb-4 text-sm text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#0047BB]">
              Home
            </Link>{" "}
            / <span className="text-[#0047BB]">Research</span>
          </p>
          <h1 className="mb-4 text-5xl font-extrabold text-[#1A1A1A] lg:text-6xl">Research</h1>
          <p className="max-w-[800px] text-lg leading-relaxed text-[#666666]">
            Explore the research areas pursued by the Advanced Energy Materials Laboratory.
          </p>
        </div>
      </section>

      {/* OUR FOCUS 인트로 섹션 */}
      <section className="mx-auto mb-24 w-full max-w-[1200px] px-8 lg:px-16">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
          OUR FOCUS
        </span>
        <div className="mb-6 h-0.5 w-10 bg-[#0047BB]" />
        <p className="max-w-[800px] text-lg leading-relaxed text-[#666666]">
          AEML investigates next-generation energy materials by combining experimental synthesis,
          electrochemical characterization, and AI-driven approaches. Our research bridges
          fundamental materials science with practical energy storage applications.
        </p>
      </section>

      {/* Research Topics */}
      {topics.map((topic: ResearchTopic, index) => {
        const isReversed = index % 2 === 1;
        const pattern = patternForIndex(index);
        const paintId = `research-crystal-${topic.id.replace(/-/g, "")}`;

        return (
          <section
            key={topic.id}
            className="mx-auto w-full max-w-[1200px] border-b border-gray-100 px-8 py-20 lg:px-16"
          >
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div
                className={`group relative aspect-[4/3] overflow-hidden border border-gray-200 bg-gradient-to-br from-[#0047BB]/10 to-[#0047BB]/5 ${
                  isReversed ? "order-2 lg:order-2" : "order-1 lg:order-1"
                }`}
              >
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
                  <div className="pointer-events-none absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                    <TopicPattern pattern={pattern} paintId={paintId} />
                  </div>
                )}
              </div>

              <div
                className={`flex flex-col justify-center ${
                  isReversed ? "order-1 lg:order-1" : "order-2 lg:order-2"
                }`}
              >
                <span className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#0047BB]">
                  RESEARCH {topic.number}
                </span>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-[#1A1A1A] lg:text-4xl">
                  {topic.title}
                </h2>
                <p className="mb-8 whitespace-pre-line leading-relaxed text-[#666666]">
                  {topic.longDescription}
                </p>

                <div className="mb-8">
                  <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-[#0047BB]">
                    KEYWORDS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {topic.keywords.map((keyword) => (
                      <span
                        key={`${topic.id}-${keyword}`}
                        className="rounded-sm bg-[#0047BB]/10 px-3 py-1 text-sm text-[#0047BB]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#"
                  className="group inline-flex items-center text-sm font-semibold text-[#0047BB] transition-colors hover:text-[#003B99]"
                >
                  Related Publications
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </a>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
