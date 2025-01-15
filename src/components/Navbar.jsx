import React from 'react'
import axios from 'axios'
// import Login from './Login'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import { removeUser } from '../features/userSlice'
import { addUser } from '../features/userSlice';
import { useEffect } from 'react';
// import Button from './Button'
const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  // const userData = useSelector((store)=>store.user)
  const userData = useSelector((state) => state.user)

  // console.log("hey user data at ui navbar" , userData)
  const logout = async()=>{
    console.log("logout")
    try{
      const res = await axios.post("http://localhost:3000/logout",{},{withCredentials:true});
      dispatch(removeUser())
      
      return  navigate("/login")
      

    }
    catch(error){
      if(res.status==401){
        navigate("/login")
      }
      console.log(error )
    }
  }
  // const dispatch = useDispatch()
  const fetchData = async ()=>{
    const res = await axios.get("http://localhost:3000/profile",{withCredentials:true});
    // console.log(res)
    dispatch(addUser(res.data))
    return res.data
  }
  useEffect (()=>{
    fetchData()
  },[])
  return (
    <>
    {userData && (
      <div className="navbar bg-base-400">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto bg-black" />
        </div>
        <p>Hello {userData?.firstName}</p>
        <div className="dropdown dropdown-end mx-4">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={userData?.photoUrl} />
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
          <li><Link to={"/connections"}>Connections</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </div>
      
      </div>
    </div>
    
    )}

    
  </>
  )
}

export default Navbar
