
import { Route } from 'react-router-dom';


export const PublicRoute = ({
    isAuthenticated,
    restricted,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}  render={props => (
             <Component {...props} />
        )} />
    )
}

/* PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
} */
