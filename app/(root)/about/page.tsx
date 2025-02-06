import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Team from "@/components/about/Team";
import Values from "@/components/about/Values";
import React from "react";

const page = () => {
  return (
    <section>
      <AboutHero />
      <div className="border-b border-slate-200">
        <Mission />
      </div>
      <Values />
      <div className="relative">
        <div className="z-[-1] bg-primary-100 w-[45%] max-md:w-[55%] h-[70%] absolute left-0"></div>
        <Team />
      </div>
    </section>
  );
};

export default page;
