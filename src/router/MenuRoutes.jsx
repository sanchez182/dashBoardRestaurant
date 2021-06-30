import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardMenu from "../pages/administration/DashboardMenu"
import StartAppBar from "../components/Layout/StartAppBar"
import { PrivateRoute } from "./PrivateRoute"
import DrawerMenu from '../components/Layout/DrawerMenu';
import { routesList } from "./routesList"

let newRoutes = []

const recursiveRoutes = (routesList, routeName) => { 
    routesList.some((element) => {
        if (element.name === routeName) {
            element.showInMenu = true
            newRoutes.push(element)
            return true;
        } else {
            if (element.children) {
                recursiveRoutes(element.children, routeName)
            } else {
                const item = routesList.find(x => x.name === routeName)
                if(item){
                    item.showInMenu = true
                    newRoutes.push(item)
                }
                return true;
            }
        }
    })
}

const routes = (screens) => {
    screens.forEach((element) => {
        recursiveRoutes(routesList[0]["children"], element)
    })
    return newRoutes
}


export const RenderPrivateRoutes = ({ screens }) => {
    const { open } = useSelector((state) => state.drawerState);
    const [routesState, setRoutes] = useState(null)

    useEffect(() => {
        setRoutes(routes(screens))
    }, [screens])

    return (
        
            <>
                <StartAppBar />
                <DrawerMenu routes={routesList} />
 
        <main className={open ? "contentOpen" : "content"}   >
            <PrivateRoute
                exact
                path={"/dashboarMenu"}
                component={DashboardMenu}
                isAuthenticated={true}
            />
            {
                routesState && routesState.map((element, index) => {
                    return <PrivateRoute
                        key={index}
                        exact
                        path={element.path}
                        component={element.component}
                        isAuthenticated={true}
                    />
                })
            } 
        </main>
        </>
    )
}

export default React.memo(RenderPrivateRoutes)