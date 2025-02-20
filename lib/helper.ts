export const dateToString = (date: string) => {
  const data = new Date(date);
  return data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getShortDescription = (html: string, maxLength: number = 200) => {
  const textContent = html.replace(/<\/?[^>]+(>|$)/g, " ");

  return textContent.length > maxLength
    ? textContent.substring(0, maxLength).trim() + "..."
    : textContent.trim();
};

export const dateToStringDetail = (date: string) => {
  const data = new Date(date);
  return data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
