import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.FILM;

export const getActiveGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};

export const getActiveFilm = (state) => {
  return state[NAME_SPACE].activeFilm;
};

export const getShowingFilmsCount = (state) => {
  return state[NAME_SPACE].showingFilmsCount;
};

export const getPlayingFilm = (state) => {
  return state[NAME_SPACE].playingFilm;
};
