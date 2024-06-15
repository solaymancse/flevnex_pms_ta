import { IoMdHome } from "react-icons/io";
import { bool } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { FaUserInjured } from "react-icons/fa";
import { CgUser } from "react-icons/cg";
import { useMediaQuery } from "react-responsive";

const Sidebar = ({ hide }) => {
  const location = useLocation();
console.log('hide',hide)
  //   const isDesktopOrLaptop = useMediaQuery({
  //     query: "(min-width: 1224px)",
  //   });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 550px)" });
  const isTabScreen = useMediaQuery({ query: "(max-width: 1023px)" });

  return (
    <div
      className={`sidebar sticky text-white bg-purple-600   ${
        hide ? isSmallScreen ? "w-[20%]" : "w-[5%]" : isSmallScreen ? "w-[0px]" :"w-[15%]"
      } z-10  h-screen transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center flex-col">
        <div className="py-6 px-8">
          <h1 className="text-sm  py-1 lg:text-2xl font-bold">PMS</h1>
        </div>
        <div className="flex flex-col items-center w-full">
          <div
            className={`w-full ${
              location.pathname === "/dashboard" ? "bg-white text-black" : ""
            }`}
          >
            <Link
              to="/dashboard"
              className="flex gap-4 py-3 items-center justify-center lg:justify-normal lg:px-6  w-full"
            >
              <IoMdHome size={20} />
              {!hide && <h1 className={`${(isSmallScreen || isTabScreen)? "hidden" : ""}`}>Dashboard</h1>}
            </Link>
          </div>
          <div
            className={` w-full ${
              location.pathname === "/dashboard/profile"
                ? "bg-white text-black"
                : ""
            }`}
          >
            <Link
              to="/dashboard/profile"
              className="flex gap-4 py-3 items-center justify-center lg:justify-normal lg:px-6 w-full"
            >
              <CgUser size={20} />
              {!hide && <h1 className={`${(isSmallScreen || isTabScreen) ? "hidden" : ""}`}>Profile</h1>}
            </Link>
          </div>
          <div
            className={`w-full ${
              location.pathname === "/dashboard/patient"
                ? "bg-white text-black"
                : ""
            }`}
          >
            <Link
              to="/dashboard/patient"
              className="flex gap-4 py-3 items-center lg:justify-normal justify-center lg:px-6 w-full"
            >
              <FaUserInjured size={20} />
              {!hide && <h1 className={`${(isSmallScreen || isTabScreen) ? "hidden" : ""}`}>Patient</h1>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  hide: bool,
};

export default Sidebar;
