export const capitalize = (s: string) => {
  if (s.length === 0) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const extractFileName = (filePath: string) => {
  return filePath.split("/").pop() || filePath;
};
