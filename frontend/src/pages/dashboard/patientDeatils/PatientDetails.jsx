import { Button, Modal, Select, Space, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import NewPatient from "./NewPatient";
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { debounce } from "lodash";
import { useDeletePatientMutation } from "../../../feature/newPatientApi";
import { MdOutlineCalendarViewDay } from "react-icons/md";
import { Link } from "react-router-dom";

const { Option } = Select;

const PatientDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientData, setPatientData] = useState([]);
  const [patient, setPatient] = useState("");
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [, setIsLoading] = useState(false);
  const [, setIsError] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [deletePatient, { isSuccess: deleteSuccess }] =
    useDeletePatientMutation();

  const deleteMessageShown = useRef(false);

  const fetchData = async (page = 1, searchTerm = "", gender = "") => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/admin/get/patient?search=${searchTerm}&gender=${gender}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      const result = await response.json();
      if (result.status === 200) {
        setPatientData(result?.data?.data);
        setPagination({
          ...pagination,
          current: result.data.current_page,
          total: result.data.total,
        });

        setIsError(false);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, search, genderFilter);
  }, [search, genderFilter, pagination.current]);

  useEffect(() => {
    if (deleteSuccess && !deleteMessageShown.current) {
      message.success("Patient deleted successfully");
      fetchData(pagination.current, search, genderFilter);
      deleteMessageShown.current = true;
    }
  }, [deleteSuccess, pagination.current, search, genderFilter]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    fetchData(pagination.current, search, genderFilter);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record) => {
    console.log("Edit:", record);
    setPatient(record);
    showModal();
  };

  const handleDelete = (record) => {
    console.log("Delete:", record);
    // Handle delete logic here, such as confirming deletion
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this patient?",
      onOk() {
        deletePatient(record.id).then(() => {
          // Reset the delete message flag after showing the message
          deleteMessageShown.current = false;
        });
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  };

  const handleSearchChange = (e) => {
    debounceSearch(e.target.value);
  };

  const debounceSearch = debounce((value) => {
    setSearch(value);
  }, 500);

  const handleGenderChange = (value) => {
    setGenderFilter(value);
  };

  const columns = [
    {
      title: "Patient ID",
      dataIndex: "patient_id",
      key: "patient_id",
    },
    {
      title: "Patient Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Emergency Number",
      dataIndex: "emergency",
      key: "emergency",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to="/dashboard/patient/profile"
            state={{ record }}
            className="flex justify-center items-center  w-[20px] h-[20px]"
          >
            <MdOutlineCalendarViewDay color="#9333EA" />
          </Link>
          <Button
            className="bg-green-200"
            onClick={() => handleEdit(record)}
            icon={<CiEdit color="green" />}
          />
          <Button
            className="bg-red-200"
            onClick={() => handleDelete(record)}
            icon={<IoMdTrash color="red" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white px-2  lg:px-8 shadow-md h-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-4 items-center py-4 ">
        <p className="text-sm hidden lg:flex font-semibold">Patient Details</p>
        <input
          type="text"
          className="w-full mb-4 lg:mb-0  h-[45px] lg:h-[40px] outline-none px-3 rounded-sm border border-slate-300"
          placeholder="Search By Name ,Phone Number"
          onChange={handleSearchChange}
        />
        <Select
          placeholder="Select Gender"
          className="w-full  h-[40px]"
          onChange={handleGenderChange}
          allowClear
        >
          <Option value="">All</Option>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
        <button
          onClick={showModal}
          className="bg-[#9333EA] text-white w-full mt-4 lg:mt-0 px-4 py-2 rounded"
        >
          Add Patient
        </button>
        <NewPatient
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          patient={patient}
          setPatient={setPatient}
          fetchData={fetchData}
        />
      </div>
      <div className="mt-6">
        <Table
          columns={columns}
          dataSource={patientData}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1000 }} 
       
          
        />
      </div>
    </div>
  );
};

export default PatientDetails;
