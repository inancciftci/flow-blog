import React from "react";

const TagCard = ({ tag }: { tag: string }) => {
  return (
    <div className="py-3 px-4 bg-[#484848] font-bold text-[#dddddd] text-[0.8rem] rounded-md">
      {tag}
    </div>
  );
};

export default TagCard;
