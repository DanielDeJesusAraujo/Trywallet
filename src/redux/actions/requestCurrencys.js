export const IS_LODING = 'IS_LODING';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FILURE = 'REQUEST_FILURE';

function requestStateLoding() {
  return {
    type: IS_LODING,
  };
}

function requestStateSuccess(payload) {
  return {
    type: REQUEST_SUCCESS,
    payload,
  };
}

function requestStateFilure(payload) {
  return {
    type: REQUEST_FILURE,
    payload,
  };
}

function requestingCurrency() {
  return async (dispatch) => {
    dispatch(requestStateLoding());
    try {
      const URL = 'https://economia.awesomeapi.com.br/json/all';
      const resouver = await fetch(URL);
      const data = await resouver.json();
      dispatch(requestStateSuccess(data));
    } catch (error) {
      dispatch(requestStateFilure(error.message));
    }
  };
}

export default requestingCurrency;
