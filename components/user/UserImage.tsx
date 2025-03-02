import Image from "next/image";
import React from "react";

const UserImage = ({ src }: { src: string }) => {
  return (
    <div className="relative border-white border-[2px] aspect-square rounded-full overflow-hidden">
      <Image className="object-cover" src={src} fill alt="User Image" />
    </div>
  );
};

export default UserImage;
