"use client";

import React, { useState } from "react";
import EditorsPickCard from "./EditorsPickCard";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";

const posts = [
  {
    id: 1,
    title: "The 28 Best Skincare Products of 2021",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-17.jpg",
    tag: "LifeStyle",
    date: "2021.09.15",
  },
  {
    id: 2,
    title: "5 Science-Backed Reasons Why Music is Good for You",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-19.jpg",
    tag: "Music",
    date: "2021.09.15",
  },
  {
    id: 3,
    title: "Rice Water for Hair Growth: Does It Actually Work?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/news-18.jpg",
    tag: "Beauty",
    date: "2021.09.15",
  },
];

const EditorsPick = () => {
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
      y: direction === "bottom" ? 0 : -0,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: (direction: string) => ({
      y: direction === "bottom" ? -0 : 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    }),
  };
  return (
    <section className="container relative my-10 max-md:my-0">
      <h1 className="text-5xl text-slate-700 font-bold mb-24 max-md:text-center max-md:mb-14">
        Editor&apos;s picked
      </h1>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <EditorsPickCard post={posts[currentIndex]} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-[3rem] right-[1rem] max-md:bottom-[65%] flex flex-col">
        <ArrowUpCircleIcon
          onClick={handleNext}
          className="text-primary-500 w-14 h-14 cursor-pointer"
        />
        <ArrowDownCircleIcon
          onClick={handlePrev}
          className="text-primary-500 w-14 h-14 cursor-pointer"
        />
      </div>
    </section>
  );
};

export default EditorsPick;
