import Image from "next/image";
import React from "react";

const UserImage = () => {
  const image =
    "https://zmktljhsixtnepoianod.supabase.co/storage/v1/object/public/avatar-images/avatar/blank-profile-picture-973460_1280.webp";
  return (
    <div className="relative aspect-square rounded-full overflow-hidden">
      <Image className="object-cover" src={image} fill alt="User Image" />
    </div>
  );
};

export default UserImage;
