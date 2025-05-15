import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed, removeFeed } from '../features/feedSlice';
import { motion, AnimatePresence } from 'framer-motion';
import UserCard from './UserCard';
import { BASE_URL } from "../constants";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const [status, setStatus] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log('Error fetching feed data: ' + error.message);
    }
  };

  const requestSent = (newStatus, toUser) => async () => {
    setStatus(newStatus);
    try {
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

  // 🛠️ ADDITIONAL CHECK: if feed is empty or no more users left
  if (!feed || feed.length === 0 || currentIndex >= feed.length) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent'>
        No users to show!
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={feed[currentIndex]?.id}
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{
          opacity: 1,
          x: animationStage === 1 ? (status === 'ignored' ? -500 : 500) : 0,
          y: animationStage === 1 ? (status === 'ignored' || status === 'interested' ? -500 : 0) : 0,
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.5 },
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
