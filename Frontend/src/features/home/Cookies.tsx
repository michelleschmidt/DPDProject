import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const CookiesModal: React.FC = () => {
  return (
    <div className="fixed z-50 h-screen top-0 left-0 right-0 bottom-0 md:px-7 md:px-0 flex items-center justify-center bg-transparent">
      <div
        // onClick={closeModal}
        className="w-full z-50 fixed hover:cursor-pointer h-screen top-0 left-0 right-0 bottom-0 md:px-7 md:px-0 flex items-center justify-center md:bg-[#758093] md:opacity-[0.5]"
      ></div>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{
            duration: 0.6,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="bg-bg3 z-50 flex flex-col w-[520px] h-4/5 bg-white rounded-[24px] p-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-medium uppercase">
                Information about the use of cookies on our website
              </p>
              <img
                src="https://media.doctolib.com/image/upload/v1697788561/value-prop-2_loubhe.svg"
                alt=""
              />
            </div>
            <p className="text-gray-700">
              We use cookies to ensure the proper functioning of our website
              necessary cookies. The legal basis for this is Art. 6 Abs. 1 S. 1
              lit. f DSGVO legitimate interests in conjunction with § 25 Abs. 2
              TTDSG. Necessary cookies cannot be rejected. Additionally, we use
              cookies or similar technologies to measure user behavior analytics
              and adapt the content displayed on Doctolib, provided you have
              given your consent Art. 6 Abs. S.1 lit. a DSGVO in conjunction
              with § 25 Abs. 1 TTDSG. You give your consent by clicking the
              "Allow" button. If you click the "Reject" button, only necessary
              cookies will be used. You can revoke your consents and set
              individual preferences by clicking on "Cookie Settings". The
              cookie settings can be accessed via the link "Cookie Policy and
              Consent" displayed at the bottom of every page on our website.
            </p>
            <div className="flex flex-row gap-4 items-center justify-center">
              <div className="px-5 py-2 bg-blue-500 hover:cursor-pointer duration-300 transition ease-in-out hover:bg-blue-600 uppercase rounded-lg text-white font-medium">
                Accept
              </div>
              <div className="px-5 py-2 bg-red-500 hover:cursor-pointer duration-300 transition ease-in-out hover:bg-red-600 uppercase rounded-lg text-white font-medium">
                Reject
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CookiesModal;
