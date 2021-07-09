import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    debugger
    //
    return (
        <Route { ...rest }
        component={ (props) => (
            ( isAuthenticated )
                ? ( <Component { ...props } /> )
                : ( <Redirect to="/" /> )
        )}
    
    />
    )
}

export default React.memo(PrivateRoute)