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
    const  orders = useSelector((state) => state.orderData);
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
            const newOrder = [...orders]
            const {_id,state,extraInfo,restaurant,itemsOrder,tableNumber} = data
            const exists = newOrder.findIndex((x)=> x._id === data._id)
            if(exists > 0){
                newOrder[exists] = data
            }else{
                newOrder.push({
                _id,
                state,
                extraInfo,
                tableNumber,
                idRestaurant: restaurant,
                itemsOrder
           })
            }
        dispatch(setOrderState(newOrder))
           
        })

    }, [socket, dispatch]);
    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}