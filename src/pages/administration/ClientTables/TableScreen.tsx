import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tables from '../../../components/Tables';
import { RootState } from '../../../store';
import { IOrder } from '../../../store/actions/actionsInterfaces/IOrdersActions';
import { ITableModel } from '../../../store/actions/actionsInterfaces/ITableActions';
import { getTableData } from '../../../actionsApi/tableActions';
import LensIcon from '@material-ui/icons/Lens';
import { IAppStatus } from '../../../store/actions/actionsInterfaces/IAppStatusActions';

const TableScreen = () => {
    const dispatch = useDispatch();
    const tableList: ITableModel[] = useSelector((state: RootState) => state.tablesData);
    const orders = useSelector((state: RootState) => state.orderData);
    const { orderStatus }: IAppStatus = useSelector((state: RootState) => state.appStatus);
    const lang = useSelector((state: RootState) => state.lang) //En BD se guardan los label{Letras en mayuscula}

    useEffect(() => {
        dispatch(getTableData());
    }, [dispatch]);

    const renderIndicators = (labelIndicator: string, icon: any) => {
        return <Grid item xs={12} md={3} justifyContent="center" style={{ display: "flex" }}>
            <p>{labelIndicator}</p>{icon}
        </Grid>
    }
    return (
        <Grid container className="flex-section">
            {orderStatus && orderStatus.map((element) => {
                return renderIndicators(element[`label${lang.language}`], <LensIcon style={{ color: element.color }} />)
            })}

            <Grid item xs={12} md={12} className="flex-col-scroll">
                <h1> Ordenes en sitio</h1>
                {orders && orders.length > 0 ?
                    <Grid container >
                        {
                            tableList.map((table: any, index: number) => {
                                const orderTable = orders ? orders.find((x: IOrder) => x.tableNumber === index + 1) : undefined
                                return orderTable && <Tables order={orderTable} key={table.tableNumber} numberTable={table.tableNumber} />
                            })
                        }
                    </Grid> :
                    <h3> Sin Ordenes</h3>}

            </Grid>
        </Grid>
    );
}

export default React.memo(TableScreen);