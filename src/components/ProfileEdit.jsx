import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
  import { Label } from "./ui/label"
  import { Input } from "./ui/input"
  import axios from 'axios'
  import { useState , useEffect } from 'react'
  import { useSelector } from 'react-redux'
  import { addUser } from '@/features/userSlice'
  import { useDispatch } from 'react-redux'
const ProfileEdit = () => {
    const user = useSelector((state) => state.user)
    const {firstName,lastName,age, photoUrl , gender,about} = user;
    const dispatch = useDispatch()
    const [formData,setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        age: age || '', 
        photoUrl: photoUrl  || '',
        gender:gender || '',
        about:about || '', 
    })
    console.log("user data from store " + user.firstName)
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                age: user.age || '',
                photoUrl: user.photoUrl || '',
                gender: user.gender || '',
                about: user.about || '',
            });
        }
    }, [user]);
    // console.log("the user data is " + JSON.stringify(user))
    // console.log(user.firstName)
    const handleChange = (e)=>{
        const {name,value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }))
          console.log("the first name is " + formData)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(" while submitting " + formData)
        const res = await axios.patch("http://localhost:3000/profile/edit",formData , { withCredentials: true }); 
        console.log("submitted form data" + JSON.stringify(formData))
        if(res.status==200){
            console.log("profile updated successfully")
            dispatch(addUser(res.data))
        }
        // console.log(res.data)
    }
    // useEffect(() => {
    //     console.log("the form data updated" + formData);
    // }, [formData]);
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstName" className="text-right">
            FirstName
          </Label>
          <Input type="text" name="firstName" onChange={handleChange} value={formData.firstName} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            LastName
          </Label>
          <Input name="lastName" onChange={handleChange} value={formData.lastName} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Age
          </Label>
          <Input name="age" onChange={handleChange}  value={formData.age} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Photo
          </Label>
          <Input name="photoUrl" onChange={handleChange}  value={formData.photoUrl} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
          Gender
          </Label>
          <Input name="gender" onChange={handleChange}  value={formData.gender} className="col-span-3 text-black" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            About
          </Label>
          <Input name="about" onChange={handleChange}  value={formData.about} className="col-span-3" />
        </div>

      </div>
      <DialogFooter>
        <Button onClick={handleSubmit}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ProfileEdit
