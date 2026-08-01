import { PortfolioSite } from "@/components/site/PortfolioSite";
import { getContent } from "@/lib/get-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();
  return <PortfolioSite content={content} />;
}
