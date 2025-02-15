import React, {useState , useEffect} from 'react'
import axios from 'axios'
import { addConnection } from '@/features/connectionSlice'
import { useDispatch } from 'react-redux'
import { Skeleton } from "../components/ui/skeleton";
import { BASE_URL } from "../constants";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
const Connections = () => {
  // const [connection, setConnection] = useState([])
  // console.log(BASE_URL)
  const dispatch = useDispatch()
  const connection = useSelector((store) => store.connection)
  // console.log(connection[0].connection.firstName)
  // console.log(connection?.connection?.firstName)
  // console.log(connection)

  const getConnections = async()=>{
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`,{withCredentials:true})
      // console.log(res.data.connection)
      // setConnections(res.data.connection)
      // console.log('this is response from api')
      // console.log(res)
      // console.log(res.data.connection[0].connection)
      dispatch(addConnection(res?.data.connection))
      // setConnection(res.data.connection)
      
      // console.log("the connections are " + connections)
    } catch (error) {
      console.log("error is " + error)
    }
  }
  useEffect(()=>{
    setTimeout(() => {
    
    },5000)
    getConnections()
  },[])
  if(!connection){
    return <Skeleton className="w-[100px] h-[20px] rounded-full" />

  }
  if(connection.length===0){
    return <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent '>
    No Connections

  </div>;
  }
  return (
 <div className='my-10 flex justify-center'>
  <div className='w-full max-w-md mx-auto'>
    <h1 className='font-bold text-3xl text-center mb-6 text-gray-800'>Connections</h1>
    {connection.map((connection) => {
      const { _id , firstName, lastName, photoUrl, about } = connection.connection;
      return (
        <div  key = {_id} className="flex items-center my-5 bg-gray-200 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-300">
          <div className="mr-4 flex-shrink-0">
            <img
              src={photoUrl || "/placeholder.svg"}
              alt={`${firstName} ${lastName}`}
              width={48}
              height={48}
              className="rounded object-cover"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-semibold text-lg text-gray-800">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{about}</p>
          </div>
          <div>
            <Link to={"/chat/"+_id }>
            <button className=' text-white bg-black px-4 py-2 border rounded-lg  cursor-pointer hover:shadow-xl shadow-black'>
            Chat</button>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</div> 

 )
}

export default Connections
