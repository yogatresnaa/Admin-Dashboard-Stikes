import React, { useEffect, useState } from "react";

function AutoTyping({text,delay}){
    const [currentText,setCurrentText]=useState({text:'',index:0})

    useEffect(()=>{
        if(currentText.index<=text.length){
           
            const timeout = setTimeout(()=>{
                setCurrentText((prevState)=>({...prevState,text:prevState.text+text[prevState.index],index:prevState.index+1}))
            },delay)
            return ()=>clearTimeout(timeout)
        }
        else{
            setCurrentText((prevState)=>({text:text[0],index:1}))
        }
        },[text,delay,currentText])
return(
    <span>{currentText.text}</span>
)
}
export default AutoTyping;