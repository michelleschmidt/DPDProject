import React from "react";

const Privacy: React.FC = () => {
  return (
    <div className="px-20 pb-10 w-full">
      <div className="h-[420px] w-full rounded-3xl bg-blue-50 flex flex-row items-center p-8">
        <div className="w-1/2 flex h-full px-8 items-center justify-center">
          <div className="h-[380px] flex items-center">
            <img
              src="https://www.doctolib.de/webpack/469fe10e5cf245abe3e6.webp"
              alt=""
              className="h-[340px]"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center gap-6">
          <h1 className="font-semibold text-2xl text-blue-900">
            Your health. Your data.
          </h1>
          <span className="">
            Protecting your privacy is our top priority and one of our most
            important tasks.
          </span>
          <div className="px-5 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer transition duration-200">
            MORE INFORMATION
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
