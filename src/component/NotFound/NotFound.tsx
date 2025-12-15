import React from 'react'
import styles from  './NotFound.module.css'
import NotImage from "../../assets/images/best-404-pages-powr2-1024x442.jpg"
const NotFound = () => {
  return (
    <div className='flex justify-center items-center'>
      <img src={NotImage} alt="Not Found" />
    </div>
  )
}

export default NotFound
