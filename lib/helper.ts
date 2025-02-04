export const dateToString = (date: string) => {
  const data = new Date(date);
  return data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
