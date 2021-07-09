export const verifyData =(errorobj,name,t)=>{
    let isError = false;
    let errorMessage = "";
    let message = "";
    
    if (errorobj && errorobj.hasOwnProperty(name)) {
      isError = true;
      message = errorobj[name].message;
      errorMessage = t(message);
    }
    return {isError , errorMessage}
}