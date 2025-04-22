import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardFooter, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { addUser } from '../features/userSlice';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProfileEdit = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName || ' ');
  const [lastName, setLastName] = useState(user?.lastName || ' ');
  const [age, setAge] = useState(user?.age || ' ');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || ' ');
  const [gender, setGender] = useState(user?.gender || ' ');
  const [about, setAbout] = useState(user?.about || ' ');
  const [location, setLocation] = useState(user?.location || ' ');
  const [locationSuggestion, setLocationSuggestion] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const key = process.env.REACT_APP_LOCATIONIQ_KEY;
  console.log(key)
  const dispatch = useDispatch();

  const getCurrentLocation = async () => {
    console.log('Getting current location...');
    let latitude = 0;
    let longitude = 0;

    navigator.geolocation.getCurrentPosition(async (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      try {
        // console.log(process.env.REACT_APP_LOCATIONIQ_KEY);
        const res = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&lat=${latitude}&lon=${longitude}&format=json`
        );
        const { country, county, halt, state } = res.data.address;
        setSelectedLocation(`${halt}, ${county}, ${state}, ${country}`);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    }, (error) => {
      console.error('Error getting location:', error);
    });
  };

  const searchLocation = async (e) => {
    const value = e.target.value;
    console.log(value)
    setLocation(value);
    if (value.length > 5) {
      try {
        const res = await axios.get(
          `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${value}&countrycodes=IN&format=json&limit=5`
        );
        console.log(res.data)
        // setLocation(res.data[0].display_name)
        console.log(location)
        setLocationSuggestion(res.data); // Update suggestions with API response
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
      }
    } else {
      setLocationSuggestion([]); // Clear suggestions when input is short
    }
  };

  const handleSelectedSuggestion = (suggestion) => {
    setSelectedLocation(suggestion.display_name);
    setLocation(suggestion.display_name);
    setLocationSuggestion([]); // Clear suggestions
  };

  const handleSubmit = async () => {
    try {
      console.log("location is",location)
      const res = await axios.patch(
        `${BASE_URL}/dashboard/profile/edit`,
        { firstName, lastName, age, photoUrl, gender, about,location },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        toast.success('Profile updated successfully');
      }
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error('Error updating profile');
    }
  };

  return (
    <Card className="w-[350px] h-[550px]">
  <CardTitle className="text-center my-2">Edit Profile</CardTitle>

  <div className="grid gap-4 py-4 px-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="firstName" className="text-right">
        FirstName
      </Label>
      <Input
        type="text"
        name="firstName"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className="col-span-3"
      />
    </div>

    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="lastName" className="text-right">
        LastName
      </Label>
      <Input
        name="lastName"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className="col-span-3"
      />
    </div>

    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="age" className="text-right">
        Age
      </Label>
      <Input
        name="age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className="col-span-3"
      />
    </div>

    <div className=" items-center gap-4 relative">
      <div className='grid grid-cols-4 items-center gap-4 mx-auto'>
      <Label htmlFor="location" className="text-right">
        Location
      </Label>
      <Input
        name="location"
        onChange={searchLocation}
        value={location}
        className="col-span-3 relative "
      />
      </div>
      <div>
      {locationSuggestion.length > 0 && (
        <div className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto left-0 col-span-3">
          {locationSuggestion.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectedSuggestion(suggestion)}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
      </div>
   
      
    </div>
    <div className=''>
    
    </div>

    <div className="flex justify-between items-center gap-4 mx-auto">
      <Button
        className="text-white bg-gray-900 px-8 py-2 rounded-lg"
        onClick={getCurrentLocation}
      >
        Get location
      </Button>
    </div>

    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="photoUrl" className="text-right">
        Photo
      </Label>
      <Input
        name="photoUrl"
        onChange={(e) => setPhotoUrl(e.target.value)}
        value={photoUrl}
        className="col-span-3"
      />
    </div>

    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="gender" className="text-right">
        Gender
      </Label>
      <Select value={gender} onValueChange={(value) => setGender(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Gender</SelectLabel>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="about" className="text-right">
        About
      </Label>
      <Input
        name="about"
        onChange={(e) => setAbout(e.target.value)}
        value={about}
        className="col-span-3"
      />
    </div>

    <CardFooter className="flex justify-between">
      <Button onClick={handleSubmit}>Save Profile</Button>
    </CardFooter>
  </div>
</Card>

  );
};

export default ProfileEdit;
