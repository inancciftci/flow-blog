const TagCard = ({
  tag,
  absoluteTop,
}: {
  tag?: string;
  absoluteTop?: boolean;
}) => {
  return (
    <div
      className={
        "py-3 px-4 bg-primary-500 font-bold text-slate-600 text-[0.8rem] inline-block rounded-md " +
        `${absoluteTop ? "absolute z-[1000]" : ""}`
      }
    >
      {tag}
    </div>
  );
};

export default TagCard;
