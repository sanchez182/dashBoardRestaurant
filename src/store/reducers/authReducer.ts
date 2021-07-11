import { IAuthActions,IPayloadAuth, SET_AUTH_LOGIN,CHECKING_FINISH,AUTH_LOGOUT } from "../actions/actionsInterfaces/IAuthActions"

 

const initialState: IPayloadAuth = {
     checking: true,
     uid: null,
     name: null,
     token: null ,
     tokenExpiresIn: null,
     idRestaurant: null,
     wasDasborad: false
}

export const authReducer = ( state = initialState, action : IAuthActions ) => {
    switch ( action.type ) {
        
        case SET_AUTH_LOGIN:
            return {
                ...state,
                ...action.payload
            }
   
        case CHECKING_FINISH:
            return {
                ...state,
                checking: false
            }

        case AUTH_LOGOUT:
            return {
                checking: false,
                wasDasborad: true
            }
 

        default:
            return state;
    }

}


