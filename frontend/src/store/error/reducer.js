import * as ActionTypes from "./actionTypes"

const initialState = {
  hasError: false,
  errorMessage: "",
  response: "",
}

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload.errorMessage,
        response: "",
      }
    case ActionTypes.ERROR_UNSET:
      return {
        ...state,
        hasError: false,
        errorMessage: "",
        response: "",
      }

    default:
      return state
  }
}

export default ErrorReducer
