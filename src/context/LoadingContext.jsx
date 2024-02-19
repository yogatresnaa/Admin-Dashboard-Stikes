import React, { createContext, useState } from 'react'

export const LoadingContext=createContext({});
export default function LoadingProvider({children}) {
  const [isLoadingSendData,setIsLoadingSendData]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  
    return (
    <LoadingContext.Provider value={{isLoadingSendData,setIsLoadingSendData,isLoading,setIsLoading}}>
        {children}
    </LoadingContext.Provider>
  )
}
