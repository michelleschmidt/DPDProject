import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoQuestion } from "react-icons/go";

const Header: React.FC = () => {
  const [help, setHelp] = useState<boolean>(false);

  const toggle = () => {
    setHelp(!help);
  };

  return (
    <div className="bg-blue-600 w-full h-16 items-center flex px-20">
      <div className="flex flex-row justify-between w-full">
        <Link
          to="/"
          className="z-10 flex flex-row items-center italia text-white font-medium text-2xl"
        >
          <h1>Health Connect</h1>
        </Link>
        {help && (
          <div
            onClick={toggle}
            className="w-full z-2 fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0"
          ></div>
        )}
        <div className="flex flex-row items-center gap-6">
          <div
            onClick={toggle}
            className="flex transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg z-10 items-center gap-1"
          >
            <GoQuestion color="white" />
            <div className="text-white text-sm italia">Help center</div>
          </div>
          {help && <Help />}
          <div className="flex flex-row items-center gap-4">
            <Link
              to="/signin"
              className="z-10 text-white transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg text-sm italia"
            >
              Sign in
            </Link>
            <Link
              to="/admindashboard"
              className="z-10 text-white transition duration-300 ease-in pb-2 hover:cursor-pointer hover:bg-[#f1f1f1aa] p-2 py-1 rounded-lg text-sm italia"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const Help: React.FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.2 }}
        className="absolute h-40 z-3"
      >
        <div className="w-[320px] p-4 ml-[-200px] mt-[120px] rounded-lg bg-white">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-1 items-center">
              <div className="rounded-full flex items-center border-black justify-center w-4 h-4 border-2">
                <div className="text-[12px] text-black font-bold">?</div>
              </div>
              <h1 className="font-medium">Frequently Asked Questions</h1>
            </div>
            <div className="flex flex-col gap-1">
              <Link
                to="/sign-up"
                className="hover:underline transition duration-200 ease-in-out"
              >
                Create a Health Connect account
              </Link>
              <span>How can I make an appointment?</span>
              <span>Share a document with my doctor</span>
            </div>
            <div className="text-blue-400">Visit Help Center</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
