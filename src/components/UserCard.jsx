import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFeed } from "../features/feedSlice";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import axios from "axios";
const UserCard = ({ user }) => {
  // const user = useSelector((state) => state.feed);
  // const [status , setStatus] = useState('')
  // const [toUser, setToUser] = useState('');
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, about } = user;
  const feed = useSelector((state) => state.feed);
  // console.log("feed data is " + toUser)
  const requestSent = (status, toUser) => async () => {
    // console.log("status is "  + status  + " " + " userId is " +  toUser)
    try {
      const res = await axios.post(
        `http://localhost:3000/sendConnectionRequest/${status}/${toUser}`,
        {},
        { withCredentials: true }
      );
      // console.log(res.data)
      console.log("the status i s")
      console.log(status)

      // console.log("action take in revie")
      dispatch(removeFeed(toUser));
    } catch (error) {
      console.log("error is " + error.message);
    }
  };
  // console.log( " from user Card " + firstName)
  return (
    <div>
      <Card key={user._id} className="py-4 bg-gray-500 m-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {firstName + " " + lastName}
          </p>
          <small className="text-default-500 text-green-500">{about}</small>
          {/* <h4 className="font-bold text-large">Frontend Radio</h4>  */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt="Card background"
            className="object-cover rounded-xl"
            src={photoUrl}
            width={270}
          />
        </CardBody>

        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={ requestSent("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={requestSent("interested", _id)}
          >
            Interested
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
