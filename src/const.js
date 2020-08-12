const TAB = {
  overview: `Overview`,
  details: `Details`,
  reviews: `Reviews`,
};

const TABS = Object.values(TAB);

const DEFAULT_GENRE = `All genres`;

const SHOWING_FILMS_COUNT = {
  onStart: 8,
  byButton: 8,
};

const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MY_LIST: `mylist`,
  FILMS: `/films/`,
  REVIEW: `/review`,
  PLAYER: `/player`,
};

const STATUS = {
  add: 1,
  remove: 0,
};

export {
  TAB,
  TABS,
  DEFAULT_GENRE,
  SHOWING_FILMS_COUNT,
  AppRoute,
  STATUS,
};
