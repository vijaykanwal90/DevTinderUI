'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "./ui/card"
import { Badge } from "./ui/badge"
import { BASE_URL } from "../utils/constants";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, UserIcon, CameraIcon, EditIcon } from 'lucide-react'
import { addUser } from '../features/userSlice'
import ProfileEdit from './ProfileEdit'
import { motion, AnimatePresence } from 'framer-motion'

const Profile = () => {
  const user = useSelector((state) => state.user)
  const [isOpen, setIsOpen] = React.useState(false)
  const dispatch = useDispatch()

  const fetchData = async () => {
    const res = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
    dispatch(addUser(res?.data?.data))
  }

  const handleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (user) {
      return;
    }
    fetchData()
  }, [user, fetchData]) // Added fetchData to dependencies

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="w-[350px] text-center p-6">
          <CardHeader>
            <UserIcon className="w-12 h-12 mx-auto text-muted-foreground" />
            <CardTitle className="mt-4">Welcome to DevTinder</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Log In</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 my-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[350px_1fr]">
          {/* Profile Card */}
          <Card className="h-fit">
            <CardHeader className="relative pb-0">
              <div className="absolute right-4 top-4 flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleIsOpen}>
                  <EditIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative w-48 h-48 mx-auto mb-4">
                {user?.photoUrl ? (
                  <img 
                    src={user.photoUrl || "/placeholder.svg"} 
                    alt={`${user.firstName}'s profile`}
                    className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                    <CameraIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-center text-2xl">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                <CalendarIcon className="w-4 h-4" />
                <span>{user?.age} years old</span>
                <span>•</span>
                <MapPinIcon className="w-4 h-4" />
                <span>New York</span>
              </div>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <Badge variant="secondary">{user?.gender}</Badge>
                <Badge variant="secondary">Developer</Badge>
                <Badge variant="secondary">React</Badge>
              </div>
              <p className="text-muted-foreground text-center">
                {user?.about || "No bio added yet"}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold">128</p>
                  <p className="text-xs text-muted-foreground">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">842</p>
                  <p className="text-xs text-muted-foreground">Profile Views</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Matches</p>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="about" className="w-full">
              <TabsList>
                <TabsTrigger value="about" disabled={isOpen}>About</TabsTrigger>
                <TabsTrigger value="photos" disabled={isOpen}>Photos</TabsTrigger>
                <TabsTrigger value="interests" disabled={isOpen}>Interests</TabsTrigger>
              </TabsList>

              {!isOpen && (
                <>
                  <TabsContent value="about" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About Me</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {user?.about || "Tell others about yourself by editing your profile."}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="photos" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Photos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                              <CameraIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="interests" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Interests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {['Programming', 'React', 'Node.js', 'TypeScript', 'Open Source', 'UI/UX'].map((interest) => (
                            <Badge key={interest} variant="secondary">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>

            {/* Edit Profile Section with Animation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ProfileEdit isOpen={isOpen} setIsOpen={setIsOpen} />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
