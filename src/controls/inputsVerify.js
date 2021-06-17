export const verifyData =(errorobj,name)=>{
    let isError = false;
    let errorMessage = "";
    if (errorobj && errorobj.hasOwnProperty(name)) {
      isError = true;
      errorMessage = errorobj[name].message;
    }
    return {isError , errorMessage}
}