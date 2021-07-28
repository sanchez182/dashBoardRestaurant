import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IImagesRestaurant } from '../../store/actions/actionsInterfaces/IImagesRestaurant';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@material-ui/core';



const CloudinayComponent = ({ urlImage, setUrlImage }: any) => {

    const { t } = useTranslation();
   /*  const files: IImagesRestaurant[] = useSelector(
        (state: RootState) => state.imagesReducer
    ); */

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
        setUrlImage(event.target.files[0])
    }

  // const image = urlImage.urlImg ? urlImage.urlImg :  (urlImage.localImage ? window.URL.createObjectURL(urlImage.image) : require("../../assets/no-Image-Placeholder.png").default)
  debugger  
  const image = urlImage && typeof urlImage === 'object' ? window.URL.createObjectURL(urlImage) : urlImage 
    const defaultImage =require("../../assets/no-Image-Placeholder.png").default
    debugger
    return (
        <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={12}>
            <img src={image ? image : defaultImage}
            onError={(e:any) => {
                debugger
                e.target.src =  defaultImage}} alt='plate-restaurant'
            style={{ width: "300px", height: "286px" }} 
          /> 
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
        </Grid>
    )

}
export default CloudinayComponent;