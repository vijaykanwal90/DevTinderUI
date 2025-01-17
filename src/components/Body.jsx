import React ,{useEffect}from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Feed from './Feed';
import axios from 'axios';
import { addUser } from '../features/userSlice';
import { CircleIcon } from 'lucide-react';
const Body = () => {
  const user= useSelector((store) => store.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {

   

    try {
      // if(!user.user){
      //   return ;
      // }
      const res = await axios.get('http://localhost:3000/profile', { withCredentials: true });
      // console.log(res);
      dispatch(addUser(res.data)); // Save user data to store
    } catch (error) {
      // if (error.response && error.response.status === 401) {
      //   navigate('/login'); // Redirect if 401 error (unauthorized)
      // }
      console.log(error);
    }
  };
  useEffect(() => {
    
    if (!user) {
      console.log("no user so naviagating to log in ")
      navigate('/login');
      // return; // Exit the function, don't continue with the API call
    }
    fetchUser();
  }, []); // Run effect when userData changes

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar at the top */}
      
      <Navbar />

    {/* {user && (
      <Feed/>
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
