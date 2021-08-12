import RestaurantService from "../services/RestaurantService";
import UtilsService from "../services/UtilsService";
import store from "../store";
import { setAppStatus } from "../store/actions/appStatusActions";
import { setAuthLogin } from "../store/actions/authActions";
import { setOpenMessageAlert } from "../store/actions/messageAlertActions";
import { setRestaurantData } from "../store/actions/restaurantActions";

const service = new RestaurantService();
const utilsService = new UtilsService();

const dispatch = store.dispatch;

export const getRestaurantData = (body) => async (dispatch) => {
  dispatch(setAuthLogin({
    checking: false,
    uid: body.uid,
    name: body.name,
    token: body.token,
    tokenExpiresIn: body.expiresIn
  }))
  Promise.all([service.getRestaurantData(), utilsService.getAppStatus()]).then(response => {
    const [restaurantData, status] = response
    dispatch(setRestaurantData({ restaurantInfo: restaurantData.data }))
    dispatch(setAppStatus(status.data))
  })
}


export const updateRestaurantInfo = async (body) => {
  const response = await service.updateRestaurantInfo(body)
  dispatch(setOpenMessageAlert({ show: true, message: 'Se actualizo la información correcatemente', severity: 'success' }));
  dispatch(setRestaurantData({ restaurantInfo: response.data.restaurant.value }))
  return true
}
