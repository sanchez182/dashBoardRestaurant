import { SET_IMAGES,
  UPDATE_IMAGE,IImagesRestaurant,
  IImagesAction } from '../actions/actionsInterfaces/IImagesRestaurant';

const imagesReducer  = (state: IImagesRestaurant[] = [], action: IImagesAction) => {
  switch (action.type) {
    case SET_IMAGES:
      return  [ ...state,action.payload]
      
    case UPDATE_IMAGE:
      return  [ ...state,action.payload]
      
    default:
      return state;
  }
}

export default imagesReducer;