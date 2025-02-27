import EditorsPick from "@/components/EditorsPick";
import Hero from "@/components/Hero";
import RecentArticles from "@/components/RecentArticles";
import TrendingTopics from "@/components/TrendingTopics";
import { api } from "@/lib/api";

export default async function Home() {
  const posts = await api.posts.getAll();
  return (
    <section>
      <Hero posts={posts} />
      <TrendingTopics posts={posts} />
      <EditorsPick />
      <RecentArticles posts={posts} />
    </section>
  );
}
