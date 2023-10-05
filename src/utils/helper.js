export const requestWrapper=(fn,toast,navigate=null)=>async()=>{
    try {
       const response= await fn();
       
       if(response.data.status==200 ||response.data.status==201 )
       toast.success(response.data.message,{
            theme:'colored'
       })
       if(navigate!==null){
        navigate()
       }
   } catch (error) {
 
        toast.error(error.response.data.message,{
            theme:'colored'
        })
        
    }

}

export const requestOnlyWrapper=(fn,toast,navigate=null)=>async()=>{
    try {
       const response= await fn();
       
   } catch (error) {
 
        toast.error(error.response.data.message,{
            theme:'colored'
        })
        
    }

}