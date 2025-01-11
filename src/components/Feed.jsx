import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
const Feed = () => {
    const [users, setUsers]= useState([])
    const fetchData = async()=>{
        const res = await axios.get("http://localhost:3000/feed", {withCredentials:true})
        console.log(res.data)
        setUsers(res.data)
    }
    useEffect(()=>{
        fetchData()


    },[])
  return (
    <div className='text-white'>
      This is the feed
      {
          users.map((user)=>{
              return(
                <Card  key={user.id} className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{user.firstName + " " + user.lastName}</p>
                  <small className="text-default-500 text-green-500">{user.about}</small>
                  <h4 className="font-bold text-large">Frontend Radio</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={270}
                  />
                </CardBody>
              </Card>
              )
          })
      }
      {/* <Card>

      </Card> */}
          
           
    </div>
  )
}

export default Feed
