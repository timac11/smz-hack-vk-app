import {ACTIVE_PANEL_CHANGE, USER_FETCHED} from "../constants/state-constants";

const INITIAL_STATE = {
  activePanel: "home",
  user: null
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE_PANEL_CHANGE:
      return {...state, activePanel: action.payload};
    case USER_FETCHED:
      return {...state, user: action.payload};
    default:
      return {...state}
  }
}
