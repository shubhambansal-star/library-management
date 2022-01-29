// export const LOADER_REQUEST="LOADER_REQUEST"
// export const LOADER_REMOVE="LOADER_REMOVE

import * as ActionTypes from "./actionTypes"

export const loaderRequestAction = () => ({
  type: ActionTypes.LOADER_REQUEST,
})

export const loaderRemoveAction = () => ({
  type: ActionTypes.LOADER_REMOVE,
})
