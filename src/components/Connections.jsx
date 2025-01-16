import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { addConnection } from '@/features/connectionSlice'
import { useDispatch } from 'react-redux'
// import { useSelect } from '@nextui-org/react'
import { useSelector } from 'react-redux'
const Connections = () => {
  const [connection, setConnection] = useState([])

  const dispatch = useDispatch()
  const connections = useSelector((state) => state.connection)
  const getConnections = async()=>{
    try {
      const res = await axios.get('http://localhost:3000/user/connections',{withCredentials:true})
      console.log(res.data.connection)
      // setConnections(res.data.connection)
      dispatch(addConnection(res.data.connection))
      setConnection(res.data.connection)
      
      console.log("the connections are " + connections)
    } catch (error) {
      console.log("error is " + error)
    }
  }
  useEffect(()=>{
    getConnections()
  },[])
  if(!connections){
    return <h1>Loading...</h1>
  }
  if(connections.length===0){
    return <h1>No Connections</h1>
  }
  return (
 <div className='my-10 flex justify-center'>
  <div className='w-full max-w-md mx-auto'>
    <h1 className='font-bold text-3xl text-center mb-6 text-gray-800'>Connections</h1>
    {connection.map((connection) => {
      const { firstName, lastName, photoUrl, about } = connection.fromUserId;
      return (
        <div className="flex items-center my-5 bg-gray-200 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-300">
          <div className="mr-4 flex-shrink-0">
            <img
              src={photoUrl || "/placeholder.svg"}
              alt={`${firstName} ${lastName}`}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-semibold text-lg text-gray-800">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{about}</p>
          </div>
        </div>
      );
    })}
  </div>
</div> 

 )
}

export default Connections
