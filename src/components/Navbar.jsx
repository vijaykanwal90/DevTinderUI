import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { removeUser } from "../features/userSlice";
import { BASE_URL } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
      // Optional: handle failed logout
    }
  };

  return (
    <div className="navbar text-black bg-white shadow-lg">
      <div className="flex-1">
        <Link to="/feed" className="bg-gradient-to-r from-orange-400 to-red-500 text-xl font-bold text-center bg-clip-text text-transparent p-2">
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto text-black bg-gray-300 h-10"
            />
          </div>

          <p className="hidden sm:inline bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent">
            Hello {user?.firstName}
          </p>

          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={handleToggle}
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user?.firstName}
                  src={user?.photoUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {isOpen && (
              <ul
                tabIndex={0}
                className="bg-white menu menu-sm dropdown-content border-2 border-gray-500 rounded-box z-[1] my-4 w-52 p-2 shadow-lg"
              >
                <li className="hover:bg-gray-300 rounded-lg">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="hover:bg-gray-300 rounded-lg">
                  <Link to="/connections">Connections</Link>
                </li>
                <li className="hover:bg-gray-300 rounded-lg">
                  <Link to="/requests">Requests</Link>
                </li>
                <li className="hover:bg-gray-300 rounded-lg">
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
