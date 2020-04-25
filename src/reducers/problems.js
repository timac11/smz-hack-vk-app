import {CURRENT_PROBLEM_WAS_LOADED, PROBLEMS_ARE_LOADING, PROBLEMS_WERE_LOADED} from "../constants/state-constants";

const INITIAL_STATE = {
  problems: [],
  isLoading: false,
  currentProblem: null
};

export default function baseState(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROBLEMS_ARE_LOADING:
      return {...state, isLoading: action.payload};
    case PROBLEMS_WERE_LOADED:
      return {...state, problems: action.payload, isLoading: false};
    case CURRENT_PROBLEM_WAS_LOADED:
      return {...state, currentProblem: action.payload};
    default:
      return state;
  }
}
