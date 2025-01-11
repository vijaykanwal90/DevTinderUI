import React from 'react'
import axios from 'axios'
// import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();
  const logout = async()=>{
    console.log("logout")
    try{
      const res = await axios.post("http://localhost:3000/logout",{},{withCredentials:true});
      if(res.status){
        navigate("/login")
      }
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <div className="navbar bg-base-400">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">DevTinder</a>
    </div>
    <div className="flex-none gap-2">
      <div className="form-control">
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-black" />
      </div>
      <div className="dropdown dropdown-end mx-4">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              {/* <h2>DevTinder</h2> */}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link className="justify-between" to={'/profile'}>
              Profile
              
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><a onClick={logout}>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navbar
