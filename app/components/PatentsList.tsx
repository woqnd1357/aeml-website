"use client";

import { useState } from "react";

import type { Patent } from "@/app/lib/notion";

const COUNTRY_ORDER = ["KR", "US", "PCT"] as const;

function sortCountries(countries: string[]): string[] {
  return [...countries].sort((a, b) => {
    const ia = COUNTRY_ORDER.indexOf(a as (typeof COUNTRY_ORDER)[number]);
    const ib = COUNTRY_ORDER.indexOf(b as (typeof COUNTRY_ORDER)[number]);
    const ra = ia === -1 ? 99 : ia;
    const rb = ib === -1 ? 99 : ib;
    if (ra !== rb) return ra - rb;
    return a.localeCompare(b);
  });
}

const STATUS_ORDER = ["Registered", "Filed"] as const;

function sortStatuses(statuses: string[]): string[] {
  return [...statuses].sort((a, b) => {
    const ia = STATUS_ORDER.indexOf(a as (typeof STATUS_ORDER)[number]);
    const ib = STATUS_ORDER.indexOf(b as (typeof STATUS_ORDER)[number]);
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

function PatentCard({ patent }: { patent: Patent }) {
  const isRegistered = patent.status?.toUpperCase() === "REGISTERED";
  const statusColors = isRegistered
    ? "bg-[#E8F5E9] text-green-700"
    : "bg-[#FFF8E1] text-amber-700";

  const statusLabel = patent.status.toUpperCase();

  return (
    <article className="group -mx-4 flex flex-col gap-4 rounded-xl border-b border-gray-100 px-4 py-8 transition-colors duration-200 hover:bg-[#0047BB]/5 sm:-mx-6 sm:flex-row sm:gap-8 sm:px-6">
      <div className="w-[100px] shrink-0">
        <div className="text-2xl font-bold text-[#1A1A1A] lg:text-3xl">{patent.number}</div>
        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#0047BB]">
          {patent.country}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="mb-2 text-lg font-bold leading-snug text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#0047BB] lg:text-xl">
          {patent.title}
        </h3>
        <p className="mb-3 text-sm text-[#666666]">{patent.inventors}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-sm text-[#666666]">{patent.applicationNumber}</span>
          {patent.filedDate?.trim() ? (
            <span className="text-sm text-[#666666]">Filed: {patent.filedDate}</span>
          ) : null}
          {patent.registeredDate?.trim() ? (
            <span className="text-sm text-[#666666]">Registered: {patent.registeredDate}</span>
          ) : null}
          <span
            className={`ml-auto rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusColors}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function PatentsList({ patents }: { patents: Patent[] }) {
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const usedCountries = sortCountries(
    Array.from(new Set(patents.map((p) => p.country).filter(Boolean))),
  );

  const usedStatuses = sortStatuses(
    Array.from(new Set(patents.map((p) => p.status).filter(Boolean))),
  );

  const filteredPatents = patents.filter((patent) => {
    if (selectedCountry !== "All" && patent.country !== selectedCountry) {
      return false;
    }
    if (selectedStatus !== "All" && patent.status !== selectedStatus) {
      return false;
    }
    return true;
  });

  return (
    <>
      <section className="mx-auto mb-12 w-full max-w-[1200px] px-8 lg:px-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <FilterButton
              label="All"
              active={selectedCountry === "All"}
              onClick={() => setSelectedCountry("All")}
            />
            {usedCountries.map((country) => (
              <FilterButton
                key={country}
                label={country}
                active={selectedCountry === country}
                onClick={() => setSelectedCountry(country)}
              />
            ))}
          </div>

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
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-8 lg:px-16">
        <div className="flex flex-col">
          {filteredPatents.map((patent) => (
            <PatentCard key={patent.id} patent={patent} />
          ))}
          {filteredPatents.length === 0 ? (
            <p className="py-16 text-center text-[#666666]">No patents match the selected filters.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
