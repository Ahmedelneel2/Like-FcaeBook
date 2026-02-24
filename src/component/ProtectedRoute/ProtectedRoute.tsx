import React, { useContext } from 'react'
import { authContext } from '../Contexts/authContextProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const token  = localStorage.getItem("token")
if (token == null ) {
return <Navigate to={"/login"} replace                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            />
}else{

      return (
    <>
     {children} 
    </>
  )
}
}

export default ProtectedRoute
