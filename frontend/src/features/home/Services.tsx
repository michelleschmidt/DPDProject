import React from "react";
import { AnnouncementIcon, Cart, HeartIcon } from "../../utils/assets";
import { TbHelp } from "react-icons/tb";

const Services: React.FC = () => {
  return (
    <div className="h-screen p-20 flex flex-col gap-11">
      <h1 className="font-semibold text-2xl text-center">
        We are at the service of your health.
      </h1>
      <div className="flex flex-col gap-10 w-full items-center">
        <div className="flex flex-row items-center justify-center gap-20">
          <div className="items-center max-w-[340px] justify-center flex flex-col gap-5">
            <img src={Cart} alt="" />
            <div className="text-center">
              <span>Get</span>{" "}
              <span className="font-semibold">easy and quick access to </span>
              <span className="text-blue-600">
                many doctors and therapists.
              </span>
            </div>
          </div>
          <div className="items-center max-w-[340px] justify-center flex flex-col gap-5">
            <img src={HeartIcon} alt="" />
            <div className="text-center">
              <span>Manage your</span>{" "}
              <span className="font-semibold">appointments</span>
              <span> and opt in for the <span className="font-semibold">translation service </span>to get <span className="font-semibold">real time translation during your appointment.</span></span>
            </div>
          </div>
        </div>
        <div className="items-center max-w-[240px] justify-center flex flex-col gap-4">
          <img src={AnnouncementIcon} alt="" />
          <div className="text-center">
            Learn about <span className="font-bold">health precautions</span> to
            protect yourself and stay healthy.
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mt-8 gap-4">
        <h1 className="text-3xl font-bold text-blue-900">
          Health Connect in the future
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">millions of</h2>
          <div className="flex flex-row items-center">
            <span className="">Patients</span>
            <TbHelp />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">thousands of</h2>
          <div className="flex flex-row items-center">
            <span className="">Healthcare Providers</span>
            <TbHelp />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold text-2xl text-blue-500">with about 97%</h2>
          <div className="flex flex-row items-center">
            <span className="">satisfaction</span>
            <TbHelp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
