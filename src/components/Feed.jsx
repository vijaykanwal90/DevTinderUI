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

 
  const fetchData = async () => {
    try{
      const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
      // console.log(res.data[0]);
      
      // console.log("hey is " + res)
      dispatch(addFeed(res?.data?.data));
    }
    catch(error){
      console.log("error is " + error.message)
    }
    
  
  };
  

  useEffect(() => {
    console.log("feed page loaded")
    fetchData();
  }, []);

 if(!feed){
  return <div></div>
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
