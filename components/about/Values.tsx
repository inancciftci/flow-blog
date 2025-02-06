import Image from "next/image";
import React from "react";
import ValueCard from "./ValueCard";

const values = [
  {
    id: 1,
    title: "Fast & Strong",
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/theme/rocket.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisic ing elit. Illum optio quis volup tatum quaerat ratione nisi inventore voluptate molestias",
  },
  {
    id: 2,
    title: "Creative",
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/theme/lighter.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisic ing elit. Illum optio quis volup tatum quaerat ratione nisi inventore voluptate molestias",
  },
  {
    id: 3,
    title: "Brain Storm",
    img: "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/theme/brain.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisic ing elit. Illum optio quis volup tatum quaerat ratione nisi inventore voluptate molestias",
  },
];

const Values = () => {
  return (
    <div className="container my-6 relative">
      <div className="flex flex-col gap-6 ">
        <h4 className="uppercase font-[500] text-slate-500">
          About our company
        </h4>
        <h1 className="text-4xl font-bold mb-6">Our Values </h1>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:mb-10">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
          purus sit amet luctus venenatis, lectus magna fringilla urna,
          porttitor rhoncus dolor purus non enim praesent elementum facilisis
          leo, vel fringilla est ullamcorper.
        </p>
        <div className="aspect-square absolute top-[1rem] right-[4rem]">
          <Image
            width={130}
            height={130}
            src={
              "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/theme/darts.png"
            }
            alt="Value Image"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1">
        {values.map((value) => (
          <ValueCard value={value} key={value.id} />
        ))}
      </div>
    </div>
  );
};

export default Values;
