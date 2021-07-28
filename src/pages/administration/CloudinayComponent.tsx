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
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';


type State = { a: string }; // your state type
type AppDispatch = ThunkDispatch<State, any, AnyAction>;

const CloudinayComponent = ({ dataState, setDataState }: any) => {

    const { t } = useTranslation();
    const files: IImagesRestaurant[] = useSelector(
        (state: RootState) => state.imagesReducer
    );

    const dispatch: AppDispatch = useDispatch();

/*     useEffect(() => {

        if (files.length > 0 && !files[0].file) {
            dispatch(getImages()).then(async (response: any) => {

                let image = await fetch(response.resources[0].secure_url);
                let data = await image.blob();
                let metadata = {
                    type: 'image/jpeg'
                };
                let file = new File([data], "test.jpg", metadata);

                let obje: IImagesRestaurant[] = [];
                obje.push({
                    _id: "1",
                    file: window.URL.createObjectURL(file),
                    name: ""
                })
                dispatch(setImages(obje))
            })
        }



    }, [dispatch]) */

    const uploadWidget = async (event: any) => {
        debugger
        setDataState({ ...dataState, image: event.target.files[0], loading: true })
    }

    const image = dataState.urlImg ? dataState.urlImg :  (dataState.image ? window.URL.createObjectURL(dataState.image) : require("../../assets/no-Image-Placeholder.png").default)
    return (
        <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={12}>
                <img src={image} style={{ width: "300px", height: "286px" }} alt="" />
            </Grid> 
            <Grid item xs={12} md={12}>
                <input
                    onChange={uploadWidget}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        {t('buttons.uploadImage')}
                    </Button>
                </label>
            </Grid> 

            {/*  {files.length > 0 && files[0].file &&

                <img src={files[0].file} style={{ width: "300px" }} alt="" />
            } */}
        </Grid>
    )

}
export default CloudinayComponent;