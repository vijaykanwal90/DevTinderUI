import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed } from '../features/feedSlice';
import { removeFeed } from '../features/feedSlice';
import {motion , AnimatePresence} from 'framer-motion';
import UserCard from './UserCard';
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [status,setStatus] = useState('')
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex,setCurrentIndex] = useState(0)
  // const [toUSer, setToUser] = useState('');
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    }
    catch (error) {
      console.log("error is " + error.message)
    }
  };
  const requestSent = (status, toUser) => async () => {
    // console.log("status is "  + status  + " " + " userId is " +  toUser)
    setStatus(status)
    try {
      const res = await axios.post(
        `http://localhost:3000/sendConnectionRequest/${status}/${toUser}`,
        {},
        { withCredentials: true }
      );
      // console.log(res.data)
      console.log("the status i s")
      console.log(status)

      // console.log("action take in revie")
      dispatch(removeFeed(toUser));
      setCurrentIndex((currentIndex +1 )%feed.length)
    } catch (error) {
      console.log("error is " + error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, );

  if (!feed) {
    return <div></div>
  }
  if (feed.length === 0) {
    return <h1>No feed Data</h1>
  }
  return (
    <AnimatePresence>
    {isVisible && (
      <motion.div
        key="userCard"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          x: status === 'ignored' ? -500 : status === 'interested' ? 500 : 0,
          y: status === 'ignored' || status === 'interested' ? -500 : 0,
        }}
        exit={{ opacity: 0 }} // Exit animation
        transition={{ duration: 0.5 }} // Smooth animation
        onAnimationComplete={() => {
          if (status === 'ignored' || status === 'interested') {
            setIsVisible(false); // Remove the component after animation
          }
        }}
      >

      <UserCard user={feed[0]} status ={status} requestSent={requestSent} />
    </motion.div>
    )}
    </AnimatePresence>
  );
};

export default Feed;
