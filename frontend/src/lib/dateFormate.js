<<<<<<< HEAD
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
=======
export const dateFormat =(date)=>{
    return new Date(date).toLocaleString('en-US',{
        weekday :'short',
        month : 'long',
        day:'numeric',
        hour:"numeric",
        minute:"numeric"
    })
}
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
