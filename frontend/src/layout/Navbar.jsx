import { CgMenuRight } from "react-icons/cg";
import { func, bool } from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useAdminLogoutMutation } from "../feature/newPatientApi";
import { message } from "antd";

const Navbar = ({ handleBar, handleDropDown, dropdown }) => {
  const [data] = useAdminLogoutMutation();

  const handleLogout = () => {
    data({});
    localStorage.removeItem("admin_token");
    message.success("Logout successfully");
    Navigate("/");
  };
  return (
    <div
      className={`bg-[#fff] w-full sticky py-2  lg:py-0 z-10 top-0 px-6 flex items-center justify-between shadow-sm h-[80px] `}
    >
      <div onClick={handleBar} className="cursor-pointer">
        <CgMenuRight />
      </div>
      <div className="flex items-center gap-4  pr-8">
        <p className="text-sm hidden lg:flex font-semibold">Muhammad Solayman</p>
        <div className="relative ">
          <div
            onClick={handleDropDown}
            className="w-[40px] h-[40px] cursor-pointer overflow-hidden rounded-full"
          >
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dba7qvc2l/image/upload/v1718382829/WhatsApp_Image_2024-05-03_at_8.07.17_PM_hj5bny.jpg"
              alt=""
            />
          </div>

          <div
            className={`bg-white  w-[200px]  shadow-md  ${
              dropdown ? "block h-[120px]" : "hidden"
            } absolute top-12 right-0 transition-all duration-300 ease-in-out`}
          >
            <Link
              className="flex gap-4 py-3 mt-4 px-6 transition-all duration-300 ease-in-out hover:bg-slate-200 text-[#777] items-center"
              onClick={handleDropDown}
              to="/dashboard/profile"
            >
              <FaUserTie color="#777" />
              Profile
            </Link>
            <Link
              onClick={handleLogout}
              className="flex gap-4 py-3  px-6 transition-all duration-300 ease-in-out hover:bg-slate-200 text-[#777] items-center"
              to="#"
            >
              <IoMdLogOut color="#777" />
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  handleBar: func,
  handleDropDown: func,
  dropdown: bool,
};

export default Navbar;
