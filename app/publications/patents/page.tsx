import Link from "next/link";

import PatentsList from "@/app/components/PatentsList";
import { getPatents } from "@/app/lib/notion";

/**
 * Patents page
 * URL: /publications/patents
 *
 * Data from Notion via getPatents(); filters in PatentsList (client).
 */

export default async function PatentsPage() {
  const patents = await getPatents();

  if (patents.length === 0) {
    return (
      <div className="pb-20 pt-12">
        <section className="mx-auto mb-12 w-full max-w-[1200px] px-8 lg:px-16">
          <p className="mb-5 text-sm text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#0047BB]">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/publications" className="transition-colors hover:text-[#0047BB]">
              Publications
            </Link>{" "}
            / <span className="text-[#1A1A1A]">Patents</span>
          </p>

          <div className="mb-8 flex items-center gap-3">
            <Link
              href="/publications/articles"
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#666666] transition-colors hover:bg-gray-50"
            >
              Journal Articles
            </Link>
            <span className="rounded-full bg-[#0047BB] px-4 py-1.5 text-sm font-medium text-white">
              Patents
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-5xl">Patents</h1>
          <p className="mb-8 text-lg text-[#666666]">Patents and patent applications from AEML.</p>
          <hr className="border-gray-200" />
        </section>
        <p className="py-32 text-center text-[#666666]">No patents available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-12">
      <section className="mx-auto mb-12 w-full max-w-[1200px] px-8 lg:px-16">
        <p className="mb-5 text-sm text-[#666666]">
          <Link href="/" className="transition-colors hover:text-[#0047BB]">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/publications" className="transition-colors hover:text-[#0047BB]">
            Publications
          </Link>{" "}
          / <span className="text-[#1A1A1A]">Patents</span>
        </p>

        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/publications/articles"
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#666666] transition-colors hover:bg-gray-50"
          >
            Journal Articles
          </Link>
          <span className="rounded-full bg-[#0047BB] px-4 py-1.5 text-sm font-medium text-white">
            Patents
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-5xl">Patents</h1>
        <p className="mb-8 text-lg text-[#666666]">Patents and patent applications from AEML.</p>
        <hr className="border-gray-200" />
      </section>

      <PatentsList patents={patents} />
    </div>
  );
}
