import { useState } from "react";
import { CgMenuRight } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import PatientDetails from "./patientDeatils/PatientDetails";
import Navbar from "../../layout/Navbar";
import Sidebar from "../../layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
  const [hide, setHide] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 550px)" });
  const handleBar = () => {
    setHide(!hide);
    console.log("clicked", hide);
  };
  const handleDropDown = () => {
    setDropDown(!dropdown);
  };

  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar hide={hide} />
      <div
        className={`flex flex-col ${
          hide ? isSmallScreen ? "w-[85%]" : "w-[100%]" : isSmallScreen ? "w-[100%]" : "w-[85%]"
        } h-screen overflow-x-hidden transition-all duration-500 ease-in-out`}
      >
        <Navbar
          handleBar={handleBar}
          handleDropDown={handleDropDown}
          dropdown={dropdown}
        />
        <div className=" flex-grow overflow-y-auto   p-2 lg:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
