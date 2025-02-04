import React from "react";
import HeroCard from "./HeroCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// const dummyPosts = [
//   {
//     id: 1,
//     title: "30 Best Lifestyle Blogs to Follow in 2021",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
//     image:
//       "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-10.jpg",
//     date: "2021-09-01",
//     tag: "Lifestyle",
//   },
//   {
//     id: 2,
//     title: "9 Things I Love About Shaving My Head During Quarantine",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
//     image:
//       "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-11.jpg",
//     date: "2021-02-01",
//     tag: "Design",
//   },
//   {
//     id: 3,
//     title: "Essential Quallities of Highly Successful Music in this year",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
//     image:
//       "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-12.jpg",
//     date: "2021-05-01",
//     tag: "Audition",
//   },
//   {
//     id: 4,
//     title: "Why We Need to Stop Talking About Food and Guilt",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
//     image:
//       "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-13.jpg",
//     date: "2021-07-01",
//     tag: "Healthy",
//   },
// ];

const Hero = () => {
  //   const posts = dummyPosts;

  return (
    <div className="flex items-center my-[2.5rem]">
      <ChevronLeftIcon className="w-[50px] text-primary-500" />
      <div className="container">
        <HeroCard />
      </div>
      <ChevronRightIcon className="w-[50px] text-primary-500" />
    </div>
  );
};

export default Hero;
