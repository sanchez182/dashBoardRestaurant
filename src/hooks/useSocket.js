import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);
    const { _id } = useSelector((state) => state.restaurantData.restaurantInfo);

    const conectarSocket = useCallback( () => {
        debugger
     //   const token = localStorage.getItem('token');
        const socketTemp = io.connect( serverPath, { 
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                uidClient : _id
            }
        });
        setSocket( socketTemp );
    },[ serverPath,_id ]);

    const desconectarSocket = useCallback( () => {
        socket?.disconnect();
    },[ socket ]);


    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => {
            debugger
            setOnline( false )});
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}