import {ACTIVE_PANEL_CHANGE, AUTHORIZE, IS_AUTHORIZED, USER_FETCHED} from "../constants/state-constants";

const INITIAL_STATE = {
  activePanel: "enterPage",
  user: null,
  role: null,
  loginedUser: null,
  userIsLoading: false,
  authorazed: false
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIVE_PANEL_CHANGE:
      return {...state, activePanel: action.payload};
    case USER_FETCHED:
      return {...state, user: action.payload};
    case IS_AUTHORIZED:
      return {...state,
        loginedUser: action.payload.user,
        role: action.payload.role,
        activePanel: action.payload.role
      };
    default:
      return {...state}
  }
}
