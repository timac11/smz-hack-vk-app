import {ACTIVE_PANEL_CHANGE, AUTHORIZE, USER_FETCHED} from "../constants/state-constants";

const INITIAL_STATE = {
  activePanel: "enterPage",
  user: null,
  userIsLoading: false,
  authorazed: false
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE_PANEL_CHANGE:
      return {...state, activePanel: action.payload};
    case USER_FETCHED:
      return {...state, user: action.payload};
    case AUTHORIZE:
      return {...state, authorazed: true, activePanel: "home"};
    default:
      return {...state}
  }
}
