import { OPEN_ALERT } from "../actions/messageAlertActions";

 
  const initialState = {
    message: [],
    severity: 'success',
    show: false,
    duration: 0
  };
  
  export default function alertComponentReducer(stateProps, action) {
    const state = stateProps ? stateProps : initialState
    if (action.type === OPEN_ALERT) {
      return {
        ...state,
        show: action.show,
        severity: action.severity,
        message: action.message,
        duration: action.duration
      };
    } else {
      return state;
    }
  }