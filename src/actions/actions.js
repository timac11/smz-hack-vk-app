import {ACTIVE_PANEL_CHANGE, AUTHORIZE, IS_AUTHORIZED, USER_FETCHED} from "../constants/state-constants";
import {post} from "../ApiProvider";

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
      inn: payload
    };
    return post("authorize", {
      user: userPayload
    }).then((result) => {
      dispatch(isAuthorized(result.data));
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
      dispatch(changeActivePanel("home"))
    })
  }
}

export function isAuthorized(payload) {
  return {
    type: IS_AUTHORIZED,
    payload
  }
}
