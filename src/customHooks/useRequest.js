import { useCallback, useEffect, useState } from "react"
import { requestWrapper } from "../utils/helper"
import { toast } from "react-toastify"


export default function useRequest({isFetch}){
    const [isLoading,setIsLoading]= useState(false)
    const [data,setData]= useState({data:[],filter:[]})
    const [filterText,setFilterText]= useState('')
    const [resetPaginationToggle,setResetPaginationToggle]= useState(false)

    const onChangeFilterText=(e)=>{
        setFilterText(e.target.value)
    }

    useEffect(()=>{
        console.log(filterText)

        if(filterText!==''){
            

            setData(prevState=>({...prevState,filter:prevState.data.filter(item=>{
                if(item.nama.toString().toLowerCase().includes(filterText.toString().toLowerCase()))return true
                return false;
            })}))
        
        }
    },[filterText])

    const getData=async(fn)=>{
        requestWrapper(async()=>{

            const response= await fn();
            setData((prevState)=>({...prevState,data:response.data.data}))
            return response;
        },toast,null
        );
    }
    const sendData=async(fn)=>{
        requestWrapper(async()=>{

            const response= await fn();
            setData((prevState)=>({...prevState,data:response.data.data}))
            return response;
        },toast,null
        );
    }


    return{isLoading,setIsLoading,sendData,getData,data,setData,resetPaginationToggle,filterText,onChangeFilterText,setResetPaginationToggle}
}