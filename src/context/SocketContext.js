/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateTable } from '../actionsApi/tableActions';
import { useSocket } from '../hooks/useSocket'
import { setOrderState, updateSocketClientId } from '../store/actions/ordersActions';
export const SocketContext = createContext();
 

export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(process.env.REACT_APP_SOCKET_API);
/*     const { uid } = useSelector(state => state.auth); */
    const { _id } = useSelector((state) => state.restaurantData.restaurantInfo);
    const tableList = useSelector((state) => state.tablesData); 
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (_id) {
            conectarSocket();
        }
    }, [conectarSocket]);

    useEffect(() => {
        if (!_id) {
            desconectarSocket();
        }
    }, [_id, desconectarSocket]);

    //TODO: modificar forma de cambiar la data de la mesa seleccionada
     useEffect(() => {
        socket?.on('table', (seletedTable) => {
            const table = tableList.find(x => x._id === seletedTable._id)
            table.selected =  seletedTable.isSelected
            createOrUpdateTable(table)
        })

    }, [socket, dispatch]); 

    useEffect(() => {
        socket?.on('new-client-id-order', (order) => {
            debugger
             dispatch(updateSocketClientId([order]))
        })

    }, [socket, dispatch]); 


    
    useEffect(() => {
        socket?.on('new-order', (order) => {
             dispatch(setOrderState(order))
        })

    }, [socket, dispatch]); 
    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}