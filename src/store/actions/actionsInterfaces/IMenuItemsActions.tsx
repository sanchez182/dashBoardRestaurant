import { IModelMenuItem } from "../../../interfaces/IModelMenuItem";

export const SET_MENUITEM = 'SET_MENUITEM';

export interface MenuStage {
  items: IModelMenuItem;
}



interface SetMenuItemsAction {
  type: typeof SET_MENUITEM;
  payload: IModelMenuItem;
}

export type IMenuItemsActions = SetMenuItemsAction;