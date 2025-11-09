 const dateFormat = (dateStr, locale = "en-US") => {
  if (!dateStr) return "Unknown release date";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
// ✅ This is correct and recommended
export default dateFormat;