import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { addFeed } from '../features/feedSlice';
import UserCard from './UserCard';
const Feed = () => {
  // const [users, setUsers] = useState([]);


  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  // console.log("Feed data " + feed.length)
  // const user = feed[0];
  // console.log(user)

  const fetchData = async () => {
    try{
      const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
      // console.log(res.data[0]);
      // const users = res.data;
      // users.map((user)=>{
      //   console.log( "hey this is user Data " + user.firstName)
      // })
      // console.log(typeof(users))
      // console.log("hey is " + res.data.data)
      dispatch(addFeed(res?.data?.data));
    }
    catch(error){
      console.log("error is " + error.message)
    }
    
    // setUsers(res.data);
  };
  // console.log(status)

  useEffect(() => {
    fetchData();
  }, []);

 if(!feed){
  return <h1>Loading...</h1>
 }
 if(feed.length===0){
  return <h1>No feed Data</h1>
 }
  return (
    <div>
      {/* {feed && feed.map((user,index) => (
        // <UserCard key={index} feed={user}/>
       
      ))} */}
      <UserCard  user = {feed[0]}  />
    </div>
  );
};

export default Feed;
