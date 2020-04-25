import {
  ACTIVE_PANEL_CHANGE,
  AUTHORIZE, CURRENT_PROBLEM_WAS_LOADED,
  IS_AUTHORIZED,
  PROBLEMS_WERE_LOADED,
  USER_FETCHED
} from "../constants/state-constants";
import {get, post} from "../ApiProvider";

export function changeActivePanel(payload) {
  return {
    type: ACTIVE_PANEL_CHANGE,
    payload
  }
}

export function userFetched(payload) {
  return {
    type: USER_FETCHED,
    payload
  }
}

export function authorize(payload) {
  return (dispatch, getState) => {
    const user = getState().user.user;
    const userPayload = {
      id: user.id,
      name: user.first_name,
      lastName: user.last_name,
      photo: user. photo_200,
      city: user.city.title,
    };
    return post("authorize", {
      user: userPayload
    }).then((result) => {
      console.log(result)
      dispatch(isAuthorized({user: result.data, role: payload}));
    });
  }
}

export function createProblem(payload) {
  return (dispatch, getState) => {
    const userId = getState().user.user.id;
    return post("create-problem", {
      userId,
      problem: payload
    }).then((result) => {
      dispatch(changeActivePanel("customer"))
    })
  }
}

export function fetchAllProblems() {
  return (dispatch, getState) => {
    return get(`get-author-problems/${getState().user.loginedUser.id}`)
      .then((result) => {
        dispatch(problemsWereFetched(result.data))
        console.log(result);
    })
  }
}

export function fetchAllAvailableExecutorProblems() {
  return (dispatch, getState) => {
    return get(`get-all-problems`)
      .then((result) => {
        dispatch(problemsWereFetched(result.data.filter(item => item.author.id !== getState().user.loginedUser.id)));
        console.log(result);
      })
  }
}

export function fetchAllProgressExecutorProblems() {
  return (dispatch, getState) => {
    return get(`get-all-problems`)
      .then((result) => {
        dispatch(problemsWereFetched(result.data.filter(item => item.responsible && item.responsible.id === getState().user.loginedUser.id)));
        console.log(result);
      })
  }
}

export function toBeResponsibleForProblem() {
  return (dispatch, getState) => {
    return post("problem/to-be-responsible", {
      userId: getState().user.loginedUser.id,
      problemId: getState().problems.currentProblem.id
    }).then((result) => {
      dispatch(currentProblemWasLoaded(result.data))
    })
  }
}

export function fetchCurrentProblem(id) {
  return (dispatch, getState) => {
    return get(`get-problem/${id}`)
      .then((result) => {
        dispatch(currentProblemWasLoaded(result.data));
      })
  }
}

export function currentProblemWasLoaded(payload) {
  return {
    type: CURRENT_PROBLEM_WAS_LOADED,
    payload
  }
}

export function problemsWereFetched(payload) {
  return {
    type: PROBLEMS_WERE_LOADED,
    payload
  }
}

export function isAuthorized(payload) {
  return {
    type: IS_AUTHORIZED,
    payload
  }
}
