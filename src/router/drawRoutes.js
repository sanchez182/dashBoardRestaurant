import { Breadcrumbs } from "@material-ui/core";
import { Route } from "react-router"

const generateCrumbs=(props, component,result)=>{
    const routes = result;
    const crumbs = routes.filter(({path})=> props.match.path.includes(path)).map(
        ({path,...rest}) =>({
            path: Object.keys(props.match.params).length
                ? Object.keys(props.match.params).reduce(
                    (path, param)=> path.replace(`:${param}`, props.match.params[param]), path
                )
                :
                path,
                ...rest
        }));
        return <>
                <Breadcrumbs crumbs={crumbs}/>
                {component}
                </>
}

export const drawRoute = (routes,result)=>{
    return routes.map(({path, component, exact})=>{
        return component ?
            <Route key={path} exact={exact} path={path} render={(props)=> generateCrumbs(props, component,result)} />
            :
            <Route key={path} exact={exact} path={path} render={component} />

    })
}