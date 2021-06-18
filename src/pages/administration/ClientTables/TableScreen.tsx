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
    const { language } = useSelector((state: RootState) => state.lang);
    const { tableList } = useSelector((state: RootState) => state.restaurantData);


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
                                    <CropDinIcon color="error" /><br/>
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
                                        <CropDinIcon color="primary" /> <br/>
                                        {t("available", language)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>


            <Grid container >
                {
                    tableList.map((table: any) => {
                        const isSelected = table.selected ? "error" : "primary"
                        return <Tables key={table.tableNumer} numberTable={table.tableNumer}
                            isAvailable={isSelected} />
                    })
                }

            </Grid>
        </Grid>

    );
}

export default React.memo(TableScreen);