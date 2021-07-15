import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CropDinIcon from '@material-ui/icons/CropDin';
import { useTranslation } from 'react-i18next'
import Tables from '../../../components/Tables';
import { RootState } from '../../../store';
import { IOrder } from '../../../store/actions/actionsInterfaces/IOrdersActions';


const TableScreen = () => {
    //tableList 
    const { t } = useTranslation();
    const { language } = useSelector((state:RootState) => state.lang);
   // const { tableList } = useSelector((state:RootState) => state.restaurantData.restaurantInfo);
    const {  orders } = useSelector((state:RootState)=> state.orderData);
    if (orders) {
        console.log(orders)
    } else {
        console.log("Sin ordenes")
    }

    return (
        <Grid container className="flex-section">
     {/*        <Grid item xs={12} md={8}  className="flex-col-scroll">
            <h1> Ordenes en sitio</h1>
                {tableList &&
                    <Grid container >
                        {
                            //TODO: aca activar el flip de  las mesas q estan listas para cocina
                            tableList.map((table, index) => {
 
debugger
                                const orderTable = orders ? orders.find((x:IOrder) => x.tableNumber === index + 1) : undefined
                                const flip = orderTable ? true : false
                                return <Tables order={orderTable} key={table.tableNumber} numberTable={table.tableNumber} flipTable={flip}
                                    isSelected={table.selected} />
                            })
                        }
                    </Grid>
                }
            </Grid>

            <Grid item xs={12} md={4}  className="flex-col-scroll">
                <h1> Ordenes vía web</h1>
                {tableList &&
                    <Grid container >
                        {
                            //TODO: aca activar el flip de  las mesas q estan listas para cocina
                            tableList.map((table, index) => {

                                const orderTable = orders.find((x:IOrder )=> x.tableNumber === index + 1)
                                const flip = orderTable ? true : false
                                return <Tables order={orderTable} key={table.tableNumber} numberTable={table.tableNumber} flipTable={flip}
                                    isSelected={table.selected} />
                            })
                        }
                    </Grid>
                }
            </Grid> */}
        </Grid>
    );
}

export default React.memo(TableScreen);