import React from "react";
import { Link } from "react-router-dom";

interface NavLink {
  name: string;
  link: string;
}

interface AdminHeaderProps {
  text: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ text }) => {
  const navLinks: NavLink[] = [
    {
      name: "Manage users",
      link: "manage-users",
    },
    {
      name: "Manage doctors",
      link: "manage-doctors",
    },
    {
      name: "Manage appointments",
      link: "manage-appointments",
    },
  ];

  return (
    <div className="h-16 bg-white w-full flex items-center border-b-2 border-blue-200">
      <div className="flex px-10 items-center justify-between w-full">
        <h1 className="text-2xl font-medium uppercase">{text}</h1>
        <Link
          to={"/sign-in"}
          className="px-5 py-1 hover:bg-gray-200 hover:cursor-pointer transition duration-300 ease-in-out bg-gray-100 rounded-lg font-medium text-blue-500 text-xl"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
