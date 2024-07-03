import React, { useState } from "react";
import PageLayout from "../../components/website/layout/PageLayout";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineMail, MdOutlineRecentActors } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";

interface Appointment {
  name: string;
  type: string;
  time: string;
}

const appointments: Appointment[] = [
  {
    name: "Muhsina Karim",
    type: "FIRST VISIT",
    time: "12:00 PM",
  },
  {
    name: "Wagner Meyer",
    type: "EMERGENCY",
    time: "11:00 AM",
  },
  {
    name: "Bauer Koch",
    type: "CONSULTANCY",
    time: "10:00 AM",
  },
  {
    name: "Fischer Wagner",
    type: "FIRST VISIT",
    time: "1:00 PM",
  },
  {
    name: "Schneider Bauer",
    type: "EMERGENCY",
    time: "1:00 PM",
  },
  {
    name: "Muller Koch",
    type: "CONSULTANCY",
    time: "11:00 AM",
  },
];

const DoctorDashboard: React.FC = () => {
  const [reminder, setReminder] = useState<string>("");

  return (
    <PageLayout text="Dashboard">
      <div className="h-[96vh] flex flex-row">
        <div className="w-[70%] py-10 px-14 gap-6 flex flex-col ">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-blue-500">
              Welcome Dr. Mary!
            </h1>
            <div className="flex flex-col">
              <span>
                You have <strong>20 patients </strong>remaining!
              </span>
              <span>
                Don't forget to check the documentation before the call.
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-4 w-[60%] bg-blue-50 p-4 rounded-3xl">
              <h1 className="font-semibold text-xl">Today's Appointments</h1>
              <div className="flex flex-col gap-2">
                {appointments.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center justify-between border-b border-blue-100"
                  >
                    <div className="flex flex-col">
                      <h1>{item.name}</h1>
                      <span
                        className={`${
                          item.type === "FIRST VISIT" && "text-blue-400"
                        } ${item.type === "EMERGENCY" && "text-red-400"} ${
                          item.type === "CONSULTANCY" && "text-green-300"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <div>{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-[40%] max-h-[300px] shadow-custom rounded-3xl p-4">
              <h1 className="text-2xl text-blue-400 font-medium">Reminders</h1>
              <div className="border border-gray-300 p-2 h-full rounded-2xl">
                <textarea
                  aria-expanded
                  placeholder="Nothing to show :)"
                  className="outline-none resize-none text-lg h-full flex text-start justify-start w-full"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] gap-4 py-10 bg-blue-50 rounded-l-3xl h-[600px] rounded-br-3xl flex flex-col px-8">
          <div className="flex items-center justify-center ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmcKwKPohdSJKvyQ0Sv1S8i93hbJbuIkOJQ&s"
              alt="Dr. Mary John"
              className="rounded-full w-28 h-28"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <h1 className="font-semibold text-2xl">Dr. Mary John</h1>
            <span>Cardiologist</span>
          </div>
          <div className="flex mt-10 flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <MdOutlineMail />
              <span>maryjohn.doc@gmail.com</span>
            </div>
            <div className="flex flex-row items-center gap-1">
              <FaPhone />
              <span>(+49) 163 555 1584</span>
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-gray-600">Overall Rating</h2>
              <h1 className="font-medium">4.4</h1>
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-gray-600">Total patients</h2>
              <h1 className="font-medium">198</h1>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DoctorDashboard;
