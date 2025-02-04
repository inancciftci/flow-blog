"use client";
import { useState } from "react";
import HeroCard from "./HeroCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "30 Best Lifestyle Blogs to Follow in 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-10.jpg",
    date: "2021-09-01",
    tag: "Lifestyle",
  },
  {
    id: 2,
    title: "9 Things I Love About Shaving My Head During Quarantine",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-11.jpg",
    date: "2021-02-01",
    tag: "Design",
  },
  {
    id: 3,
    title: "Essential Quallities of Highly Successful Music in this year",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-12.jpg",
    date: "2021-05-01",
    tag: "Audition",
  },
  {
    id: 4,
    title: "Why We Need to Stop Talking About Food and Guilt",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio suspendisse leo neque iaculis molestie sagittis maecenas aenean eget molestie sagittis.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/thumb-13.jpg",
    date: "2021-07-01",
    tag: "Healthy",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const variants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: (direction: string) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="flex items-center my-[2.5rem] relative">
      <div className="w-[500px] h-[700px] bg-[#fff4ec] absolute right-0 top-[-15rem] -z-20"></div>
      <ChevronLeftIcon
        className="w-[50px] text-primary-500 cursor-pointer"
        onClick={handlePrev}
      />

      <div className="container relative ">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <HeroCard post={posts[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <ChevronRightIcon
        className="w-[50px] text-primary-500 cursor-pointer"
        onClick={handleNext}
      />
    </div>
  );
};

export default Hero;
