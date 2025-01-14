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
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { addUser } from '../features/userSlice'
const Profile = () => {
  const userData = useSelector((state) => state.user)
  const {firstName , lastName , about , photoUrl} = userData
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
        userData && (

          <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{firstName + " " + lastName}</CardTitle>
        <CardDescription>{about}.</CardDescription>
      </CardHeader>
      <CardContent>
          <img src={photoUrl} alt="Profile Picture" className="rounded-lg" />
      </CardContent>
      <CardFooter className="flex justify-end">
       
        <Button>Edit</Button>
      </CardFooter>
    </Card>
        )
     
  )

}

export default Profile
