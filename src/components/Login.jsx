import React, { useState } from 'react';
import axios from "axios";
import { Form, Input, Button } from "@nextui-org/react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';
import { Card } from './ui/card';
import { toast } from "sonner";
import { Label } from './ui/label';
import { BASE_URL } from '@/constants';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        if (e?.preventDefault) {
            e.preventDefault();
        }
        if (!email || !password) {
            setErrorMessage('Both email and password are required.');
            return;
        }

        try {  
            const res = await axios.post(`${BASE_URL}/auth/login`, { email, password }, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            const { token, data } = res.data;
            localStorage.setItem('token', token);
            toast.success('Logged in successfully');

            // Dispatch user data to Redux store
            dispatch(addUser(res?.data?.data));

            // Redirect on successful login
            if (res.status === 200) {
                navigate('/feed');
            }
        } catch (error) {
            console.error('Login error:', error);

            // Handle different types of errors
            if (error.response && error.response.status === 401) {
                setErrorMessage('Invalid email or password.');
                toast.error('Invalid email or password');
            } else if (error.response && error.response.status === 400) {
                setErrorMessage('Bad request. Please check the input data.');
            } else {
                setErrorMessage('Network error. Please try again.');
                toast.error('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md flex flex-col gap-6 bg-white p-6 border-4 shadow-lg rounded-lg text-black">
                <h2 className="bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent">
                    Login
                </h2>

                <Label className="text-black" htmlFor="email">
                    Email
                </Label>
                <Input
                    required
                    errorMessage="Please enter a valid email"
                    labelPlacement="outside"
                    placeholder="Enter your email"
                    type="email"
                    className="text-black"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <Label className="text-black" htmlFor="password">
                    Password
                </Label>
                <div className="flex">
                    <Input
                        required
                        errorMessage="Please enter a valid password"
                        labelPlacement="outside"
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        className="text-black"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <span
                        onClick={() => {
                            setShowPassword(!showPassword);
                        }}
                        className="mt-2 cursor-pointer"
                    >
                        {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                    </span>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}

                <div className="flex justify-center">
                    <Button
                        color="primary"
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-orange-400 to-red-500 text-primary text-xl w-full py-2 rounded-lg hover:bg-orange-600"
                    >
                        Login
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="bg-gradient-to-r from-orange-400 to-red-500 text-xl font-bold bg-clip-text text-transparent hover:text-indigo-500"
                    >
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
};

export default Login;
