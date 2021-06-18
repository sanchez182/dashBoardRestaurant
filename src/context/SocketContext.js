import { useEffect } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../hooks/useSocket'
import { checkRestaurantTableSeledted } from '../store/actions/restaurantActions';
export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const { uid } = useSelector(state => state.auth);
    const { _id, tableList } = useSelector((state) => state.restaurantData);
    const dispatch = useDispatch()

    useEffect(() => {
        if (uid) {
            conectarSocket();
        }
    }, [uid, conectarSocket]);

    useEffect(() => {
        debugger
        if (!_id) {
            desconectarSocket();
        }
    }, [_id, desconectarSocket]);

    //TODO: modificar forma de cambiar la data de la mesa seleccionada
    useEffect(() => {
        socket?.on('selected-table', (mensaje) => {
            debugger
            const table = tableList.find(x => x.tableNumer.toString() === mensaje.tableNumer)
            const index = tableList.findIndex(x => x.tableNumer.toString() === mensaje.tableNumer)
            table.selected = mensaje.selected
            tableList[index] = table
            dispatch(checkRestaurantTableSeledted(tableList))
        })

    }, [socket, dispatch]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}