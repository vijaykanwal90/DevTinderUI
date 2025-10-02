import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { FaThumbsUp, FaTimes } from "react-icons/fa";

const UserCard = ({ user, requestSent }) => {
  const { _id, firstName, lastName, photoUrl, about } = user;

  return (
    <div className="w-full sm:w-[320px] mx-auto">
      <Card
        key={_id}
        className="m-4 bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border border-gray-200 dark:border-neutral-700"
      >
        <CardHeader className="pb-0 pt-4 px-5 flex-col items-start">
          <p className="uppercase font-bold text-gray-800 dark:text-white text-sm tracking-wide">
            {firstName + " " + lastName}
          </p>
          <small className="text-indigo-500 dark:text-indigo-400 mt-1">{about}</small>
        </CardHeader>

        <CardBody className="py-3 px-5">
          <img
            alt={`${firstName}'s profile`}
            src={photoUrl}
            className="w-full h-48 object-cover rounded-xl border border-gray-300 dark:border-neutral-700"
          />
        </CardBody>

        {/* Buttons in the same row with equal width */}
        <div className="flex gap-3 px-5 pb-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => requestSent("ignored", _id)}
          >
            <FaTimes /> Ignore
          </button>

          <button
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => requestSent("interested", _id)}
          >
            <FaThumbsUp /> Interested
          </button>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
