import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed, removeFeed } from '../features/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
// import UserCard from './UserCard';
import { BASE_URL } from "../constants";
import Posts from './Posts';
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [status, setStatus] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);

  const fetchData = async () => {
    try {
      console.log("getting feed")
      const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log('Error fetching feed data: ' + error.message);
    }
  };

  const requestSent = (newStatus, toUser) => async () => {
    setStatus(newStatus);
    try {
      console.log("request sent")
      await axios.post(
        `${BASE_URL}/request/sendConnectionRequest/${newStatus}/${toUser}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUser));
      setAnimationStage(1);
      setTimeout(() => {
        setAnimationStage(2);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => {
            if (prevIndex + 1 >= feed.length - 1) {
              return 0;
            }
            return prevIndex + 1;
          });
          setAnimationStage(0);
        }, 500);
      }, 500);
    } catch (error) {
      console.log('Error sending request: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


 

  return (
    <AnimatePresence>
      <motion.div >
      <Posts/>

      </motion.div>
    </AnimatePresence>
  );
};

export default Feed;
