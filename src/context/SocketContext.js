import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../hooks/useSocket'
import { checkRestaurantTableSeledted, setOrderState } from '../store/actions/restaurantActions';
export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4002');
    const { uid } = useSelector(state => state.auth);
    const { _id, tableList, orders } = useSelector((state) => state.restaurantData);
    const dispatch = useDispatch()

    useEffect(() => {
        if (uid) {
            conectarSocket();
        }
    }, [uid, conectarSocket]);

    useEffect(() => {
        if (!_id) {
            desconectarSocket();
        }
    }, [_id, desconectarSocket]);

    //TODO: modificar forma de cambiar la data de la mesa seleccionada
    useEffect(() => {
        socket?.on('table', (mensaje) => {
            debugger
            const table = tableList.find(x => x.tableNumber === mensaje.tableNumber)
            const index = tableList.findIndex(x => x.tableNumber === mensaje.tableNumber)
            table.selected = mensaje.selected
            tableList[index] = table
            dispatch(checkRestaurantTableSeledted(tableList))
        })

    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('newOrder', (data) => {
            debugger
            const {_id,state,idRestaurant,itemsOrder,tableNumber} = data
            const orderList = []
            orderList.push({
                _id,
                state,
                tableNumber,
                idRestaurant,
                itemsOrder
            })
            dispatch(setOrderState(orderList))
        })

    }, [socket, dispatch]);

    /*     useEffect(() => {
            socket?.on('newOrder', (orderDB) => {
                debugger
                state: "Enviado",
                idRestaurant: _id,
                itemsFood: renderFood, // mesa seleccionada
                itemsDrink: renderDrink
    
                const order = orders.find(x => x.idOrder === orderDB._id)
                const index = orders.findIndex(x => x.idOrder === orderDB._id)
                order.state = orderDB.orderState
                orders[index] = order
                dispatch(setOrderState(orders))
            })
    
        }, [socket, dispatch]); */
    //    //{ idOrder: payload._id, orderState: payload.state }


    useEffect(() => {
        socket?.on('orderChange', (changeInOrder) => {
            debugger
            console.log("la orden seleccionada" + " " + changeInOrder)
        })
    }, [_id, socket]);
    useEffect(() => {
        socket?.on('testSocket', (mensaje) => {
            debugger
            console.log(mensaje)
        })

    }, [socket, dispatch]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}