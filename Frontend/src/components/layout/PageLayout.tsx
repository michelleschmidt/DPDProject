import React, { ReactNode } from "react";
import SideBar from "./SideBar";
import AdminHeader from "./adminHeader";

interface PageLayoutProps {
  children: ReactNode;
  text: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, text }) => {
  return (
    <div>
      <div className="fixed">
        <SideBar />
      </div>
      <div className="flex w-full flex-col">
        <div className="fixed z-10 pl-[262px] w-full">
          <AdminHeader text={text} />
        </div>
        <div className="ml-[262px] mt-[65px]">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
