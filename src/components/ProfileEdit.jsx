import React from 'react'
import {useSelector} from 'react-redux'
import { Card, CardFooter, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../features/userSlice'
import {toast} from "sonner"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ProfileEdit = ({isOpen,setIsOpen}) => {
  const user = useSelector((state) => state.user)
  const [firstName, setFirstName] = useState(user?.firstName || " ")
  const [lastName, setLastName] = useState(user?.lastName || " ")
  const [age, setAge] = useState(user?.age || " ")
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || " ")
  const [gender,setGender] = useState(user?.gender  || " ")
  const [about,setAbout] = useState(user?.about || " ")
  

  const dispatch = useDispatch()
  // const [isOpen, setIsOpen] = useState(false)
  
    const handleSubmit = async (e) => {
  
        e.preventDefault();
        try{
          const res = await axios.patch(
            "http://localhost:3000/profile/edit",
            {firstName,lastName,age,photoUrl
              ,gender,about
            },
            { withCredentials: true }
          );
          // console.log("submitted form data" + JSON.stringify(formData));
          if (res.status == 200) {
            // console.log("profile updated successfully");
            dispatch(addUser(res.data.data));
            toast.success('Profile updated successfully')
          }
          setIsOpen(false);

        }
        catch(err){
          console.log(err)
          toast.error('Error updating profile')
        }
        // console.log(" while submitting " + formData);
       
        
        // console.log(res.data)
      // setIsOpen(!sOpen)
  
  
      };
  return (
    <Card className="w-[350px]">
    <CardTitle>Edit Profile</CardTitle>

    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="firstName" className="text-right">
          FirstName
        </Label>
        <Input
          type="text"
          name="firstName"
          onChange={(e)=>{setFirstName(e.target.value)}}
          value={firstName}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          LastName
        </Label>
        <Input
          name="lastName"
          onChange={(e)=>{setLastName(e.target.value)}}
          value={lastName}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Age
        </Label>
        <Input
          name="age"
          onChange={(e)=>{setAge(e.target.value)}}
          value={age}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Photo
        </Label>
        <Input
          name="photoUrl"
          onChange={(e)=>{setPhotoUrl(e.target.value)}}
          value={photoUrl}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Gender
        </Label>
        {/* <Input
          name="gender"
          onChange={(e)=>{setGender(e.target.value)}}
          value={gender}
          className="col-span-3 text-black"
        /> */}
        <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Gender"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gender</SelectLabel>
            <SelectItem value="Male" onClick={(e)=>{setGender(Male)}}>Male</SelectItem>
          <SelectItem value="Female" onClick={(e)=>{setGender(Female)}}>Female</SelectItem>
          </SelectGroup>
        </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          About
        </Label>
        <Input
          name="about"
          onChange={(e)=>{setAbout(e.target.value)}}
          value={about}
          className="col-span-3"
        />
      </div>
    </div>
    <CardFooter className="flex justify-between">
               
           <Button onClick ={handleSubmit

           }>Save Profile</Button>
          </CardFooter>
    </Card>
  )
}

export default ProfileEdit