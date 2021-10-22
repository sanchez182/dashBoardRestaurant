import { Card, CardHeader, CardActionArea, CardActions, 
    Checkbox,
    Button, CardContent, Grid, makeStyles, createStyles, Theme } from '@material-ui/core';
import DeckIcon from '@material-ui/icons/Deck';
import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import { IOrder } from '../store/actions/actionsInterfaces/IOrdersActions';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { IAppStatus } from '../store/actions/actionsInterfaces/IAppStatusActions';
import { updateOrderStatus } from '../actionsApi/orderActions';
import { checkItemIsReady, updateOrderStatusAction } from '../store/actions/ordersActions';
interface TablesType {
    numberTable: number;
    order: IOrder
}




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "90%",
            marginBottom: "6px"
        },
        paper: {
            margin: theme.spacing(1),
        },
    }),
);

const Tables = ({ numberTable, order }: TablesType) => {
    const classes = useStyles();
    //2 = orden cancelada
    const avatar = order && order?.state === 2 ? "red" : (order?.state === 1 ? "#b7ce3f" : "#0062cca1")

    const { _id } = useSelector((state: RootState) => state.restaurantData.restaurantInfo);
    const { orderStatus }: IAppStatus = useSelector((state: RootState) => state.appStatus);
    const lang = useSelector((state: RootState) => state.lang).language //En BD se guardan los label{Letras en mayuscula}
    const dispatch = useDispatch()
    const { socket } = useContext(SocketContext);
   debugger

    const takeOrder = () => {
        const newState : number = 3
        updateOrderStatus(newState,order?._id).then(()=>{
            dispatch(updateOrderStatusAction([{_id: order._id, state: newState}]))
            socket.emit('change-order-status', {
                state: newState, //orden en proceso
                idRestaurant: _id,
                orderId: order?._id,
                clientId: order?.clientId
            });
        })
    }

    return (
        <Grid item xs={12} md={4} >

            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
            >
                <Card className={classes.root} style={{ backgroundColor: "#f1f1f196" }} >
                    <CardActionArea>
                        <CardHeader style={{ backgroundColor: avatar }}
                            avatar={
                                <Avatar  >
                                    <DeckIcon fontSize={"large"}
                                        color="primary" />
                                </Avatar>
                            }
                            title={<p
                                style={{
                                    marginLeft: "16px",
                                    marginTop: "8px"
                                }}
                            > Mesa #{numberTable}</p>}
                            subheader={orderStatus && `Estado : ${orderStatus.find((x) => x.id === order.state)[`label${lang}`]}`}
                        />
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
                                                return <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <strong>  <p>{food.plate.plateName} Cant: {food.quantity} </p> </strong>
                                                            <Checkbox checked={food.isReady} onChange={(e)=>dispatch(checkItemIsReady({
                                                                _id: food.plate._id, 
                                                                order: order._id,
                                                                isReady: e.target.checked}))} name="gilad" />
                                                </div>
                                            })
                                        }
                                        <br />
                                        {
                                            order.itemsOrder.itemsDrink.length > 0 && order.itemsOrder.itemsDrink.map((drink: any) => {
                                                return <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <strong><p>{drink.drink.drinkName}  Cant: {drink.quantity}</p></strong>
                                                    <Checkbox checked={drink.isReady} onChange={(e)=>dispatch(checkItemIsReady({
                                                                _id: drink.drink._id, 
                                                                order: order._id,
                                                                isReady: e.target.checked}))} name="gilad" />
                                                </div>
                                            })
                                        }
                                        {order.extraInfo &&
                                            <p><strong>Observaciones : </strong> {order.extraInfo}</p>
                                        }
                                    </div>

                                </CardContent>
                            }
                        </>
                    </CardActionArea>
                    <CardActions>
                        <Button variant="contained" onClick={takeOrder} size="small" color="primary">
                            Procesar Orden
                        </Button>
                        <Button variant="contained" size="small" color="primary"
                            onClick={() => { }} >
                            Finalizar Orden
                        </Button>
                    </CardActions>
                </Card>
            </Grow>
        </Grid>
    );
}

export default Tables;
