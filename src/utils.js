import {DEFAULT_GENRE} from './const';

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const parseDate = (date) => {
  return {
    YYYY: date.getFullYear(),
    MM: castTimeFormat(date.getMonth()),
    MMMM: MONTH_NAMES[date.getMonth()],
    DD: castTimeFormat(date.getDate()),
  };
};

const formatTime = (date, format) => {
  const parsedDate = parseDate(date);
  let formattedDate = format;

  for (const [key, value] of Object.entries(parsedDate)) {
    formattedDate = formattedDate.replace(new RegExp(`\\b${key}\\b`), `${value}`);
  }

  return formattedDate;
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export {
  formatTime,
  extend,
};
