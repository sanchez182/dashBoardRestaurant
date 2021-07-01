import { Card, CardHeader, CardActionArea, CardActions, Button, CardContent, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck';
import FlipCard from '../components/FlipCard'
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import { IOrders } from '../store/actions/actionsInterfaces/IRestaurantActions';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
interface TablesType {
    numberTable: number;
    isAvailable: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    flipTable: boolean,
    order: IOrders
}




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        avatar: {
            backgroundColor: red[500],
        },
        paper: {
            margin: theme.spacing(1),
        },
    }),
);

const Tables = ({ numberTable, isAvailable, flipTable, order }: TablesType) => {
    debugger
    const classes = useStyles();
    return (
        <Grid item xs={4} md={4} >
            <Card className={classes.root} style={{ backgroundColor: " #f1f1f196" }} >
                <CardActionArea>
                    <CardHeader className={classes.avatar}
                        avatar={
                            <Avatar  >
                                <DeckIcon fontSize={"large"}
                                    color={isAvailable} />
                            </Avatar>
                        }
                        title={<p
                            style={{
                                marginLeft: "16px",
                                marginTop: "8px"
                            }}
                        > #{numberTable}</p>}
                    />
                    <Grow
                        in={flipTable}
                        style={{ transformOrigin: '0 0 0' }}
                        {...(flipTable ? { timeout: 1000 } : {})}
                    >
                        <>
                            {order && (order.itemsOrder.itemsFood.length > 0 || order.itemsOrder.itemsDrink.length > 0) &&
                                <CardContent style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                }}>
                                    <div>
                                        {
                                            order.itemsOrder.itemsFood.length > 0 && order.itemsOrder.itemsFood.map((food: any) => {
                                                return <div style={{   display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                                                    <strong>  <p>{food.plateName} Cant: {food.cant} </p> </strong>
                                                    <Button size="small" variant="contained" color="primary"
                                                    style={{   marginLeft :'12px'}}
                                                     onClick={() => console.log("Botomo")}>
                                                        Receta
                                                    </Button>
                                                </div>
                                            })
                                        }
                                        <br />
                                        {
                                            order.itemsOrder.itemsDrink.length > 0 && order.itemsOrder.itemsDrink.map((drink: any) => {
                                                return <div style={{    display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                                                    <strong><p>{drink.drinkName}  Cant: {drink.cant}</p></strong> 
                                                    <Button size="small" variant="contained" color="primary"
                                                    style={{   marginLeft :'12px'}}
                                                    onClick={() => console.log("Botomo")}>
                                                        Receta
                                                    </Button>
                                                </div>
                                            })
                                        }
                                    </div>

                                </CardContent>
                            }
                        </>
                    </Grow>

                </CardActionArea>
                <Grow
                    in={flipTable}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(flipTable ? { timeout: 1000 } : {})}
                >
                    <CardActions>
                        <Button variant="contained" size="small" color="primary">
                            Procesar Orden
                        </Button>
                        <Button variant="contained" size="small" color="primary"
                            onClick={() => { }} >
                            Orden finalizada
                        </Button>
                    </CardActions>
                </Grow>
            </Card>

        </Grid>
    );
}

export default Tables;
