import Link from "next/link";

import ArticlesList from "@/app/components/ArticlesList";
import { getJournalArticles } from "@/app/lib/notion";

export const revalidate = 600;

/**
 * Journal Articles page
 * URL: /publications/articles
 *
 * Data from Notion via getJournalArticles(); filters in ArticlesList (client).
 */

export default async function JournalArticlesPage() {
  const articles = await getJournalArticles();

  if (articles.length === 0) {
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
            / <span className="text-[#1A1A1A]">Journal Articles</span>
          </p>

          <div className="mb-8 flex items-center gap-3">
            <span className="rounded-full bg-[#0047BB] px-4 py-1.5 text-sm font-medium text-white">
              Journal Articles
            </span>
            <Link
              href="/publications/patents"
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#666666] transition-colors hover:bg-gray-50"
            >
              Patents
            </Link>
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-5xl">Journal Articles</h1>
          <p className="mb-8 text-lg text-[#666666]">
            Peer-reviewed journal articles and conference proceedings from AEML.
          </p>
          <hr className="border-gray-200" />
        </section>
        <p className="py-32 text-center text-[#666666]">No journal articles available at the moment.</p>
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
          / <span className="text-[#1A1A1A]">Journal Articles</span>
        </p>

        <div className="mb-8 flex items-center gap-3">
          <span className="rounded-full bg-[#0047BB] px-4 py-1.5 text-sm font-medium text-white">
            Journal Articles
          </span>
          <Link
            href="/publications/patents"
            className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-[#666666] transition-colors hover:bg-gray-50"
          >
            Patents
          </Link>
        </div>

        <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-5xl">Journal Articles</h1>
        <p className="mb-8 text-lg text-[#666666]">
          Peer-reviewed journal articles and conference proceedings from AEML.
        </p>
        <hr className="border-gray-200" />
      </section>

      <ArticlesList articles={articles} />
    </div>
  );
}
