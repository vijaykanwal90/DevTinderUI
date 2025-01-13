import React ,{useEffect}from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../features/userSlice';
const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () =>{
    // if(user) return;

    try{
      const res = await axios.get('http://localhost:3000/profile',{withCredentials:true});
      console.log(res)
      dispatch(addUser(res.data))
      if(!user){
        navigate('/login')
      }
    }
    catch(error){
      // if(error.response.status===401){
      //   navigate('/login')
      // }
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
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Body;
