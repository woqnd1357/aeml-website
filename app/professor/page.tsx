import { EmailCopyButton } from "@/app/components/EmailCopyButton";
import { getProfessor } from "@/app/lib/notion";

/**
 * Professor page
 * URL: /professor
 *
 * Data from Notion Professor DB via getProfessor().
 */

export default async function ProfessorPage() {
  const professor = await getProfessor();

  if (!professor) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 pt-12 pb-32">
        <p className="text-[#666666] text-center py-32">
          Professor information is not available at the moment.
        </p>
      </div>
    );
  }

  const scholarUrl = professor.googleScholarUrl?.trim() ?? "";
  const orcidUrl = professor.orcidUrl?.trim() ?? "";

  return (
    <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 pt-12 pb-32">
      {/* Page header */}
      <div className="mb-16">
        <p className="text-sm text-[#666666] mb-4 uppercase tracking-wider font-medium">
          Member <span className="mx-2">/</span> Professor
        </p>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] tracking-tight">
          Professor
        </h1>
        <hr className="border-gray-200 mt-8 mb-0" />
      </div>

      {/* Profile */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16 mb-24">
        <div className="w-full md:w-[35%] shrink-0">
          {professor.photoUrl ? (
            <div className="relative w-full aspect-[3/4] border border-[#0047BB]/10 overflow-hidden bg-[#0047BB]/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */}
              <img
                src={professor.photoUrl}
                alt={
                  professor.nameEn?.trim() || professor.nameKr?.trim() || "Professor photo"
                }
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[center_top]"
              />
            </div>
          ) : (
            <div className="w-full aspect-[3/4] bg-[#0047BB]/5 border border-[#0047BB]/10 flex items-center justify-center">
              <span className="text-[#0047BB]/40 font-bold tracking-[0.2em] uppercase text-sm">
                Photo
              </span>
            </div>
          )}
        </div>

        <div className="w-full md:w-[65%] flex flex-col justify-center pt-4 md:pt-0">
          <span className="text-xs font-bold tracking-[0.2em] text-[#666666] uppercase mb-4">
            Principal Investigator
          </span>

          <h2
            className={`text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] leading-tight ${professor.nameKr?.trim() ? "mb-2" : "mb-8"}`}
          >
            {professor.nameEn || "Professor"}
          </h2>

          {professor.nameKr?.trim() ? (
            <p className="text-lg text-[#666666] mb-8">{professor.nameKr}</p>
          ) : null}

          <div className="mb-10 space-y-2">
            {professor.position ? (
              <p className="text-xl font-bold text-[#1A1A1A]">{professor.position}</p>
            ) : null}
            {professor.affiliation ? (
              <p className="text-lg text-[#666666] leading-relaxed whitespace-pre-line">
                {professor.affiliation}
              </p>
            ) : null}
          </div>

          <div className="flex items-center gap-5">
            {scholarUrl ? (
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#0047BB] transition-colors flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-[#0047BB]/5"
                title="Google Scholar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </a>
            ) : null}

            <EmailCopyButton email={professor.email} />

            {orcidUrl ? (
              <a
                href={orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-[#0047BB] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-[#0047BB]/5"
                title="ORCID"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <section className="mb-24">
        <h3 className="text-sm font-bold tracking-[0.2em] text-[#0047BB] uppercase">
          About
        </h3>
        <div className="w-[40px] h-[2px] bg-[#0047BB] mt-3 mb-8" />
        {professor.about?.trim() ? (
          <p className="text-lg text-[#666666] leading-relaxed max-w-[900px] whitespace-pre-line">
            {professor.about}
          </p>
        ) : null}
      </section>

      <section className="mb-24">
        <h3 className="text-sm font-bold tracking-[0.2em] text-[#0047BB] uppercase">
          Education
        </h3>
        <div className="w-[40px] h-[2px] bg-[#0047BB] mt-3 mb-8" />

        <div className="space-y-10">
          {professor.education?.length ? (
            professor.education.map((row, i) => (
              <div
                key={`${row.degree}-${row.school}-${i}`}
                className="flex flex-col md:flex-row md:justify-between md:items-start gap-4"
              >
                <div>
                  <h4 className="text-xl font-bold text-[#1A1A1A] mb-1">
                    {row.degree?.trim() || "Education"}
                  </h4>
                  {row.school?.trim() ? (
                    <p className="text-lg text-[#666666]">{row.school}</p>
                  ) : null}
                </div>
                {row.year?.trim() ? (
                  <span className="text-lg font-medium text-[#1A1A1A] whitespace-nowrap mt-1 md:mt-0">
                    {row.year}
                  </span>
                ) : null}
              </div>
            ))
          ) : null}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-bold tracking-[0.2em] text-[#0047BB] uppercase">
          Experience
        </h3>
        <div className="w-[40px] h-[2px] bg-[#0047BB] mt-3 mb-8" />

        <div className="space-y-10">
          {professor.experience?.length ? (
            professor.experience.map((row, i) => (
              <div
                key={`${row.position}-${row.institution}-${i}`}
                className="flex flex-col md:flex-row md:justify-between md:items-start gap-4"
              >
                <div>
                  <h4 className="text-xl font-bold text-[#1A1A1A] mb-1">
                    {row.position || "Role"}
                  </h4>
                  {row.institution ? (
                    <p className="text-lg text-[#666666]">{row.institution}</p>
                  ) : null}
                </div>
                {row.period ? (
                  <span className="text-lg font-medium text-[#1A1A1A] whitespace-nowrap mt-1 md:mt-0">
                    {row.period}
                  </span>
                ) : null}
              </div>
            ))
          ) : null}
        </div>
      </section>
    </div>
  );
}
