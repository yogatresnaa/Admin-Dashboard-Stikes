import { functionType } from "./CONSTANT";

/*
export const    requestWrapper=(fn,toast,navigate=null)=>async()=>{
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
*/
export const requestWrapper = async (
  fn,
  callback = null,
  type,
  toast,
  navigate = null
) => {
  try {
    console.log(callback);
    const response = await fn();

    if (response.data?.status == 200 || response.data?.status == 201) {
      if (type == functionType.POST) {
        toast.success(response.data.message, {
          theme: "colored",
        });
        //callback getdata again after post / put
        if (callback != null) {
          await callback();
        }
      }
    }
    if (navigate !== null) {
      navigate();
    }
  } catch (error) {
    if (error) {
      console.log(error);

      if (error.response?.status == 500) {
        toast.error(error.response.statusText, {
          theme: "colored",
        });
      } else if (error.response?.status < 500) {
        toast.error(error.response.data.message, {
          theme: "colored",
        });
      } else {
        toast.error("Oops Something wrong", {
          theme: "colored",
        });
      }
    }
  }
};

export const requestOnlyWrapper =
  (fn, toast, navigate = null) =>
  async () => {
    try {
      const response = await fn();
    } catch (error) {
      toast.error(error.response.data.message, {
        theme: "colored",
      });
    }
  };

  export const dateConvert=(data)=>{
    const date=new Date(data);
    return`${date.getDay()} ${date.toLocaleString('id',{month:'long'})} ${date.getFullYear()}`
  }