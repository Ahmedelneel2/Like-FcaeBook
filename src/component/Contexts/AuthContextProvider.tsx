import React,{ createContext, useEffect, useState }  from 'react'
  export const authContext = createContext()

const AuthContextProvider = ({children}) => {
    const [token , setToken ]= useState(null)

 useEffect( function(){
  if(localStorage.getItem("token")){
    setToken (localStorage.getItem("token"))
  }
 } ,[])
function setUserToken (userToken){
  setToken (userToken)
}
function logOut(){
  setToken (null)
  localStorage.removeItem("token")
}

  return (
    <authContext.Provider value={
      {
        token,
        setUserToken,
        logOut
      }
    }>
      {children}
    </authContext.Provider>
      
    
  )
}

export default AuthContextProvider
