import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as film} from "./film/film.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.FILM]: film,
  [NameSpace.USER]: user,
});
