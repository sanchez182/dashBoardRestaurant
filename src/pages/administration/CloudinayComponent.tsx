import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { getImages, uploadImageToRestaurant } from '../../actionsApi/cloudinaryActions';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { setImages } from '../../store/actions/imagesActions';
import { IImagesRestaurant } from '../../store/actions/actionsInterfaces/IImagesRestaurant';


type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const CloudinayComponent = () => {
 
        const files: IImagesRestaurant[] = useSelector(
            (state: RootState) => state.imagesReducer
          );

    const dispatch: AppDispatch = useDispatch();
    const [dataState, setDataState] = useState({
        loading: false,
        image: '',
        urlImage: '',
        newImage: ''
    })

    useEffect( () => { 
        debugger
        if(!files[0].file){
            dispatch(getImages()).then(async (response: any) => {
                        
                        let image = await fetch(response.resources[0].secure_url);
                        let data = await image.blob();
                        let metadata = {
                            type: 'image/jpeg'
                        };
                        let file = new File([data], "test.jpg", metadata);
                        debugger 
                        let obje : IImagesRestaurant[] = [];
                        obje.push({
                            _id: "1",
                            file: window.URL.createObjectURL(file),
                            name: ""
                        }) 
                        dispatch(setImages(obje)) 
                    })
        }
         

   
    },[dispatch])

    const uploadWidget = async (event: any) => {
        setDataState({ ...dataState, image: event.target.files[0], loading: true })


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
        data.append('file', dataState.image)
        data.append('folder', "restaurant4")
        dispatch(uploadImageToRestaurant(data)).then((response: any) => {
            setDataState({ ...dataState, urlImage: response.secure_url })
        })
    }

    return (
        <div className="main">
            <input type="file" placeholder="upload image" onChange={uploadWidget} />
            <button type="button" onClick={sendData} > Send data</button>
            {files[0].file &&

                <img src={files[0].file} style={{ width: "300px" }} alt="" />
            }



        </div>
    )

}
export default CloudinayComponent;