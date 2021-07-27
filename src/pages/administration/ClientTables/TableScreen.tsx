import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import Tables from '../../../components/Tables';
import { RootState } from '../../../store';
import { IOrder } from '../../../store/actions/actionsInterfaces/IOrdersActions';
import { ITableModel } from '../../../store/actions/actionsInterfaces/ITableActions';
import { getTableData } from '../../../actionsApi/tableActions';


const TableScreen = () => {
/*     //tableList 
    _id: string | null,
    tableNumber : number,
    selected : boolean ,
    type : string ,
    state : string , */
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { language } = useSelector((state:RootState) => state.lang);
    const  tableList: ITableModel[]  = useSelector((state:RootState) => state.tablesData);
    const {  orders } = useSelector((state:RootState)=> state.orderData);
  
    useEffect(() => { 
        dispatch(getTableData());
      }, [dispatch]);

    return (
        <Grid container className="flex-section">
            <Grid item xs={12} md={8}  className="flex-col-scroll">
            <h1> Ordenes en sitio</h1>
                {tableList &&
                    <Grid container >
                        {
                            tableList.map((table:any, index:number) => {
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
            </Grid>
        </Grid>
    );
}

export default React.memo(TableScreen);