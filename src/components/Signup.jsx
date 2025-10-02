import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
import { BASE_URL } from "../constants";
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { Toaster,toast } from "sonner";
import { Toast } from "@radix-ui/react-toast";
const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("one");
  const [lastName, setLastName] = useState("level");

  const [email, setEmail] = useState("onelevel123@gmail.com");
  const [password, setPassword] = useState("Onelevel@123");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    console.log({
      firstName,
      lastName,
      email,
      password,
    });
    try {
      console.log("at sign up", BASE_URL);
      // const res = await axios.post(
      //   `${BASE_URL}/signup`,
      //   {
      //     firstName,
      //     lastName,
      //     email,
      //     password,
      //   },
      //   // { withCredentials: true }
      // );
      const res = await axios.post(`${BASE_URL}/auth/signup`,{
        firstName,
        lastName,
        email,
        password
      },{
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.status);
      if (res.status === 201) {
        console.log("User added successfully");
        // dispatch(addUser(res?.data?.data));
        // navigate("/feed");
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (error) {
      
      toast.error("User already exists");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        className="w-full max-w-md flex flex-col gap-6 bg-white p-6 border-4 shadow-lg rounded-lg"
      >
        <h2 className="bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent">
          SignUp
        </h2>
        <Label className="block text-sm font-medium text-gray-700">
          Firstname
        </Label>
        <Input
          type="text"
          name="firstname"
          id="firstname"
          className="text-black"
          placeholder="Enter your firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <Label className="block text-sm font-medium text-gray-700">
          Lastname
        </Label>
        <Input
          type="text"
          name="lastname"
          id="lastname"
          className="text-black"
          placeholder="Enter your lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <Label className="text-black" htmlFor="email">
          Email
        </Label>
        <Input
          required
          name="email"
          placeholder="Enter your email"
          type="email" // Use email type for better validation
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
          name="password"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}// Set to password type
          className="text-black border-2 border-gray-300 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          value={password}

        />
         <span
                                 onClick={() => {
                                     setShowPassword(!showPassword);
                                 }}
                                 className="mt-2 cursor-pointer right-6 relative"
                             >
                                 {showPassword ? <FaRegEyeSlash /> : <IoEyeOutline />}
                             </span>
            
                             </div>
        <div className="flex justify-center">
          <Button
            color="primary"
            onClick={handleSubmit} // Button type set to submit for form submission
            className="bg-gradient-to-r from-orange-400 to-red-500 text-xl font-bold text-center w-full py-2 rounded-lg hover:bg-orange-600"
          >
            Submit
          </Button>
          <Toaster richColors />
        </div>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/login" className="bg-gradient-to-r from-orange-400 to-red-500 text-xl font-bold text-center bg-clip-text text-transparent hover:text-indigo-500">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
