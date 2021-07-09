
import { Tune } from "@material-ui/icons";
import AddDrink from "../pages/administration/AddDrink";
import AddPlate from "../pages/administration/AddPlate";
import AddStock from "../pages/administration/AddStock";
import TableScreen from "../pages/administration/ClientTables/TableScreen";
import DashboardMenu from "../pages/administration/DashboardMenu";


export const routesList = [
    {
        isPrivate: true,
        exact: true,
        name: 'dashboarMenu',
        path: '/dashBoardRestaurant',
        component: DashboardMenu,
        iconName: <Tune />,
        showInMenu: true,
        level: 1,
        children:
            [
                {
                    name: 'addPlate', iconName: <Tune />, path: '/addPlate', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddPlate
                },
                {
                    name: 'addDrink', iconName: <Tune />, path: '/addDrink', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddDrink
                },
                {
                    name: 'addStock', iconName: <Tune />, path: '/addStock', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddStock
                },
            ]
    }
]