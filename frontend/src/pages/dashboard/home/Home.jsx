import { FaUserInjured } from "react-icons/fa";
import {
  useCountPatientsQuery,
  useCountTodayPatientsQuery,
} from "../../../feature/newPatientApi";

const Home = () => {
  const { data } = useCountPatientsQuery();
  const { data: today } = useCountTodayPatientsQuery();
  return (
    <>
      <div className=" rounded-lg px-4 bg-[#9333EA] text-white w-full h-[150px] flex justify-between items-center">
        <div>
          <p className="mb-4">{new Date().toDateString()}</p>
          <h1 className="text-2xl py-1 mb-2 font-semibold">Welcome , Admin</h1>
          <p className="text-xs">Manage your Patients and System</p>
        </div>
        <h1 className="font-semibold hidden  py-1 lg:flex text-sm lg:text-3xl">
          Patient Management System (PMS)
        </h1>
        <div></div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="mt-8">
          <div className="text-center flex gap-4 justify-around items-center  border  bg-white w-full lg:w-[400px] h-[100px] lg:h-[150px]">
            <div className="flex flex-col gap-4 items-center">
              <FaUserInjured size={25} color="#9333EA" />
              <p className="text-sm lg:text-base font-medium">Total Patients</p>
            </div>
            <p className="text-3xl py-3 lg:text-5xl font-semibold text-[#9333ea]">
              {data?.count}
            </p>
          </div>
        </div>
        <div className="mt-4 lg:mt-8">
          <div className="text-center flex gap-4 justify-around items-center  border  bg-white w-full lg:w-[400px] h-[100px] lg:h-[150px]">
            <div className="flex flex-col gap-4 items-center">
              <FaUserInjured size={25} color="#9333EA" />
              <p className="text-sm lg:text-base font-medium">Today Register Patients</p>
            </div>
            <p className="text-3xl py-3 lg:text-5xl font-semibold text-[#9333ea]">
              {today?.count}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
