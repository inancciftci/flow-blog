import Image from "next/image";
import React from "react";
import Link from "next/link";

const BlogHeroCard = ({
  big,
  category,
}: {
  big?: boolean;
  category: Category;
}) => {
  return (
    <div
      className={`relative ${big ? "h-[316px] max-md:h-[150px]" : "h-[150px]"}`}
    >
      <Image
        className="object-cover rounded-[1rem]"
        src={category.cover_image}
        alt={category.title}
        fill
      />
      <div className="absolute inset-0 flex flex-col gap-4 justify-end p-4 bg-gradient-to-t from-black to-transparent rounded-[1rem]">
        <Link
          href={`/blog/category/${category.slug}`}
          className={` text-white font-bold ${big ? "text-xl" : "text-lg"}`}
        >
          {category.title}
        </Link>
      </div>
    </div>
  );
};

export default BlogHeroCard;
