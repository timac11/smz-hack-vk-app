import {USERS_WERE_LOADED} from "../constants/state-constants";

const INITIAL_STATE = {
  users: []
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_WERE_LOADED:
      return {...state, users: action.payload};
    default:
      return {...state}
  }
}
