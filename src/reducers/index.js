import {combineReducers} from "redux";
import user from "./user";
import problems from "./problems"

export const rootReducer = combineReducers({
  user,
  problems
});

