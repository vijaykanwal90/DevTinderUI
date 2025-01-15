import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import ProfileEdit from './ProfileEdit'
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { addUser } from '../features/userSlice'
const Profile = () => {
  const userData = useSelector((state) => state.user)
  const {firstName , lastName , about , photoUrl} = userData
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()
  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/profile", { withCredentials: true });
    console.log(res)
    dispatch(addUser(res.data))
    return res.data
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      {/* Check if userData exists */}
      {userData ? (

      
        // If userData exists, render the profile or edit section
        
          <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{userData.firstName + " " + userData.lastName}</CardTitle>
        <CardDescription>{userData.age + " " + userData.about}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={userData.photoUrl} alt="" />
      </CardContent>
      <CardFooter className="flex justify-between">
                   
               <ProfileEdit />
              </CardFooter>
          </Card>
        
      ) : (
        // If userData doesn't exist, show the login message
        <p className="text-gray-500">Please log in to view your profile.</p>
      )}
    </div>
  )
  


}

export default Profile
