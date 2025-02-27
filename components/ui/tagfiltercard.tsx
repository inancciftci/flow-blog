import React from "react";
import { Button } from "./button";

const TagFilterCard = ({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) => {
  return (
    <Button onClick={onClick} className="px-6 py-2 bg-primary-100 rounded-lg">
      <span className="text-sm font-bold">{category.title}</span>
    </Button>
  );
};

export default TagFilterCard;
