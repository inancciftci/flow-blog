import React from "react";
import TrendingTopicsCard from "./TrendingTopicsCard";

const dummyPosts = [
  {
    id: 1,
    title: "After a Few Dates, They Traveled to the Other Side of the World",
    tag: "Lifestyle",
    date: "27 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-1.jpg",
  },
  {
    id: 2,
    title: "The Best Way to Spend a Weekend in the Mountains",
    tag: "Healthy",
    date: "28 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-2.jpg",
  },
  {
    id: 3,
    title: "How an MS Diagnosis Changed My Relationship With Food",
    tag: "Food",
    date: "29 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-3.jpg",
  },
  {
    id: 4,
    title: "How an MS Diagnosis Changed My Relationship With Food",
    tag: "Food",
    date: "29 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-4.jpg",
  },
  {
    id: 5,
    title: "How an MS Diagnosis Changed My Relationship With Food",
    tag: "Food",
    date: "29 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-5.jpg",
  },
  {
    id: 6,
    title: "How an MS Diagnosis Changed My Relationship With Food",
    tag: "Food",
    date: "29 August",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-6.jpg",
  },
];

const TrendingTopics = () => {
  return (
    <section className="relative">
      <div className="w-[45%] h-[90%] bg-[#fff4ec] absolute top-[-2rem] -z-20 "></div>
      <div className="container">
        <h1 className="text-5xl text-slate-700 font-bold mb-24 max-md:text-center max-md:mb-14 max-md:text-4xl">
          Trending Topics
        </h1>
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 my-[2.5rem]">
          {dummyPosts.map((post) => (
            <TrendingTopicsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingTopics;
