import PostSidebar from "@/components/post/PostSidebar";
import { api } from "@/lib/api";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const posts = await api.posts.getAll();
  const categories = await api.categories.getAll();

  return (
    <div className="grid grid-cols-[1fr_300px] container gap-10 max-md:grid-cols-1">
      <div>{children}</div>
      <div>
        <PostSidebar slug={params.slug} posts={posts} categories={categories} />
      </div>
    </div>
  );
}
