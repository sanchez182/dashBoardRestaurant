
import { Route } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    restricted,
    history,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} history={history} render={props => (
             <Component {...props} />
        )} />
    )
}

/* PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
} */
