import { getMembers, type Member } from "@/app/lib/notion";

export const revalidate = 600;

/**
 * Members page
 * URL: /members
 *
 * Data from Notion Members DB via getMembers().
 * - [3] Empty sections hidden when length is 0
 * - [8] Hide Korean name line when nameKr is null or blank
 */

function MemberCard({ member }: { member: Member }) {
  return (
    <article className="group flex h-full flex-col border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0047BB]">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#0047BB]/5">
        {member.photoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
          <img
            src={member.photoUrl}
            alt={
              member.nameEn?.trim() || member.nameKr?.trim()
                ? [member.nameEn?.trim(), member.nameKr?.trim()].filter(Boolean).join(" ")
                : "Member photo"
            }
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_top] transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-16 w-16 text-[#0047BB]/20 transition-transform duration-500 group-hover:scale-[1.03]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-tight text-[#1A1A1A]">{member.nameEn}</h3>
        {member.nameKr?.trim() ? (
          <span className="mt-1 block text-sm text-[#666666]">{member.nameKr}</span>
        ) : null}
        <span className="mb-1 mt-4 block text-[11px] font-bold uppercase tracking-wider text-[#0047BB]">
          {member.position}
        </span>
        <a
          href={`mailto:${member.email}`}
          className="mb-5 block truncate text-sm text-[#666666] transition-colors hover:text-[#0047BB] hover:underline"
        >
          {member.email}
        </a>

        <div className="mt-auto flex flex-wrap gap-2">
          {member.keywords.map((keyword) => (
            <span
              key={`${member.id}-${keyword}`}
              className="rounded-sm bg-[#0047BB]/10 px-2.5 py-1 text-[11px] font-semibold text-[#0047BB]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default async function MembersPage() {
  const members = await getMembers();

  if (members.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-8 py-12 lg:px-16 lg:py-16">
        <section className="mb-16">
          <span className="text-sm text-[#666666]">Member</span>
          <h1 className="mt-4 text-4xl font-extrabold text-[#1A1A1A] md:text-5xl lg:text-[56px]">
            Members
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#666666]">
            Meet the researchers advancing energy materials science at AEML.
          </p>
          <hr className="mt-12 border-gray-200" />
        </section>
        <p className="py-32 text-center text-[#666666]">Members information is not available at the moment.</p>
      </div>
    );
  }

  const phdStudents = members.filter(
    (m) =>
      m.status !== "Alumni" &&
      (m.position?.toLowerCase().includes("ph.d") ||
        m.position?.toLowerCase().includes("phd") ||
        m.positionCategory === "Ph.D. Students"),
  );

  const msStudents = members.filter(
    (m) =>
      m.status !== "Alumni" &&
      (m.position?.toLowerCase().includes("m.s") ||
        m.position?.toLowerCase().includes("masters") ||
        m.position?.toLowerCase().includes("master") ||
        m.positionCategory === "M.S. Students") &&
      !m.position?.toLowerCase().includes("ph"),
  );

  const undergraduateStudents = members.filter(
    (m) =>
      m.status !== "Alumni" &&
      (m.position?.toLowerCase().includes("undergraduate") ||
        m.position?.toLowerCase().includes("ug") ||
        m.position?.toLowerCase().includes("학부") ||
        m.positionCategory === "Undergraduate Students"),
  );

  const phdMsUgIds = new Set(
    [...phdStudents, ...msStudents, ...undergraduateStudents].map((m) => m.id),
  );

  const researchers = members.filter(
    (m) =>
      m.status !== "Alumni" &&
      !phdMsUgIds.has(m.id) &&
      ((m.position?.toLowerCase().includes("research") &&
        !m.position?.toLowerCase().includes("undergraduate")) ||
        m.positionCategory === "Researchers"),
  );

  const alumni = members.filter(
    (m) => m.status === "Alumni" || m.positionCategory === "Alumni",
  );

  return (
    <div className="mx-auto max-w-[1440px] px-8 py-12 lg:px-16 lg:py-16">
      <section className="mb-16">
        <span className="text-sm text-[#666666]">Member</span>
        <h1 className="mt-4 text-4xl font-extrabold text-[#1A1A1A] md:text-5xl lg:text-[56px]">
          Members
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#666666]">
          Meet the researchers advancing energy materials science at AEML.
        </p>
        <hr className="mt-12 border-gray-200" />
      </section>

      {phdStudents.length > 0 ? (
        <section className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#0047BB]">PH.D. STUDENTS</h2>
          <div className="mb-8 mt-3 h-[2px] w-10 bg-[#0047BB]" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {phdStudents.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {msStudents.length > 0 ? (
        <section className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#0047BB]">M.S. STUDENTS</h2>
          <div className="mb-8 mt-3 h-[2px] w-10 bg-[#0047BB]" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {msStudents.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {undergraduateStudents.length > 0 ? (
        <section className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#0047BB]">
            UNDERGRADUATE STUDENTS
          </h2>
          <div className="mb-8 mt-3 h-[2px] w-10 bg-[#0047BB]" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {undergraduateStudents.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {researchers.length > 0 ? (
        <section className="mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#0047BB]">RESEARCHERS</h2>
          <div className="mb-8 mt-3 h-[2px] w-10 bg-[#0047BB]" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {researchers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {alumni.length > 0 ? (
        <section className="mb-24">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#0047BB]">Alumni</h2>
          <div className="mb-8 h-[2px] w-10 bg-[#0047BB]" />

          <div className="flex flex-col">
            {alumni.map((member) => (
              <div
                key={member.id}
                className="-mx-4 flex flex-col gap-4 rounded-lg border-b border-gray-100 px-4 py-5 transition-colors duration-200 hover:bg-[#0047BB]/5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex aspect-square h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0047BB]/5">
                    {member.photoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element -- Notion file URLs */
                      <img
                        src={member.photoUrl}
                        alt={
                          member.nameEn?.trim() || member.nameKr?.trim()
                            ? [member.nameEn?.trim(), member.nameKr?.trim()].filter(Boolean).join(" ")
                            : "Alumni photo"
                        }
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-[center_top]"
                      />
                    ) : (
                      <svg
                        className="h-6 w-6 text-[#0047BB]/30"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    <span className="text-base font-bold text-[#1A1A1A]">
                      {member.nameEn?.trim() || member.nameKr?.trim() || "Unnamed"}
                    </span>
                    {member.nameEn?.trim() && member.nameKr?.trim() ? (
                      <span className="text-sm text-[#666666]">({member.nameKr})</span>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-wrap items-center gap-x-6 gap-y-2 text-sm sm:justify-end">
                  <span className="text-[#666666]">{member.position}</span>
                  {member.joinYear != null && member.joinYear > 0 ? (
                    <span className="whitespace-nowrap tabular-nums text-[#666666]">
                      {member.joinYear}
                      {member.endYear != null && member.endYear > 0
                        ? ` - ${member.endYear}`
                        : " - "}
                    </span>
                  ) : null}
                  {member.currentAffiliation?.trim() ? (
                    <span className="flex items-center gap-1 whitespace-nowrap font-medium text-[#0047BB]">
                      <span className="font-normal text-[#666666]">{"\u2192"}</span>
                      {member.currentAffiliation.trim()}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
