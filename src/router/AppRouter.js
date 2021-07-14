import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import LoginScreen from '../pages/auth/LoginScreen';
import { ThemeProvider } from '@material-ui/styles';
import RenderPrivateRoutes from './MenuRoutes';
import AlertComponent from '../components/AlertComponent';
import {SocketProvider} from '../context/SocketContext';
import { checkingFinish } from '../store/actions/authActions';
import themeMUI from '../config/themeMUI';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, token, uid } = useSelector(state => state.auth);

    const screens = ["addRestaurantInfo","addPlate", "addDrink","stockList","addStock"]
    useEffect(() => {
        if(!token){
            dispatch(checkingFinish());
        }
    }, [dispatch,token])

    if (checking) {
        return (<h5>Espere un momento por favor...</h5>);
    }

    return (
       

        <SocketProvider>
        <ThemeProvider theme={themeMUI}>
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
            </ThemeProvider>
            </SocketProvider>

    )
}

export default AppRouter;