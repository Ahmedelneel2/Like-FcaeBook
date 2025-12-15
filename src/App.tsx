import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './component/LayOut/LayOut'
import Home from './component/Home/Home'
import Regestier from './component/Regestier/Regestier'
import Login from './component/Login/Login'
import NotFound from './component/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './component/Contexts/authContextProvider'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import Profile from './component/Profile/Profile' 
import PostDetails from './component/PostDetails/PostDetails'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
const App = () => {
  const client = new QueryClient()
  const router = createBrowserRouter([{path:'/' , element:<LayOut/> , children:[
    {index:true , element:(<ProtectedRoute><Home/></ProtectedRoute> )},
    {path:"/profile" , element:(<ProtectedRoute><Profile/></ProtectedRoute>)},
    {path:"/postDetails/:id" , element:(<ProtectedRoute><PostDetails/></ProtectedRoute>)},
    {path:"/regestier", element:<Regestier/> },
    {path:"/login", element:<Login/> },
    {path:"*", element:<NotFound/> }
  ]}])
  return (
 <QueryClientProvider client={client}>
    <AuthContextProvider>
   <Toaster toastOptions={{ style: { zIndex: 10 } }} />
    <RouterProvider router={router}/>
    </AuthContextProvider>
 </QueryClientProvider>
   
  )
}

export default App
