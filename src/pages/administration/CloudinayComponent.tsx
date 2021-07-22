import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { uploadImageToRestaurant } from '../../actionsApi/cloudinaryActions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { loadSaveData, saveDataInStorage } from '../../renderer';
import { HANDLE_FETCH_DATA, HANDLE_SAVE_DATA } from '../../utils/constanst';
import { ipcRenderer }  from 'electron'

type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const CloudinayComponent = () => {

    const dispatch: AppDispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        image: '',
        urlImage: '',
        value: ''
    })

    const [itemsToTrack, setItems] = useState<any>([])
    const [val, setVal] = useState<any>('')
    useEffect(() => {
        loadSaveData()
    }, [])


    useEffect(() => {
        ipcRenderer.on(HANDLE_FETCH_DATA, handleReceiveData)
        return () => {
            ipcRenderer.removeListener(HANDLE_FETCH_DATA,handleReceiveData)
        }
    })

    const handleReceiveData=(event:any, data:any)=>{
        console.log('data received')
        setItems([...data.message])
    }


    const uploadWidget = async (event: any) => {
        setState({ ...state, image: event.target.files[0], loading: true })
    }

    //save an item
    const addItem=(item:any)=>{
        console.log('REACT trigger addItem with', item)
        saveDataInStorage(item)
        setVal('');
    }

    //Listen for handler
    useEffect(() => {
        ipcRenderer.on(HANDLE_SAVE_DATA, handleNewItem)
        return () => {
            ipcRenderer.removeListener(HANDLE_SAVE_DATA,handleNewItem)
        }
    })

    const handleNewItem=(event:any, data:any)=>{
        console.log('renderer received new item', data.message)
        setItems([...itemsToTrack, data.message])
       
    }


    const hanldeChange =(event:any)=>{
        setVal(event.target.value)
    }

const handleSubmit =(e:any)=>{
    e.preventDefault()
    addItem(val)
}

    const sendData = () => {
        const data = new FormData()
        debugger
        data.append('file', state.image)
        data.append('folder', "restaurant4")
        dispatch(uploadImageToRestaurant(data)).then((response: any) => {
            setState({ ...state, urlImage: response.secure_url })
        })
    }

    return (
    <div className="main">
      {/*    <div className="main">
            <input type="file" placeholder="upload image" onChange={uploadWidget} />
            <button type="button" onClick={sendData} > Send data</button>
            {state.urlImage.length > 0 &&

                <img src={state.urlImage} style={{ width: "300px" }} alt="" />
            }
        <div> */}
              
<button type="submit" onClick={handleSubmit} > Add Item </button>
        <input type="text" onChange={hanldeChange}  value={val}/>
            {itemsToTrack.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsToTrack.map((item:any, id:number)=>{
                            return (
                                <tr key={id+1}>
                                    <td>{id+1}</td>
                                    <td>{item}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ): <p>Add an item to get started</p>}
        </div> 
    )

}
export default CloudinayComponent;