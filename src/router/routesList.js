
import { Tune } from "@material-ui/icons";
import AddDrink from "../pages/administration/AddDrink";
import AddPlate from "../pages/administration/AddPlate";
import AddRestaurantInfo from "../pages/administration/restaurnatInfo/AddRestaurantInfo";
import AddStock from "../pages/administration/AddStock";
import TableScreen from "../pages/administration/ClientTables/TableScreen";
import DashboardMenu from "../pages/administration/DashboardMenu";
import StockList from "../pages/administration/StockList";
import TablesAdministration from "../pages/administration/TablesAdministration";
import SupplierInfo from "../pages/administration/SupplierInfo";



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
                },{
                    name: 'supplierInfo', iconName: <Tune />, path: '/SupplierInfo', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: SupplierInfo
                },{
                    name: 'addRestaurantInfo', iconName: <Tune />, path: '/AddRestaurantInfo', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddRestaurantInfo
                },
                
                {
                    name: 'addDrink', iconName: <Tune />, path: '/addDrink', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddDrink
                },
                {
                    name: 'addStock', iconName: <Tune />, path: '/addStock', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: AddStock
                }, {
                    name: 'stockList', iconName: <Tune />, path: '/stockList', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: StockList
                }, {
                    name: 'tablesAdministration', iconName: <Tune />, path: '/tablesAdministration', showInMenu: false, level: 2,
                    isPrivate: true, exact: true, component: TablesAdministration
                },
                
                
            ]
    }
]