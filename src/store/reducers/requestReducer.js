import { API_CALL_ERROR, API_CALL_START, API_CALL_SUCCESS } from "../actions/requestActions";

 

  const initialState = {
    error: false,
    loadingRequest: false
  };

  export default function requestReducer(stateProps, action) {
    const state = stateProps ? stateProps : initialState
    switch(action.type) {
        case API_CALL_START:
        return {
            ...state,
            error: false,
            loadingRequest: true
        }
    case API_CALL_ERROR:
        return {
            ...state,
             error: true,
            loadingRequest: false
        }
        case API_CALL_SUCCESS:
          return {
              ...state,
              error: false,
              loadingRequest: false
          }

      default:
        return state;
    }
  }
