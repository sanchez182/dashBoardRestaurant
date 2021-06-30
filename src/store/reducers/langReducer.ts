  
import { ILangActions,SET_LANGUAGE,LangState} from '../actions/actionsInterfaces/ILangActions';

const localSorageLang = localStorage.getItem('language');

const initialState: LangState = {
  language: localSorageLang ? localSorageLang : 'EN'
}

const langReducer = (state = initialState, action: ILangActions) => {
  switch(action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      }
    default:
      return state;
  }
}

export default langReducer;