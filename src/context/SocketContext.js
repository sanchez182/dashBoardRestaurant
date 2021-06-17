import React, {  useEffect } from 'react';
import { createContext } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../hooks/useSocket'  
export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:4000');
    const { uid } = useSelector(state => state.auth);

    useEffect(() => {
        if ( uid ) {
            conectarSocket();
        }
    }, [ uid, conectarSocket ]);

    useEffect(() => {
        if ( !uid ) {
            desconectarSocket();
        }
    }, [ uid, desconectarSocket ]);


    useEffect(() => {
        
        socket?.on( 'lista-usuarios', (usuarios) => {
       /*      dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            }); */
            console.log(usuarios)
        })

    }, [ socket ]);

    useEffect(() => {
        socket?.on('seleted-table', (mensaje) => {
  debugger
  console.log("mesa seleccionada" + " " + mensaje)
        })

    }, [ socket ]);


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}