//* Create formatted time
export const useFormattedTime = (time, locale) => {
  if (!time) return "";
  const date = new Date(time);
  const options = { month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString(locale || "en-US", options);

  return formattedDate;
};
