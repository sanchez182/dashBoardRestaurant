import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { uploadImageToRestaurant } from '../../actionsApi/cloudinaryActions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';


type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const CloudinayComponent = () => {

    const dispatch: AppDispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        image: '',
        urlImage: ''
    })

    const uploadWidget = async (event: any) => {
        setState({ ...state, image: event.target.files[0], loading: true })


        // const res = await fetch("https://api.cloudinary.com/v1_1/ddb12hbdl/image/upload",
        //     {
        //         method: 'POST',
        //         body: data
        //     })

        // const file = await res.json()
        // console.log(file)

        // setState({ ...state, loading: false, image: file.secure_url })

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
            <input type="file" placeholder="upload image" onChange={uploadWidget} />
            <button type="button" onClick={sendData} > Send data</button>
            {state.urlImage.length > 0 &&

                <img src={state.urlImage} style={{ width: "300px" }} alt="" />
            }



        </div>
    )

}
export default CloudinayComponent;