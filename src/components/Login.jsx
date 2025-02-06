import React, { useState } from 'react';
import axios from "axios";
import { Form, Input, Button } from "@nextui-org/react";
import { redirect } from 'react-router-dom';
import { Link ,useNavigate} from 'react-router-dom';
import feed from './Feed'
import Signup from './Signup'
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import { Card } from './ui/card';
import { BASE_URL } from "../constants";
import {toast} from "sonner"
// import { toast } from 'sonner';
import { Label } from './ui/label';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // console.log(BASE_URL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        try {  
          // console.log(`${BASE_URL}/login`);
            const res = await axios.post(
                `${BASE_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
          //   const res = await axios.post(
          //     `http://localhost:3000/login`,
          //     { email, password },
          //     { withCredentials: true }
          // );
            // console.log(res?.data?.data)
          console.log(res)
            toast.success('logged in successfully')

            dispatch(addUser(res?.data?.data))
            // navigate('/feed')

            if(res.status===200){
              navigate('/feed')
          
            }

        

        } catch (error) {
            console.log(error);
            // console.log(res)
            // setText(error.response.data.message)
            // setText('Invalid email or password')
            if(error.response.status===401){
              toast.error('Invalid email or password')
            }
            else {
              toast.error('network error')

            }

        }
    };

    return (
      
        <Card
            className=" w-full  max-w-md flex flex-col gap-6 bg-white p-6 border-4 shadow-lg rounded-lg"
             // Form submission handled here
        > 
        <h2 className='bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent '>Login</h2>
        <Label className='text-black' htmlFor="email">
                Email
              </Label>
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
              
              <Label className='text-black' htmlFor="password">
                Password
              </Label>
            <Input
                required
                errorMessage="Please enter a valid password"
                
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password" // Set to password type
                className="text-black"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <p className="text-red-500 text-center">{text}</p>
            <div className="flex justify-center">
                <Button
                    color="primary"
                    onClick={handleSubmit}// Button type set to submit for form submission
                    className="bg-gradient-to-r from-orange-400 to-red-500 text-primary text-xl w-full py-2 rounded-lg hover:bg-orange-600"
                >
                    Login
                </Button>
            </div>
              <p className="text-center text-sm text-gray-600">
                      Don't have account?{' '}
                      <Link to="/signup" className="bg-gradient-to-r from-orange-400 to-red-500 text-xl font-bold text-center bg-clip-text text-transparent hover:text-indigo-500">
                        Sign Up
                      </Link>
                    </p>
        </Card>
    );
};

export default Login;
