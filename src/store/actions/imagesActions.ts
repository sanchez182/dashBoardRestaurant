import { SET_IMAGES,
  UPDATE_IMAGE ,IImagesRestaurant,
  IImagesAction} from './actionsInterfaces/IImagesRestaurant';


export const setImages = (payload: IImagesRestaurant):
IImagesAction => {
  
  return {
    type: SET_IMAGES,
    payload 
  }
}

export const updateImages = (payload: any):
IImagesAction => {
  return {
    type: UPDATE_IMAGE,
    payload 
  }
}
