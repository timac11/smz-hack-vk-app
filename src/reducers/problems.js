import {PROBLEMS_ARE_LOADING, PROBLEMS_WERE_LOADED} from "../constants/state-constants";

const INITIAL_STATE = {
  problems: [],
  isLoading: false
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROBLEMS_ARE_LOADING:
      return {...state, isLoading: action.payload};
    case PROBLEMS_WERE_LOADED:
      return {...state, problems: action.payload}
    default:
      return state;
  }
}
