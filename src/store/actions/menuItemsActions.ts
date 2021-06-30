import { IModelMenuItem } from '../../interfaces/IModelMenuItem';
import { IMenuItemsActions,SET_MENUITEM } from './actionsInterfaces/IMenuItemsActions';

// add quatity of item to menu
export const setMenuItems = (items: IModelMenuItem): IMenuItemsActions => {
  return {
    type: SET_MENUITEM,
    payload: items
  }
}
