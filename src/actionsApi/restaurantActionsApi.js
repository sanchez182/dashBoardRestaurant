import RestaurantService from "../services/RestaurantService";
import { setAuthLogin } from "../store/actions/authActions";
import { setRestaurantData } from "../store/actions/restaurantActions";
 
 


 const service = new RestaurantService();

 export const getRestaurantData = (idRestaurant,body)=>async(dispatch)=>{
    const response = await service.getRestaurantData(idRestaurant)
    dispatch(setRestaurantData(response.data))
    dispatch( setAuthLogin({
      checking: false,
      uid: body.uid,
      name: body.name,
      idRestaurant: body.idRestaurant
  }) )

  localStorage.setItem('token', body.token );
  localStorage.setItem('token-expiresIn', body.expiresIn );
 }