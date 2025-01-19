import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect , useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { addUser } from '../features/userSlice'
import ProfileEdit from './ProfileEdit'
const Profile = () => {
 
  const user = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()
  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/profile", { withCredentials: true });
    // console.log("profile data :" + res?.data?.data.firstName)
    dispatch(addUser(res?.data?.data))
    
  }
  const handleIsOpen = ()=>{
    setIsOpen(!isOpen)

  }

  useEffect(() => {
    if(user){
      return ;
    }
    fetchData()
  }, [])
  return (
    <div>
      {/* Check if userData exists */}
      {user ? (

      <div className='flex gap-4 justify-end'>
        <div> 
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{user?.firstName + " " + user?.lastName}</CardTitle>
        <CardDescription>{user?.age + " " + user?.about + " " + user?.gender}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={user?.photoUrl} alt="" />
      </CardContent>
      <CardFooter className="flex justify-between">
                   
               <Button onClick ={handleIsOpen

               }>{isOpen? "Close" :"Edit Profile"}</Button>
              </CardFooter>
          </Card>
        </div>
        <div className={isOpen?'visible':'invisible'}>
               <ProfileEdit isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
      </div>
      
        // If userData exists, render the profile or edit section
        
          
        
      ) : (
        // If userData doesn't exist, show the login message
        <p className="text-gray-500">Please log in to view your profile.</p>
      )}
    </div>
  )
  


}

export default Profile
