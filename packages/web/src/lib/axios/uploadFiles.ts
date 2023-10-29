import axios from "axios";


export async function uploadFileAccounts(formData:FormData):Promise<Boolean>{
   try {
     const respose= await axios ({
        method: "post",
        url: "http://localhost:4000/type-account/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return respose.data
    } catch(error) {
       return false
    }
}
