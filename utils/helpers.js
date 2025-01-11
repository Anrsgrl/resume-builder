//* Create formatted time
export const useFormattedTime = (time) => {
  if (!time) return "";
  let date;
  if (typeof time.toDate === "function") {
    date = time.toDate();
  } else if (typeof time === "string" || time instanceof Date) {
    date = new Date(time);
  } else {
    throw new Error("Invalid date format");
  }
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
