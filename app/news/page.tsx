import Link from "next/link";

import NewsList from "@/app/components/NewsList";
import { getNews } from "@/app/lib/notion";

/**
 * News page
 * URL: /news
 *
 * Data from Notion via getNews() on the server; category filtering in NewsList.
 */

export default async function NewsPage() {
  const newsItems = await getNews();

  if (newsItems.length === 0) {
    return (
      <div className="pb-20">
        <header className="mx-auto w-full max-w-[1440px] px-8 pb-10 pt-20 lg:px-16">
          <p className="mb-4 text-sm text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#0047BB]">
              Home
            </Link>{" "}
            / <span className="text-[#1A1A1A]">News</span>
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-[56px]">News</h1>
          <p className="mb-10 text-lg text-[#666666]">
            Updates from the Advanced Energy Materials Laboratory.
          </p>
          <div className="h-px w-full bg-gray-200" />
        </header>
        <p className="py-32 text-center text-[#666666]">No news available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="mx-auto w-full max-w-[1440px] px-8 pb-10 pt-20 lg:px-16">
        <p className="mb-4 text-sm text-[#666666]">
          <Link href="/" className="transition-colors hover:text-[#0047BB]">
            Home
          </Link>{" "}
          / <span className="text-[#1A1A1A]">News</span>
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-[#1A1A1A] lg:text-[56px]">News</h1>
        <p className="mb-10 text-lg text-[#666666]">
          Updates from the Advanced Energy Materials Laboratory.
        </p>
        <div className="h-px w-full bg-gray-200" />
      </header>

      <NewsList items={newsItems} />
    </div>
  );
}
