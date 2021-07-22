export const SET_IMAGES = 'SET_IMAGES';
export const UPDATE_IMAGE = 'UPDATE_IMAGE';
 

export interface IImagesRestaurant{
  _id: string | null,
  file : string,
  name : string ,
}


interface SetImagesAction {
  type: String;
  payload: IImagesRestaurant[];
}

export type IImagesAction = SetImagesAction;