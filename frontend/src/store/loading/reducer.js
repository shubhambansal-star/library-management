import * as ActionTypes from "./actionTypes"

const initialState = {
  loading: false,
}

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADER_REQUEST:
      return {
        loading: true,
      }
    case ActionTypes.LOADER_REMOVE:
      return {
        loading: false,
      }

    default:
      return state
  }
}

export default loaderReducer
