import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.FILM;

const getActiveGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};

const getShowingFilmsCount = (state) => {
  return state[NAME_SPACE].showingFilmsCount;
};

export {
  getActiveGenre,
  getShowingFilmsCount,
};
