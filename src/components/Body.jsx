import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../features/userSlice';
import { BASE_URL } from "../constants";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (route)
  
  // Add a loading state to manage the fetching process
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard/profile`, { withCredentials: true });
      dispatch(addUser(res?.data?.data)); // Save user data to store
    } catch (error) {
      console.log(error);
    } finally {
      // Only update the loading state when on the root route ('/')
      if (location.pathname === '/') {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // fetchUser();
  }, [dispatch, location.pathname]);

  useEffect(() => {
    console.log()
    // Only navigate once loading is finished
      if (user) {
        // navigate('/feed');
      } else {
        navigate('/login');
      }
    
  }, [user, navigate, loading]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
