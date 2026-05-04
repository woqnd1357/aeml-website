import HeroSection from "@/app/components/HeroSection";
import ResearchTopics from "@/app/components/ResearchTopics";
import { getResearchTopics } from "@/app/lib/notion";

export const revalidate = 600;

/**
 * Home page (Hero)
 * URL: /
 *
 * Research Topics uses Featured items from Notion via getResearchTopics(true).
 */

export default async function HomePage() {
  const featuredTopics = await getResearchTopics(true);

  return (
    <>
      <HeroSection />
      <ResearchTopics topics={featuredTopics} />
    </>
  );
}
