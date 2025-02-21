import EditorsPick from "@/components/EditorsPick";
import Hero from "@/components/Hero";
import RecentArticles from "@/components/RecentArticles";
import TrendingTopics from "@/components/TrendingTopics";
import { api } from "@/lib/api";

export default async function Home() {
  const posts = await api.posts.getAll();
  const categories = await api.categories.getAll();
  return (
    <section>
      <Hero categories={categories} posts={posts} />
      <TrendingTopics categories={categories} posts={posts} />
      <EditorsPick categories={categories} posts={posts} />
      <RecentArticles categories={categories} posts={posts} />
    </section>
  );
}
