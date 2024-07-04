import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const HeroSection: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row bg-blue-600 h-[470px] rounded-bl-3xl">
        <div className="pl-20 pl:lgl-32 w-[60%]  h-full flex flex-col gap-9 justify-center">
          <div className="px-2 flex flex-col text-white font-medium text-3xl italia2">
            Find or book an
            <p className="italia text-blue-200">appointment</p>
          </div>
          <div className="bg-white gap-1.5 px-3 flex items-center flex-row rounded-3xl h-14 w-full">
            <IoSearchOutline size={24} />
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Name, field of expertise, institution"
            />
          </div>
        </div>
        <div className="w-[40%] flex items-end justify-end">
          <img
            src="https://www.doctolib.de/webpack/f8b7d70334306c6f72aa.webp"
            alt=""
            className="h-[400px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
