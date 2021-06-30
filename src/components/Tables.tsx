import { Card, CardHeader, CardActionArea, CardContent, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck';
import FlipCard from '../components/FlipCard'
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { useState } from 'react';
import { IOrders } from '../store/actions/actionsInterfaces/IRestaurantActions';

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
    }),
);

const Tables = ({ numberTable, isAvailable, flipTable, order }: TablesType) => {
debugger
    const classes = useStyles();
    const [flip, setFlip] = useState(true)

    const front = () => {
        return (<Card style={{ backgroundColor: " #f1f1f196" }} >
            <CardActionArea onClick={() => setFlip(false)}>
                <CardContent style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                    <DeckIcon fontSize={"large"}
                        color={isAvailable} />
                    <p
                        style={{
                            marginLeft: "16px",
                            marginTop: "8px"
                        }}
                    > #{numberTable}</p>
                </CardContent>
            </CardActionArea>
        </Card>)
    }

    const back = () => {
        return (<Card className={classes.root} style={{ backgroundColor: " #f1f1f196" }} >
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
                {order && (order.itemsOrder.itemsFood.length > 0 || order.itemsOrder.itemsDrink.length > 0) &&
                    <CardContent style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <div>
                            {
                                order.itemsOrder.itemsFood.length > 0  && order.itemsOrder.itemsFood.map((food: any) => {
                                    return <p>{food.plateName} <strong> Cant: {food.cant}</strong> Ver receta...</p>
                                })
                            }
                            <br />
                            {
                                order.itemsOrder.itemsDrink.length > 0  &&  order.itemsOrder.itemsDrink.map((drink: any) => {
                                    return <p>{drink.drinkName} <strong> Cant: {drink.cant}</strong> </p>
                                })
                            }
                        </div>

                    </CardContent>
                }
            </CardActionArea>
        </Card>)
    }
    return (
        <Grid item xs={4} md={4} >

            <FlipCard setFlip={setFlip} flip={flipTable && flip} FrontComponent={front()} BackComponent={back()}
            />

        </Grid>
    );
}

export default Tables;
