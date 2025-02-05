import EditorsPick from "@/components/EditorsPick";
import Hero from "@/components/Hero";
import TrendingTopics from "@/components/TrendingTopics";

export default function Home() {
  return (
    <section>
      <Hero />
      <TrendingTopics />
      <EditorsPick />
    </section>
  );
}
