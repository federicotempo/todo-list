import { format } from "date-fns";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return format(date, `MMMM do`).replace(/(\d+)(th|st|nd|rd)/, `$1${suffix}`);
};

export { formatDate };
