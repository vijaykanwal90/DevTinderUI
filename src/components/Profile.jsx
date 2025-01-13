import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      Profile page 
      <div>
        <h1>{user.firstName}</h1>
        <img src={user.photoUrl} alt="profile" />
      </div>

    </div>
  ) 
  
}

export default Profile
