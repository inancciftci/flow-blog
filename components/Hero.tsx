"use client";
import { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

const Hero = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await api.posts.getAll();

        const categories = await api.categories.getAll();

        const categoryMap = categories.reduce((acc, cat) => {
          acc[cat.id] = cat.title;
          return acc;
        }, {} as Record<number, string>);

        const enrichedPosts = posts.map((post: Post) => ({
          ...post,
          categoryTitle: categoryMap[post.category],
        }));

        setFeaturedPosts(
          enrichedPosts
            .sort((a: Post, b: Post) => b.views - a.views)
            .slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

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
    <div className="relative">
      <div className="w-[40%] h-[55vh] bg-[#fff4ec] absolute right-0 top-[-15rem] -z-20"></div>
      <div className="flex items-center my-[2.5rem]">
        <ChevronLeftIcon
          className="w-[50px] text-primary-500 cursor-pointer absolute left-0 z-[100]"
          onClick={handlePrev}
        />

        <div className="container relative ">
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
          className="w-[50px] text-primary-500 cursor-pointer absolute right-0"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Hero;
