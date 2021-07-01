import { Card, CardActionArea, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CropDinIcon from '@material-ui/icons/CropDin';
import { useTranslation } from 'react-i18next'
import { RootState } from '../../../store';
import Tables from '../../../components/Tables';


const TableScreen = () => {
    //tableList 
    const { t } = useTranslation();
    const { language } = useSelector((state) => state.lang);
    const { tableList } = useSelector((state) => state.restaurantData);
    const { orders } = useSelector((state) => state.restaurantData);
    if(orders){
        console.log(orders)
    }else{
        console.log("Sin ordenes")
    }



    return (
        <Grid container className={"imgFond"}>
            <Grid container style={{ marginTop: "48px" }}>
                <Grid item xs={6} md={6} >
                    <Card style={{ backgroundColor: "rgb(128 63 63 / 47%)" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2"
                                    color="textSecondary" component="p"
                                    align="center">
                                    <CropDinIcon color="error" /><br />
                                    {t("busy", language)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6} md={6} >
                    <Card style={{ backgroundColor: "rgb(128 63 63 / 47%)" }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p"
                                    align="center">
                                    <CropDinIcon color="primary" /> <br />
                                    {t("available", language)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid> 

            {tableList &&
                <Grid container >
                    {
                        //TODO: aca activar el flip de  las mesas q estan listas para cocina
                        tableList.map((table, index) => {
                            const isSelected = table.selected ? "error" : "primary"
                            const orderTable = orders.find( x => x.tableNumber === index+1) 
                            const flip = orderTable ? true : false
                            return <Tables order ={orderTable} key={table.tableNumber} numberTable={table.tableNumber} flipTable={flip}
                                isAvailable={isSelected} />
                        })
                    }

                </Grid>
            }

        </Grid>

    );
}

export default React.memo(TableScreen);