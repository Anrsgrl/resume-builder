const azMonths = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "İyn",
  "İyl",
  "Avq",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];
//* toLocaleDateString does not support the Azerbaijani language, I should have written like this

//* Create formatted time
export const useFormattedTime = (time, locale) => {
  if (!time) return "";
  const date = new Date(time);

  if (locale === "az-AZ") {
    const month = azMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const options = { month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString(locale || "en-US", options);

  return formattedDate;
};
