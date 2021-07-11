import RestaurantService from "../services/RestaurantService";
import { setAuthLogin } from "../store/actions/authActions";
import { apiCallSuccess } from "../store/actions/requestActions";
import { setRestaurantData } from "../store/actions/restaurantActions";
 
 


 const service = new RestaurantService();

 export const getRestaurantData = (body)=>async(dispatch)=>{
    const response = await service.getRestaurantData()
    dispatch(setRestaurantData(response.data))
    dispatch(apiCallSuccess())
    dispatch( setAuthLogin({
      checking: false,
      uid: body.uid,
      name: body.name,
      token: body.token ,
      tokenExpiresIn: body.expiresIn
  }) )
 }