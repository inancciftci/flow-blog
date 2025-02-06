import Image from "next/image";
import React from "react";

const Mission = () => {
  return (
    <div className="py-4 container">
      <div className="flex flex-col gap-4">
        <h4 className="uppercase font-[500] text-slate-500">
          About our company
        </h4>
        <h1 className="text-4xl font-bold mb-6">Our Mission </h1>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-10">
        <div className="flex-col flex gap-10">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel fringilla est ullamcorper.
          </p>
          <p>
            Leget nulla facilisi etiam dignissim diam quis enim lobortis
            scelerisque fermentum dui faucibus in ornare quam viverra orci
            sagittis eu volutpat odio facilisis mauris
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor rhoncus dolor purus non enim praesent elementum facilisis
            leo, vel fringilla est ullamcorper eget nulla.
          </p>
        </div>
      </div>
      <div className="w-full relative aspect-[3.5/1] my-10">
        <Image
          className="object-cover"
          src={
            "https://wp.alithemes.com/html/flow/html-demo/assets/imgs/authors/about-9.png"
          }
          fill
          alt="Mission Image"
        />
      </div>
    </div>
  );
};

export default Mission;
