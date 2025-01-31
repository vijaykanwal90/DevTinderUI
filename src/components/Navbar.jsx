import React from "react";
import axios from "axios";
// import Login from './Login'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/userSlice";
import { addUser } from "../features/userSlice";
import { useEffect ,useState} from "react";
// import Button from './Button'
const Navbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isOpen,setIsOpen]=useState(false);
  const handleToggle=()=>{
    setIsOpen(!isOpen);
  }
  const user = useSelector((state) => state.user);

  const logout = async () => {
    console.log("logout");
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      // setIsLoggedIn(false);
      dispatch(removeUser());

      navigate("/login");
    } catch (error) {
      if (res.status == 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };
 useEffect(() => {
  
 
  
 },[])
  return (
    <>
      
        <div className="navbar text-black bg-white shadow-lg">
          <div className="flex-1">
            <Link to={"/feed"} className="btn btn-ghost text-xl">
              DevTinder
            </Link>
          </div>
          {user && (
          <div className="flex-none gap-2">
            <div className="form-control ">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto text-black h-10"
              />
            </div>
            <p className="hidden sm:inline">Hello {user?.firstName}</p>
            <div className="dropdown dropdown-end mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div onClick={handleToggle} className="w-10 rounded-full">
                  <img
                    alt={user?.firstName}
                    src={user?.photoUrl}
                  />
                  {/* <h2>DevTinder</h2> */}
                </div>
              </div>
              <div>
                {isOpen && (
                  <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
                )}
              </div>
              
            </div>
          </div>
          )}
        </div>
      
    </>
  );
};

export default Navbar;
