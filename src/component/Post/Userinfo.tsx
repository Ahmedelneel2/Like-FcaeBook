import React from 'react'
import avatar  from "./../../assets/images/avatar.png"
const Userinfo = ({pic , date , name}) => {
  
    return (
        <div className='flex justify-between items-center pt-3 px-2 mt-3'>
            {/* avatar and time  */}
            <div className='flex  my-3 '>
                <div className="avatar w-[50px] h-[50px]">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                        <img src={pic?.includes("undefined")?avatar:pic} />
                    </div>
                </div>
                <div className='mx-4 '>
                    <h1>{name}</h1>
                    <p className=''>{date} </p>
                </div>
            </div>
            {/* three dot icon  */}
            <div >
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        </div>
    )
}

export default Userinfo
