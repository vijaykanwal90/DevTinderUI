import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { addConnection } from '@/features/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '../components/ui/skeleton';
import { BASE_URL } from '../constants';
import { Link } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/viewConnections`, { withCredentials: true });
      dispatch(addConnection(res?.data.connection));
    } catch (error) {
      console.log('error is ' + error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connection) {
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  }

  if (connection.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent">
        No Connections
      </div>
    );
  }

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-bold text-3xl text-center mb-8 text-gray-800">Connections</h1>

        {connection.map(({ connection: connData }) => {
          const { _id, firstName, lastName, photoUrl, about } = connData;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-300"
            >
              <img
                src={photoUrl || '/placeholder.svg'}
                alt={`${firstName} ${lastName}`}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
              />

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-semibold text-lg text-gray-800">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2">{about}</p>
              </div>

              <div>
                <Link to={`/chat/${_id}`}>
                  <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-black text-white px-4 py-2 rounded-lg shadow hover:shadow-black hover:scale-[1.02] transition">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
