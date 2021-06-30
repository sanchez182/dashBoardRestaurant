import { ILangActions,SET_LANGUAGE } from './actionsInterfaces/ILangActions';

// Set language
export const setLanguage = (lang: string): ILangActions => {
  localStorage.setItem('language', lang);
  return {
    type: SET_LANGUAGE,
    payload: lang
  }
}