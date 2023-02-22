import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "%s ago",
    s: "now",
    m: "1min",
    mm: "%dmin",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mth",
    MM: "%dmth",
    y: "1y",
    yy: "%dy",
  },
});

export const getDateFromNow = (date, isInt = true) => {
  if (!date) return "";
  try {
    const parsed = isInt ? new Date(parseInt(date, 10)) : new Date(date);
    if (parsed === "Invalid Date") return "";
    // eslint-disable-next-line no-inline-comments
    const result = dayjs(parsed).fromNow() || ""; // takes care of NaN
    if (result.includes("now")) {
      return "now";
    }
    return result;
  } catch (e) {
    return "";
  }
};
