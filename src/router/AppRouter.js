import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import LoginScreen from '../pages/auth/LoginScreen';
import Page404 from '../pages/404';
import RenderPrivateRoutes from './MenuRoutes';
import AlertComponent from '../components/AlertComponent';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    const screens = ["addPlate", "addDrink"]
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch])

    if (checking) {
        return (<h5>Espere un momento por favor...</h5>);
    }

    return (
        <>
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
                    component={Page404}
                    isAuthenticated={!!uid}
                />

            </Switch>
        </>

    )
}

export default AppRouter;