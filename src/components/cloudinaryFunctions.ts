import { uploadImageToRestaurant } from "../actionsApi/cloudinaryActions"

export const sendImageToCloudinary = async(dataState:any) => {
    const data = new FormData() 
    data.append('file', dataState.image)
    data.append('folder', "restaurant4")
    return await uploadImageToRestaurant(data)
}

export const createUrlImage = async(uploadedImage:any)=>{
    let image = await fetch(uploadedImage.secure_url);
    let data = await image.blob();
    let metadata = {
        type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);

    return  {
        _id: uploadedImage.public_id,
        file: window.URL.createObjectURL(file),
        name: uploadedImage.public_id
    }
}