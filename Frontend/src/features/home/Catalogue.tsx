import React from "react";
import { Arrow, Doctor2 } from "../../utils/assets";

const Catalogue: React.FC = () => {
  return (
    <div className="px-20 py-12">
      <div className="rounded-2xl bg-[#00264c] p-20 flex flex-row gap-20">
        <div>
          <img src={Doctor2} className="h-[360px]" alt="Doctor" />
        </div>
        <div className="flex flex-col justify-center gap-8 text-white">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">
              Are you a doctor or therapist?
            </h1>
            <h1 className="font-medium inter">
              Simple appointment management for a successful practice.
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-2 items-center">
              <img src={Arrow} className="w-12" alt="Arrow" />
              <span>
                Relieve your practice team and offer your patients a modern,
                digital service
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src={Arrow} className="w-12" alt="Arrow" />
              <span>
                Increase the visibility of your facility on the Internet and
                increase your practice's sales
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src={Arrow} className="w-12" alt="Arrow" />
              <span>
                Vaccination management: Direct relief through digital Covid
                vaccination management. Set up in just 2 hours
              </span>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <img src={Arrow} className="w-12" alt="Arrow" />
              <span>
                Create efficient practice processes and reduce missed
                appointments thanks to the digital practice calendar
              </span>
            </div>
          </div>
          <div className="w-36 py-1.5 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200">
            LEARN MORE
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
