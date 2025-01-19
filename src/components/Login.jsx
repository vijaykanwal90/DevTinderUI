import React, { useState } from 'react';
import axios from "axios";
import { Form, Input, Button } from "@nextui-org/react";
import { redirect } from 'react-router-dom';
import { Link ,useNavigate} from 'react-router-dom';
import feed from './Feed'
import Signup from './Signup'
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
const Login = () => {
    const [email, setEmail] = useState('super@gmail.com');
    const [password, setPassword] = useState('Super@123');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        try {  
            const res = await axios.post(
                'http://localhost:3000/login',
                { email, password },
                { withCredentials: true }
            );
          
            // console.log(res?.data?.data)


            dispatch(addUser(res?.data?.data))
            // navigate('/feed')

            if(res.status===200){
              navigate('/feed')
          
            }

        

        } catch (error) {
            console.log(error);
        }
    };

    return (
      
        <form
            className="w-full max-w-md flex flex-col gap-6 bg-white p-6 shadow-md rounded-lg"
             // Form submission handled here
        > 
        <h2 className='text-black text-center'>Login</h2>
        <label className='text-black' htmlFor="email">
                Email
              </label>
            <Input
                required
                errorMessage="Please enter a valid Email"
            
                labelPlacement="outside"
                name=""
                placeholder="Enter your email"
                type="email" // Use email type for better validation
                className="text-black"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
              
              <label className='text-black' htmlFor="password">
                Password
              </label>
            <Input
                required
                errorMessage="Please enter a valid password"
                
                labelPlacement="outside"
                name="password"
                placeholder=""
                type="password" // Set to password type
                className="text-black"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <div className="flex justify-center">
                <Button
                    color="primary"
                    onClick={handleSubmit}// Button type set to submit for form submission
                    className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                >
                    Submit
                </Button>
            </div>
              <p className="text-center text-sm text-gray-600">
                      Don't have account?{' '}
                      <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
                        Sign Up
                      </Link>
                    </p>
        </form>
    );
};

export default Login;
