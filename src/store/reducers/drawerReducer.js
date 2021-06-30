
export const OPEN_CLOSE = 'OPEN_CLOSE';

const initialState = {
    open: true
};

export default function draweReducer(stateProps, action) {
    const state = stateProps ? stateProps : initialState
    if(action.type === OPEN_CLOSE){
        return {
          ...state,
          open: action.value
        };
      }else{
        return state;
      }
    }