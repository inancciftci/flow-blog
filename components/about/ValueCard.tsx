import Image from "next/image";
import React from "react";

interface Props {
  value: {
    id: number;
    title: string;
    description: string;
    img: string;
  };
}

const ValueCard = ({ value }: Props) => {
  return (
    <div className="flex gap-2 my-10 max-md:my-0 max-md:gap-10 max-md:mb-6">
      <div className="relative w-10 h-20 flex-shrink-0">
        <Image
          className="object-contain"
          width={80}
          height={80}
          alt={value.title}
          src={value.img}
        />
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold text-lg">{value.title}</h3>
        <p className="text-sm text-gray-600">{value.description}</p>
      </div>
    </div>
  );
};

export default ValueCard;
