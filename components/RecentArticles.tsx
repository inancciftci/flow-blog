import React from "react";
import TrendingTopicsCard from "./TrendingTopicsCard";

const posts = [
  {
    id: 1,
    title: "After a Few Dates, They Traveled to the Other Side of the World",
    tag: "Travel",
    date: "2021.09.15",
    author: "John Doe",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-8.jpg",
  },
  {
    id: 2,
    title: "The 28 Best Skincare Products of 2021",
    tag: "LifeStyle",
    date: "2021.09.15",

    author: "John Doe",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-5.jpg",
  },
  {
    id: 3,
    title: "5 Science-Backed Reasons Why Music is Good for You",
    tag: "Music",
    date: "2021.09.15",

    author: "John Doe",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-6.jpg",
  },
  {
    id: 4,
    title: "Rice Water for Hair Growth: Does It Actually Work?",
    tag: "Beauty",
    date: "2021.09.15",

    author: "John Doe",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-7.jpg",
  },
];

const RecentArticles = () => {
  return (
    <section className="container my-10 flex flex-col gap-10 max-md:mt-4">
      <div className="flex flex-col mb-10 max-md:text-center max-md:mb-0">
        <h1 className="text-5xl text-slate-700 font-bold max-md:text-4xl">
          Recent Articles
        </h1>
        <h3 className="text-2xl max-md:text-xl text-slate-500">
          Don&apos;t miss new trend
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
        {posts.map((post) => (
          <TrendingTopicsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RecentArticles;
