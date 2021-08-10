import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, getOrderById } from '../actionsApi/orderActions';
import { updateTable } from '../actionsApi/tableActions';
import { useSocket } from '../hooks/useSocket'
import { setOrderState } from '../store/actions/ordersActions';
import { checkRestaurantTableSeledted } from '../store/actions/tableActions';
export const SocketContext = createContext();
 

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4002');
    const { uid } = useSelector(state => state.auth);
    const { _id } = useSelector((state) => state.restaurantData.restaurantInfo);
    const {  orders } = useSelector((state) => state.orderData);
    const tableList = useSelector((state) => state.tablesData);
    
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
        socket?.on('table', (seletedTable) => {
            debugger
            //_id: string
            const table = tableList.find(x => x._id === seletedTable._id)
            table.selected =  seletedTable.isSelected
            updateTable(seletedTable._id,table).then((response=>{
debugger
            }))
           
    /*          const index = tableList.findIndex(x => x.tableNumber === seletedTable.tableNumber)
            table.selected = seletedTable.selected
            tableList[index] = table
            dispatch(checkRestaurantTableSeledted(tableList)) */
        })

    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('new-order', (data) => {
            debugger 
            createOrder(data).then(response=>{
                debugger
                const {_id,state,restaurant,itemsOrder,tableNumber} = response.order
                orders.push({
                    _id,
                    state,
                    tableNumber,
                    idRestaurant: restaurant,
                    itemsOrder
         /*       getOrderById(response.Order._id).then(algo=>{
                   debugger
               
            }) */
               })
                
            
            dispatch(setOrderState(orders))
            })
           
        })

    }, [socket, dispatch]);

    /*     useEffect(() => {
            socket?.on('newOrder', (orderDB) => {
                
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



    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}