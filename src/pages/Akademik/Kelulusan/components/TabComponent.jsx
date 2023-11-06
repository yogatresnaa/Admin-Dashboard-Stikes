import React from "react";

export default function TabComponent({tabArray,tabValue,setTab}){
    return (
        <div className="d-flex my-3 gap-2">
            {tabArray.map((item,index)=>(
            <div style={{borderBottom:'3px solid', borderBottomColor:item.id==tabValue ?'green':'white',cursor:'pointer',padding:'4px 8px'}} key={index} onClick={()=>setTab(item.id)}>
            <p style={{fontSize:"1rem"}}>{item.name}</p>
            </div>

            ))}

        </div>
    )

}