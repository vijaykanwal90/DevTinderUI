import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../features/userSlice';
import { BASE_URL } from "../constants";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/dashboard/profile`, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log(location.pathname);
      if (user && location.pathname === '/') {
        navigate('/feed');
      } else if (!user && location.pathname !== '/login') {
        navigate('/login');
      }
    }
  }, [user, loading, navigate, location.pathname]);

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
