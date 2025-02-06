"use client";

import { useEffect, useState } from "react";

const AnimatedScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-primary-100 z-50">
      <div
        className="h-full bg-primary-500 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default AnimatedScrollbar;
