import * as ActionTypes from "./actionTypes"

export const errorSetAction = error => ({
  type: ActionTypes.ERROR_SET,
  payload: error,
})

export const errorUnsetAction = error => ({
  type: ActionTypes.ERROR_UNSET,
})
