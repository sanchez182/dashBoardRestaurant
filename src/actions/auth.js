import { fetchSinToken, fetchRenew } from '../helpers/fetch';
import Swal from 'sweetalert2';
import { checkingFinish, setAuthLogin ,logout} from '../store/actions/authActions';
import { getRestaurantData } from '../actionsApi/restaurantActionsApi';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'auth/login', { email, password }, 'POST' );
        const body = resp.data
        if( resp.status === 201 ) {
           dispatch(getRestaurantData(body)) //este id viene por param en la url principal
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    }
}
export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchRenew( 'auth/renew' );
    /*     const body = resp.data; */
        const body = await resp.json();
        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( setAuthLogin({
                checking: false,
                uid: body.uid,
                name: body.name
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( setAuthLogin({
                uid: body.uid,
                checking: false,
                name: body.name,
                idResturant: body.idResturant
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }


    }
}
 
export const startLogout = () => {
    return ( dispatch ) => {
        dispatch( logout() );
    }
}