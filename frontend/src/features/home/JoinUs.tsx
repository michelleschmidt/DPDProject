import React from "react";
import { HireDoc, HireDoc2 } from "../../utils/assets";
import { HiOutlineInformationCircle } from "react-icons/hi";

const JoinUs: React.FC = () => {
  return (
    <div className="px-20 py-20 flex flex-col gap-16">
      <div className="bg-blue-50 flex flex-row items-center justify-between p-8 rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="font-semibold text-2xl text-lg">Health Connect is hiring</h1>
          <span>Work with us to improve healthcare.</span>
          <div className=" px-3 py-1.5 text-blue-500 font-medium border border-blue-500 hover:bg-blue-500 hover:text-white hover:cursor-pointer transition duration-300 rounded-lg">
            JOIN IN
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <span className="font-semibold">
            Do you have a question or need help?
          </span>
          <span>
            Get answers to frequently asked questions in our help section
          </span>
        </div>
        <div className="flex flex-row items-center gap-1 px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200">
          <HiOutlineInformationCircle />
          <span className="font-semibold">ACCESS HELP AREA</span>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
