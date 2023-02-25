import axios from 'axios'
import { BASE_URL } from '../services/helper'

export const loginCall= async(usercredential, dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res= await axios.post(`${BASE_URL}/auth/login`, usercredential);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data});
        
    }catch(err){
        dispatch({type:"LOGIN_FAILLURE", payload:err});
    }
};