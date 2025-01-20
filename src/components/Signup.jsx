import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { addUser } from "../features/userSlice";
const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      password,
    });
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.status);
      if (res.status === 201) {

        console.log("User added successfully");
        dispatch(addUser(res?.data?.data));
        // navigate("/feed");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className=" w-full  max-w-md flex flex-col gap-6 bg-white p-6 shadow-md rounded-lg"
      // Form submission handled here
    >
      <h2 className="text-orange-400 text-xl font-bold text-center">SignUp</h2>
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
      <Input
        required
        
        name="password"
        placeholder="Enter your password"
        type="password" // Set to password type
        className="text-black"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className="flex justify-center">
        <Button
          color="primary"
          onClick={handleSubmit} // Button type set to submit for form submission
          className="bg-orange-500 text-primary text-xl w-full py-2 rounded-lg hover:bg-orange-600"
        >
          Submit
        </Button>
      </div>
      <p className="text-center text-sm text-gray-600">
        Don't have account?{" "}
        <Link to="/login" className="text-orange-500 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </Card>
  );
};

export default Signup;
