import dayjs from "dayjs";

export const date = (date: string | number | dayjs.Dayjs | Date | null | undefined, format = "YYYY-MM-DDTHH:mm:ssZ") => {
  let day = dayjs;

  return day(date, format).format("YYYY-MM-DDTHH:mm");
};

export const getDate = (date: string) => {
  return `${dayjs(date).get("year")}-${dayjs(date).get("month")}-${dayjs(date).get("date")}`;
};

export const getHour = (date: string) => {
  return `${dayjs(date).get("hour")}:${dayjs(date).get("minute")}`;
};

export const getDateAYearFromNow = () => {
  let aYearFromNow = new Date();
  return date(aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1));
}

export const getCurrentDate = () => {
  return date(new Date())
}
//TODO Format date,hour..