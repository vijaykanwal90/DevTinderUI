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

import { toast } from 'sonner';
import { Label } from './ui/label';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // console.log(BASE_URL)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        try {  
            const res = await axios.post(
                `${BASE_URL}/login`,
                { email, password },
                { withCredentials: true }
            );
          
            // console.log(res?.data?.data)

            toast.success('logged in successfully')

            dispatch(addUser(res?.data?.data))
            // navigate('/feed')

            if(res.status===200){
              navigate('/feed')
          
            }

        

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')

        }
    };

    return (
      
        <Card
            className=" w-full  max-w-md flex flex-col gap-6 bg-white p-6 shadow-md rounded-lg"
             // Form submission handled here
        > 
        <h2 className='text-orange-400 text-xl font-bold text-center'>Login</h2>
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
                    className="bg-orange-500 text-primary text-xl w-full py-2 rounded-lg hover:bg-orange-600"
                >
                    Submit
                </Button>
            </div>
              <p className="text-center text-sm text-gray-600">
                      Don't have account?{' '}
                      <Link to="/signup" className="text-orange-500 hover:text-indigo-500">
                        Sign Up
                      </Link>
                    </p>
        </Card>
    );
};

export default Login;
