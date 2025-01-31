import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed, removeFeed } from '../features/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [status, setStatus] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current feed item index
  const [animationStage, setAnimationStage] = useState(0); // 0: initial, 1: moved, 2: returning

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/feed', { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log('Error fetching feed data: ' + error.message);
    }
  };

  const requestSent = (newStatus, toUser) => async () => {
    setStatus(newStatus);
    try {
      await axios.post(
        `http://localhost:3000/sendConnectionRequest/${newStatus}/${toUser}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUser));
      setAnimationStage(1); // Move to the 'moved' stage
      setTimeout(() => {
        setAnimationStage(2); // After the first animation, move to the 'returning' stage
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % feed.length);
          setAnimationStage(0); // Reset to initial stage
        }, 500); // Match this duration with your 'returning' animation duration
      }, 500); // Match this duration with your 'moved' animation duration
    } catch (error) {
      console.log('Error sending request: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!feed || feed.length === 0) {
    return <h1>No Feed Data</h1>;
  }

  return (
    <AnimatePresence>
      <motion.div
        key={feed[currentIndex].id} // Use a unique key for each feed item
        initial={{ opacity: 0, x: 0, y: 0 }} // Reset position on entry
        animate={{
          opacity: 1,
          x: animationStage === 1 ? (status === 'ignored' ? -500 : 500) : 0,
          y: animationStage === 1 ? (status === 'ignored' || status === 'interested' ? -500 : 0) : 0,
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5 }, // Ensure the card has time to exit
        }}
        transition={{ duration: 0.5 }}
      >
        <UserCard
          user={feed[currentIndex]}
          status={status}
          requestSent={requestSent}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Feed;
