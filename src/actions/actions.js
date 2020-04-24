import {ACTIVE_PANEL_CHANGE, USER_FETCHED} from "../constants/state-constants";

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
