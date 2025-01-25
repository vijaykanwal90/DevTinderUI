import React from "react";

import { Card, CardHeader, CardBody} from "@nextui-org/react";

const UserCard = ({ user ,requestSent}) => {
 
  const { _id, firstName, lastName, photoUrl, about } = user;
  // const feed = useSelector((state) => state.feed);
  
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
            alt="image"
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
