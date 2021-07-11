import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import LoginScreen from '../pages/auth/LoginScreen';
import Page404 from '../pages/404';
import RenderPrivateRoutes from './MenuRoutes';
import AlertComponent from '../components/AlertComponent';
import {SocketProvider} from '../context/SocketContext';
import { checkingFinish } from '../store/actions/authActions';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    const screens = ["addPlate", "addDrink","stockList","addStock"]
    useEffect(() => {
        if(!localStorage.getItem('token')){
            dispatch(checkingFinish());
        }
    }, [dispatch])

    if (checking) {
        return (<h5>Espere un momento por favor...</h5>);
    }

    return (
       

        <SocketProvider>
            <AlertComponent />
            <Switch>

                {!!uid && <RenderPrivateRoutes screens={screens} />}
                <PublicRoute
                    exact
                    path="/"
                    component={LoginScreen}
                />

                <PublicRoute
                    exact
                    path="*"
                    component={LoginScreen}
                    isAuthenticated={!!uid}
                />

            </Switch>
            </SocketProvider>

    )
}

export default AppRouter;