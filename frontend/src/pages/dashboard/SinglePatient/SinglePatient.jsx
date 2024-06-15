import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { HiIdentification } from "react-icons/hi";

const SinglePatient = () => {
  const location = useLocation();
  const { record } = location.state;

  return (
    <div>
      <div className=" relative ">
        <div className="w-full h-[300px] rounded-md">
          <img
            className="w-full h-full object-cover rounded-md"
            src="https://media.istockphoto.com/id/1552175630/photo/interior-design-of-a-modern-luxurious-white-building-corridor-or-hallway-with-waiting-seat.jpg?s=2048x2048&w=is&k=20&c=1ulPIWgda3Jp3DtpCoOfPdjfjrlC9vKWnvD8Nr9mmX4="
            alt=""
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="  absolute bottom-[-20px] border shadow-md rounded-md   w-[180px] h-[150px]">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-2xl mb-2 font-semibold">{record.name}</h1>
        <div className="flex mt-6  justify-center  w-full ">
          <div className="flex items-center   gap-4 w-[200px]">
            <HiIdentification  />
            <p className="text-sm text-gray-500 ">{record?.patient_id}</p>
          </div>
        </div>
        <div className="flex mt-6  justify-center  w-full ">
          <div className="flex items-center   gap-4 w-[200px]">
            <IoMdCall />
            <p className="text-sm text-gray-500 ">{record?.number}</p>
          </div>
        </div>
        <div className="flex mt-6 justify-center  w-full ">
          <div className="flex items-center   gap-4 w-[200px]">
            <IoMdCall />
            <p className="text-sm text-gray-500 ">{record?.emergency}</p>
          </div>
        </div>

        <div className="flex mt-6 text-gray-500 gap-4 justify-center items-center">
          <FaMapMarkerAlt  />
          <p>{record?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePatient;
