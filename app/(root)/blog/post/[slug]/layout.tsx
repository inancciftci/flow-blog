import PostSidebar from "@/components/post/PostSidebar";
import { api } from "@/lib/api";
import { ReactNode } from "react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await api.posts.getBySlug(slug);
  return {
    title: `${post.title}`,
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const [posts, { slug }] = await Promise.all([api.posts.getAll(), params]);

  return (
    <div className="grid grid-cols-[1fr_300px] container gap-10 max-md:grid-cols-1">
      <div>{children}</div>
      <div>
        <PostSidebar slug={slug} posts={posts} />
      </div>
    </div>
  );
}
