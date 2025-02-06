import Image from "next/image";
import React from "react";

interface Props {
  member: {
    id: number;
    img: string;
    name: string;
    bio: string;
  };
}

const TeamMemberCard = ({ member }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative h-[250px] aspect-[3/4] rounded-md overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={member.img}
          alt={member.name}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="text-slate-800 text-sm">{member.bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
