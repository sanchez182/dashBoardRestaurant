export const API_CALL_START = 'API_CALL_START';
export const API_CALL_ERROR = 'API_CALL_ERROR';
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS';

export function apiCallStart() {
  return {
    type: API_CALL_START,
  }
}

export function apiCallError() {
  return {
    type: API_CALL_ERROR,
  }
}
export function apiCallSuccess() {
  return {
    type: API_CALL_SUCCESS,
  }
}

