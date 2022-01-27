import axios from 'axios';
import { MAIN_URL } from './Url';

export function regUser(data){
    // console.log("User registered")
    return(axios.post(`${MAIN_URL}user/reguser`,data))
}
export function getUser(){
    // console.log("User Fetched")
    return(axios.get(`${MAIN_URL}user/getuser`))
}

export function logUser(data){
    // console.log("Done!")
    return( axios.post(`${MAIN_URL}user/loguser`,data)
   )
}

export function addInvoice(data){
    return axios.post(`${MAIN_URL}user/addinvoice`,data)
}

export function fetchproduct(data){
    return axios.post(`${MAIN_URL}user/fetchproduct`,data) 
}

export function deleteInvoice(id){
    return axios.post(`${MAIN_URL}user/deleteinvoice`,id)
}

export function Updatepost(id){
    return axios.post(`${MAIN_URL}user/updatepost`,id)
}

export function sendEmail(data){
    return axios.post(`${MAIN_URL}user/sendmail`,data,{
        headers:{
            'Content-Type':"multipart/form-data"
        }
    }) 
}
export function getpro(){
    return axios.get(`${MAIN_URL}/users/getpro`,{
        headers:{"authorization":`Bearer ${localStorage.getItem('_token')}`}
    });
}