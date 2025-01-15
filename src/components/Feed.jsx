import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { addFeed } from '../features/feedSlice';

const Feed = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const [toUser, setToUser] = useState('');

  const [status , setStatus] = useState('')
  const feed = useSelector((state) => state.feed);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
    console.log(res.data);
    dispatch(addFeed(res.data));
    setUsers(res.data);
  };
  // console.log(status)
  const requestSent = async ()=>{
    console.log("status is "  + status  + " " + " userId is " +  toUser)
    try {
      const res = await axios.post(`http://localhost:3000/sendConnectionRequest/${status}/${toUser}`,{},{withCredentials:true});
      console.log(res.data)
    // dispatch(addFeed(res.data))

    } catch (error) {
      console.log("error is " + error.message)
    }
    
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    if(status===''){
      return;
    }
    requestSent()
    
    
  },[status])

  return (
    <div>
      {users && users.map((user) => (
        <Card key={user.id} className="py-4 bg-gray-500 m-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{user.firstName + " " + user.lastName}</p>
            <small className="text-default-500 text-green-500">{user.about}</small>
            {/* <h4 className="font-bold text-large">Frontend Radio</h4> */}
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={user?.photoUrl}
              width={270}
            />
          </CardBody>
          {/* <p>{user.about}</p> */}
          <div className='flex justify-center gap-4'>
          <button className='bg-red-600' onClick={()=>{setStatus('ignored');
            setToUser(user._id)}}>Ignore</button>
          <button className='bg-green-600' onClick={() =>{setStatus('interested');
            setToUser(user._id)
          }}>Interested</button>
          </div>
          

        </Card>
      ))}
    </div>
  );
};

export default Feed;
