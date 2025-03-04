import { api } from "@/lib/api";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { ReactNode } from "react";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const category = await api.categories.getBySlug(slug);
  return {
    title: `${category.title} Category`,
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { slug } = await params;
  const category = await api.categories.getBySlug(slug);
  const posts = await api.posts.getByCategory(category.id);

  return (
    <div>
      <div className="bg-primary-100 py-6">
        <div className="container flex flex-col gap-10 max-md:gap-4">
          <div className="flex gap-2 max-md:justify-center">
            <h1 className="text-5xl font-bold">{category.title}</h1>
            <span className="text-slate-500">{posts.length} articles</span>
          </div>
          <div className="flex justify-between max-md:flex-col-reverse max-md:gap-4 max-md:items-center">
            <div className="max-w-[400px]">
              <p className="max-md:text-center">{category.description}</p>
            </div>
            <div className="flex items-end">
              <div className="flex gap-2 items-center">
                <Link className="text-slate-500" href={"/"}>
                  Home
                </Link>
                <ChevronRightIcon className="size-5 text-slate-500" />
                <Link href={`/blog/category/${category.slug}`}>
                  {category.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-100">
        <div className="container">{children}</div>
      </div>
    </div>
  );
}
