import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="mx-20 py-8 border-t-2 border-blue-50 flex flex-col gap-10">
      <div className="flex flex-row items-center gap-14">
        <h1 className="text-blue-400 text-3xl italia font-semibold">
          Health hub
        </h1>
        <span className="text-gray-500">
          Copyright © 2024 Health hub, All rights reserved.
        </span>
      </div>
      <div className="flex flex-row gap-10">
        <div className="flex flex-col w-48 gap-6">
          <h1 className="font-medium text-blue-900">Our company</h1>
          <div className="flex flex-col gap-1">
            <span>About us</span>
            <span>Privacy Policy</span>
            <span>Help</span>
            <span>Health</span>
          </div>
        </div>
        <div className="flex flex-col w-48 gap-6">
          <h1 className="font-medium text-blue-900">Find your specialist</h1>
          <div className="flex flex-col gap-1">
            <span>Orthopädie und Unfallchirurgie</span>
            <span>Allgemeinmedizin (Hausarzt)</span>
            <span>Neurologie</span>
            <span>Frauenheilkunde und Geburtshilfe</span>
            <span>Innere Medizin und Kardiologie</span>
          </div>
          <span>All specialties</span>
        </div>
        <div className="flex flex-col w-48 gap-6">
          <h1 className="font-medium text-blue-900">
            For health professionals
          </h1>
          <div className="flex flex-col gap-1">
            <span>Health hub Pro management software</span>
            <span>Doctolib Community</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-14">
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Country:</span>
            <span>Deutschland</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Language:</span>
            <span>English</span>
          </div>
        </div>
        <div className="flex text-2xl hover:cursor-pointer text-blue-500 flex-row gap-4">
          <FaFacebookSquare />
          <FaSquareWhatsapp />
          <RiTwitterXFill />
          <IoLogoYoutube />
          <FaInstagram />
        </div>
      </div>
    </div>
  );
};

export default Footer;
