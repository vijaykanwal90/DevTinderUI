import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addRequest } from '@/features/requestSlice'
import { removeRequest } from '@/features/requestSlice'
import { Button } from './ui/button'
import { ConstructionIcon } from 'lucide-react'
import { BASE_URL } from "../constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store )=> store.request)
  // console.log(requests[0].fromUserId.firstName)
  const [request, setRequest] = useState([])
  const fetchRequests = async ()=>{
    
    try {
      console.log("on request review")
      const res = await axios.get(`${BASE_URL}/user/received`, {withCredentials: true})  
      // console.log("the response is " + JSON.stringify(res.data))
      // console.log(res)
      // console.log(requests)
    dispatch(addRequest(res.data.connection))
    setRequest(res.data.connection)
    } catch (error) {
      console.log("error is " + error.message)
    }

    
  }
  const handleClick = (status,requestId)=> async()=>{
    
    console.log(BASE_URL)
    // console.log(_id)
    const res = await axios.post(`${BASE_URL}/request/reviewConnectionRequest/`+ status + "/" + requestId,{}, {withCredentials:true})
    
    dispatch(removeRequest(res.userId))
  }
  useEffect(()=>{
    fetchRequests()
  },[])

 console.log(request)
 if(!request){
    return <h1>Loading...</h1>
 }
 if(request.length===0){
  return <div className='min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-orange-400 to-red-500 text-2xl font-bold text-center bg-clip-text text-transparent '>
  No Requests

</div>;
}
  return (
 <div className='my-10 flex justify-center'>
  <div className='w-full max-w-md mx-auto'>
    <h1 className='font-bold text-3xl text-center mb-6 text-gray-800'>Requests</h1>
    {requests.map((request) => {
      const { firstName, lastName, photoUrl, about  } = request.fromUserId;
      const requestId = request._id;
      return (
        <div key={request._id} className="flex items-center my-5 bg-gray-200 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-gray-300">
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
            <p className="text-sm text-black line-clamp-2">{about}</p>
          </div>
          <div className='flex flex-col gap-2 mx-auto'>
            <Button className="bg-red-500" onClick = {handleClick("rejected",request._id)}>Reject</Button>
            <Button className="bg-green-500"onClick = {handleClick("accepted", requestId)}>Accept</Button>

            
          </div>
        </div>
      );
    })}
  </div>
</div> 

 )
}

export default Requests
