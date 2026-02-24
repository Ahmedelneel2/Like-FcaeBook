import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContextProvider'

const Navbar = () => {
 const context = useContext(authContext)

if (!context) {
  throw new Error("authContext must be used within AuthContextProvider")
}

const { token, logOut } = context
  const navigate = useNavigate();
  function handleLogout(){
    logOut()
    navigate("/login")

  }
  return (
    <div className='text-white '>
      <div className="navbar  shadow-sm px-7 py-1 flex justify-between bg-blue-700 flex-col md:flex-row">
        {token ? <div className="flex-1">
          <NavLink to={"/"} className="btn btn-ghost text-xl">Linked Postes </NavLink>
        </div> : <div className="flex-1">
  <NavLink to="/" className="btn btn-ghost text-xl">
    Linked Posts
  </NavLink>
</div>}
        <div className="flex gap-2 bg-blue-700">
          {token ?  <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
               <li className='  text-black'><NavLink to="/profile">Profile</NavLink></li>
              <li>
                <button className='text-black' onClick={handleLogout}> Logout</button>
              </li>
            </ul>
          </div> : <div className="bg-blue-700">
            <ul className="bg-blue-700 rounded-t-none p-2 flex justify-between flex-col sm:flex-row ">
            <li className='m-3 rounded bg-blue-700 border border-white p-5  '><NavLink to="/login">Login</NavLink></li>

            <li className='m-3 rounded bg-blue-700  border border-white p-5'><NavLink to="/regestier">Register</NavLink></li>
          </ul></div>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
