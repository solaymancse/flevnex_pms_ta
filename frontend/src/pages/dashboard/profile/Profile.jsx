import { IoMdMail } from "react-icons/io";

const Profile = () => {
  return (
    <div>
      <div className=" relative ">
        <div className="w-full h-[300px] rounded-md">
          <img
            className="w-full h-full object-cover rounded-md"
            src="https://images.unsplash.com/photo-1717710913922-1c28c217465a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="w-full flex justify-center">
          <div className="  absolute bottom-[-20px] border shadow-md rounded-md   w-[180px] h-[150px]">
            <img
              className="w-full h-full object-cover"
              src="https://res.cloudinary.com/dba7qvc2l/image/upload/v1718382829/WhatsApp_Image_2024-05-03_at_8.07.17_PM_hj5bny.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <h1 className="text-2xl font-semibold">Muhammad Solayman</h1>
        <p className="text-sm text-gray-500">Admin</p>
        <div className="flex mt-4 gap-4 justify-center items-center">
          <IoMdMail />
          <p>test@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
