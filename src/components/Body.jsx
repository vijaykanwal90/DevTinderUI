import React ,{useEffect}from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Feed from './Feed';
import axios from 'axios';
import { addUser } from '../features/userSlice';
const Body = () => {
  const userData = useSelector((store) => store.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () =>{
    // if(user) return;
    if(!userData){
      navigate('/login')
    }
    if(userData) return ;
    try{

      const res = await axios.get('http://localhost:3000/profile',{withCredentials:true});
      console.log(res)
      dispatch(addUser(res.data))
     
    }
    catch(error){
      if(error.response.status===401){
        navigate('/login')
      }
      console.log(error)
    }
  
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar at the top */}
      
      <Navbar />

    

    

      {/* Center the Outlet content */}
      {/* {userData && (
        navigate('/feed')
      )} */}
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Body;
