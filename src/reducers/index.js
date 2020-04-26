import {combineReducers} from "redux";
import user from "./user";
import problems from "./problems";
import users from "./users";

export const rootReducer = combineReducers({
  user,
  problems,
  users
});

