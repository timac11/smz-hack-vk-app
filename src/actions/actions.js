import {ACTIVE_PANEL_CHANGE, AUTHORIZE, USER_FETCHED} from "../constants/state-constants";

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

export function authorize() {
  return {
    type: AUTHORIZE
  }
}
