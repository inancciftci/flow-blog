"use client";
import { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";

const Hero = ({ posts }: { posts: Post[] }) => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  useEffect(() => {
    setFeaturedPosts(
      posts.sort((a: Post, b: Post) => b.views - a.views).slice(0, 3)
    );
  }, [posts]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % featuredPosts.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex(
      (prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length
    );
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
    <div className="relative flex items-center justify-center">
      <div className="w-[40%]  bg-[#fff4ec] absolute right-0 top-[-15rem] -z-20"></div>
      <div className="flex items-center max-md:my-[1rem] my-[2.5rem]">
        <ChevronLeftIcon
          className="w-[50px] text-primary-500 cursor-pointer absolute left-0 z-[100] max-md:hidden"
          onClick={handlePrev}
        />

        <div className="container relative ">
          <div className="hidden max-md:flex w-full justify-center items-center">
            <ChevronLeftIcon
              className="w-[50px] text-primary-500 cursor-pointer "
              onClick={handlePrev}
            />
            <ChevronRightIcon
              className="w-[50px] text-primary-500 cursor-pointer "
              onClick={handleNext}
            />
          </div>
          {featuredPosts.length > 0 && (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <HeroCard post={featuredPosts[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <ChevronRightIcon
          className="w-[50px] text-primary-500 cursor-pointer absolute right-0 max-md:hidden"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Hero;
