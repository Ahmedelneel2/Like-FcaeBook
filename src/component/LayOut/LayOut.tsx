import React from 'react'
import styles from  './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
const LayOut = () => {
  return (
    <main>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default LayOut
