/* eslint-disable require-jsdoc */
import axios from "./axios"
import store from "../store/index"
import {
  loaderRemoveAction,
  loaderRequestAction,
} from "../store/loading/actions"
import { ERROR_SET, ERROR_UNSET } from "../store/error/actionTypes"
export function doGet(url, loading = false) {
  store.dispatch({
    type: ERROR_UNSET,
  })
  if (loading) {
    store.dispatch(loaderRequestAction())
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => {
        if (response.status === 200) {
          resolve(response)
        } else if (response.status === 400) {
          handleResponse400(response)
          reject(response)
        } else if (response.status === 500) {
          handleBackendResponse500(response, url)
          reject("API call Failed")
        } else if (response.status === 404) {
          handleResponse404(response)
          reject(response)
        } else {
          handleResponseNot200(response)
          reject(response)
        }
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
      .catch(error => {
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
        handleApiError(error, url)
        reject(error, "API call failed")
      })
  })
}

export function doPost(url, data, loading = false) {
  store.dispatch({
    type: ERROR_UNSET,
  })
  return new Promise((resolve, reject) => {
    if (loading) {
      store.dispatch(loaderRequestAction())
    }
    axios
      .post(url, data)
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          resolve(response)
        }
        if (response.status === 204) {
          showErrorMessage(response)
          reject("API call Failed")
        } else if (response.status === 400) {
          handleResponse400(response)
          reject(response)
        } else if (response.status === 500) {
          handleBackendResponse500(response, url)
          reject("API call Failed")
        } else {
          handleResponseNot201(response)
          reject(response)
        }
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
      .catch(error => {
        handleApiError(error, url, data)
        reject("API call failed")

        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
        handleApiError(error, url)
        reject(error, "API call failed")
      })
  })
}

export function doPut(url, data, loading = false) {
  store.dispatch({
    type: ERROR_UNSET,
  })
  if (loading) {
    store.dispatch(loaderRequestAction())
  }
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          resolve(response)
        } else if (response.status === 204) {
          handleResponse204(response)
          reject(response)
        } else {
          handleResponseNot201(response)
          reject(response)
        }
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
      .catch(error => {
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
        handleApiError(error, url, data)
        reject(error)
      })
  })
}

export function doPatch(url, data, loading = false) {
  store.dispatch({
    type: ERROR_UNSET,
  })
  if (loading) {
    store.dispatch(loaderRequestAction())
  }
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          resolve(response)
        } else if (response.status === 204) {
          handleResponse204(response)
          reject(response)
        } else {
          handleResponseNot200(response)
          reject(response)
        }
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
      .catch(error => {
        handleApiError(error, url, data)
        reject(error)
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
  })
}

export function doDelete(url, data, loading = false) {
  store.dispatch({
    type: ERROR_UNSET,
  })
  if (loading) {
    store.dispatch(loaderRequestAction())
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(response => {
        if (response.status === 201) {
          resolve(response)
        } else if (response.status === 400) {
          handleResponse400(response)
          reject(response)
        } else if (response.status === 404) {
          handleResponse404(response)
          reject(response)
        } else {
          handleResponseNot200(response)
          reject(response)
        }
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
      .catch(error => {
        handleApiError(error, url, data)
        reject(error)
        if (loading) {
          store.dispatch(loaderRemoveAction())
        }
      })
  })
}

function handleResponse400(response) {
  showErrorMessage(response)
}
function handleResponse404(response) {
  showErrorMessage(response)
}

function handleResponseNot200(response) {
  showErrorMessage(response)
}
function handleResponseNot201(response) {
  showErrorMessage(response)
}
function handleResponse204(response) {
  showErrorMessage(response)
}

function handleBackendResponse500(response, url, data) {
  showErrorMessage("Internal Server Error")
}
function handleApiError(error, url, data) {
  //
  if (error.message === "Network Error") {
    showErrorMessage("No Internet Connection")
  } else {
    if (error.status === 500) {
      showErrorMessage(error)
    }
    showErrorMessage(error.message)
  }
}

function showErrorMessage(message) {
  //

  if (!message) {
    message = ""
  }
  store.dispatch({
    type: ERROR_SET,
    payload: { errorMessage: message },
  })
}
