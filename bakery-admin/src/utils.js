import axios from "axios"

export const fetchDataFromapi = async(url) =>{
    try{
        const {data} = await axios.get(`https://bakery-server-bkrv.onrender.com`+ url)
        return data;
    }catch(err){
        console.error(err)
        return err
    }
}

export const postdata = async (url,FormData) =>{
    try{
        const {data} = await axios.post(`https://bakery-server-bkrv.onrender.com${url}` ,FormData)
        return data;
    }catch(error){
        console.error("post Error:" , error)
        return error;
    }
}

export const updateData = async (url,FormData) =>{
    try{
        const {data} = await axios.put(`https://bakery-server-bkrv.onrender.com${url}` , FormData)
        return data
    }catch(error){
        console.error("update error:", error)
        return error
    }
}

export const deletedata = async (url) =>{
  try{
    const {data} = await axios.delete(`https://bakery-server-bkrv.onrender.com${url}`);
    return data;
  }catch (error){
    console.error("delete error :" ,error)
    return error;
  }
}

// https://bakery-server-bkrv.onrender.com