import { Input, Modal, Select, message } from "antd";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import {
  useCreatePatientMutation,
  useEditPatientMutation,
} from "../../../feature/newPatientApi";
import { useEffect, useState } from "react";
import { useGetErrorMessages } from "../../../ErrorHandle/useGetErrorMessages";
import UseShowErrorMessages from "../../../ErrorHandle/UseShowErrorMessages";
import { obj } from "prop-types";
const NewPatient = ({
  isModalOpen,
  handleOk,
  handleCancel,
  patient,
  fetchData,
}) => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const [createSuccessMessageShown, setCreateSuccessMessageShown] =
    useState(false);
  const [editSuccessMessageShown, setEditSuccessMessageShown] = useState(false);

  const [createPatient, { isLoading, isError, error, isSuccess }] =
    useCreatePatientMutation();

  const [
    editPatient,
    {
      isLoading: updateLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useEditPatientMutation();

  useEffect(() => {
    if (patient) {
      setValue("name", patient.name);
      setValue("age", patient.age);
      setValue("gender", patient.gender);
      setValue("address", patient.address);
      setValue("number", patient.number);
      setValue("emergency", patient.emergency);
    } else {
      reset();
    }
  }, [patient, setValue, reset]);
  const onSubmit = (data) => {
    if (patient?.id) {
      editPatient({ id: patient.id, data });
    } else {
      createPatient(data);
    }
  };

  useEffect(() => {
    if (isSuccess && !createSuccessMessageShown) {
      setCreateSuccessMessageShown(true);
      reset();
      handleOk();
      message.success("Patient created successfully");
      fetchData();
    }

    if (updateSuccess && !editSuccessMessageShown) {
      setEditSuccessMessageShown(true);
      reset();
      handleOk();
      message.success("Patient updated successfully");
      fetchData();
    }
  }, [
    isSuccess,
    updateSuccess,
    reset,
    handleOk,
    fetchData,
    createSuccessMessageShown,
    editSuccessMessageShown,
  ]);
  const handleModalCancel = () => {
    reset();
    handleCancel();
  };

  const errorMessages = useGetErrorMessages(error ? error : updateError);
  return (
    <Modal
      title={patient ? "Edit Patient" : "New Patient"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleModalCancel}
      footer={null}
    >
      {(isError || updateIsError) &&
        (!isLoading || !updateLoading) &&
        (!isSuccess || !updateSuccess) && (
          <UseShowErrorMessages errorMessages={errorMessages} />
        )}
      <form
        className="flex gap-2 flex-col my-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="Full Name"
              type="text"
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="Age" type="text" />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              size="large"
              placeholder="Select Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="Address" type="text" />
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="Phone Number"
              type="number"
            />
          )}
        />
        <Controller
          name="emergency"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              size="large"
              placeholder="Emergency Number"
              type="number"
            />
          )}
        />
        <button
          className="bg-[#9333EA] mt-4 text-white px-4 py-3 rounded"
          type="submit"
        >
          {updateLoading || isLoading ? "Processing..." : " Submit"}
        </button>
      </form>
    </Modal>
  );
};

NewPatient.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  patient: obj,
  fetchData: PropTypes.func.isRequired,
};

export default NewPatient;
