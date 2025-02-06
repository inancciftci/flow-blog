import Image from "next/image";
import React from "react";

const AboutHero = () => {
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:text-center max-md:mt-6 gap-8 py-10 container">
      <div className="flex flex-col justify-center gap-2">
        <h4 className="uppercase font-[500] text-slate-500">
          About our company
        </h4>
        <h1 className="text-4xl font-bold mb-6">
          We are Building The Destination For Getting Things Done
        </h1>
        <p>
          Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices
          purus dolor erat bibendum sapien metus.
        </p>
        <p>
          Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices
          purus dolor erat bibendum sapien metus. Sit mi, pharetra, morbi arcu
          id. Pellentesque dapibus nibh augue senectus.
        </p>
      </div>
      <div className="relative aspect-square">
        <Image
          fill
          className="object-cover"
          src={
            "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/news/about-1.png"
          }
          alt="About Hero Image"
        />
      </div>
    </div>
  );
};

export default AboutHero;
