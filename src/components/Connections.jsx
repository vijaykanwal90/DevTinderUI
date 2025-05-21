import React, { useEffect } from 'react'; // Removed useState as it's not used in the original logic
import axios from 'axios';
import { addConnection } from '@/features/connectionSlice'; // Assuming this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from '../components/ui/skeleton'; // Assuming this path is correct
import { BASE_URL } from '../constants'; // Assuming this path is correct
import { Link } from 'react-router-dom';
import { MessageSquare, Users, WifiOff } from 'lucide-react'; // For icons

// Placeholder for generic avatar if photoUrl is missing
const GENERIC_AVATAR_URL = "https://avatar.iran.liara.run/public";

// More representative skeleton for the initial loading state
const InitialLoadingSkeleton = () => (
  <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-10 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      <h1 className="font-bold text-3xl sm:text-4xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
        Connections
      </h1>
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-neutral-800/70 border border-neutral-700 rounded-xl">
            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Connections = () => {
  const dispatch = useDispatch();
  // This 'connection' variable from the store is expected to be the array of connections.
  // If it's an object like { connections: [...] }, you'd need store.connection.connections
  const connection = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/viewConnections`, { withCredentials: true });
      // Original dispatch: dispatch(addConnection(res?.data.connection));
      // Assuming res.data.connection is the array you want in the store.
      // If res.data.connection is [{connection: data1}, {connection: data2}],
      // then addConnection should expect that, or you map it here:
      // const actualConnections = res?.data?.connection?.map(item => item.connection) || [];
      // dispatch(addConnection(actualConnections));
      // For now, sticking to your exact dispatch:
      dispatch(addConnection(res?.data.connection));
    } catch (error) {
      console.log('Error fetching connections: ' + error);
      // No UI update for error in the original logic, so we keep it that way.
    }
  };

  useEffect(() => {
    // Only fetch if connection is initially null/undefined or explicitly empty
    // to avoid re-fetching if Redux already has data.
    // Your original code fetches every time on mount. If that's intended, keep it.
    // If `connection` is initially an empty array from Redux, this will still fetch.
    if (!connection || (Array.isArray(connection) && connection.length === 0)) {
        getConnections();
    }
  }, [dispatch]); // Keeping dispatch as the only dependency as per original intent

  // Initial loading state: when 'connection' from Redux is null or undefined
  if (!connection) {
    return <InitialLoadingSkeleton />;
  }

  // No connections state: when 'connection' is an empty array
  if (Array.isArray(connection) && connection.length === 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-6 text-center">
        <Users size={64} className="text-sky-400 mb-6" />
        <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
          No Connections Yet
        </h2>
        <p className="text-neutral-300 text-lg">
          Start connecting with others to see them here!
        </p>
      </div>
    );
  }

  // Ensure 'connection' is an array before attempting to map
  // This handles cases where `connection` might be something else initially from the store
  if (!Array.isArray(connection)) {
    // This case should ideally be handled by the initial loading or an error state
    // if the store shape is unexpected. For now, show loading.
    console.warn("Connections data from store is not an array:", connection);
    return <InitialLoadingSkeleton />;
  }

  return (
    <div className="min-h-screen  text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-bold text-3xl sm:text-4xl text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-500 to-orange-500">
          Your Connections
        </h1>

        <div className="space-y-6">
          {/* Preserving your original mapping structure: connection.map(({ connection: connData }) => ...)
              This implies that the `connection` array from the store contains objects like:
              { connection: { _id: '...', firstName: '...' } }
          */}
          {connection.map(({ connection: connData }, index) => {
            // It's good practice to ensure connData exists, especially with complex nested data
            if (!connData) {
              console.warn(`Connection data at index ${index} is missing or malformed.`);
              return null; 
            }
            const { _id, firstName, lastName, photoUrl, about } = connData;
            return (
              <div
                key={_id || index} // Fallback key if _id is somehow missing
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-neutral-700 p-4 sm:p-6 rounded-xl shadow-xl hover:shadow-sky-500/20 transition-all duration-300 hover:border-sky-600 group"
              >
                <img
                  src={photoUrl || `${GENERIC_AVATAR_URL}?name=${firstName}+${lastName}`}
                  alt={`${firstName || 'User'} ${lastName || ''}`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20 border-2 border-neutral-600 group-hover:border-sky-500 transition-colors duration-300 flex-shrink-0"
                />

                <div className="flex-1 text-center sm:text-left min-w-0">
                  <h2 className="font-semibold text-lg sm:text-xl text-sky-400 group-hover:text-sky-400 transition-colors duration-300 truncate">
                    {firstName || 'Unknown'} {lastName || 'User'}
                  </h2>
                  <p className="text-sm text-neutral-400 line-clamp-2 mt-1">
                    {about || "No bio available."}
                  </p>
                </div>

                <div className="w-full sm:w-auto mt-3 sm:mt-0 flex-shrink-0">
                  <Link to={`/chat/${_id}`} className="block w-full">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-300 via-blue-400 to-purple-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:from-sky-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-neutral-900">
                      <MessageSquare size={18} />
                      Chat
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;