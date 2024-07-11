import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import axiosInstance from "../../axios/Axios";

interface FormData {
  reason: string;
  appointmentType: string;
  specialization: string;
  description: string;
  consultationMethod: string;
  preferredLanguage: boolean;
}

interface ModalFormProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (data: FormData) => void;
}

interface Language {
  id: number;
  language_name: string;
}

interface Specialization {
  id: number;
  area_of_specialization: string;
}

const getAppointmentOptions = (reason: string | null): string[] => {
  switch (reason) {
    case "Regular consultation":
      return [
        "Routine Check-up",
        "Diagnostic appointment",
        "Follow Up appointment",
        "Non-urgent medical issue",
        "Other",
      ];
    case "Acute Consultation":
      return [
        "Sudden worsening of chronic condition",
        "Acute infection",
        "Acute pain",
      ];
    case "Preventive Health Check-Ups":
      return [
        "Annual Health Check-Up",
        "Cancer Screening",
        "Well-Child Visit",
        "Vaccination appointment",
        "Other",
      ];
    default:
      return [];
  }
};

const ModalForm: React.FC<ModalFormProps> = ({
  show,
  handleClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const selectedReason = watch("reason");
  const [appointmentOptions, setAppointmentOptions] = useState<string[]>([]);
  const [languages, setLanguages] = useState<
    { value: number; label: string }[]
  >([]);
  const [specializations, setSpecializations] = useState<
    { value: number; label: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [languagesResponse, specializationsResponse] = await Promise.all([
          axiosInstance.get("/api/search/languages"),
          axiosInstance.get("/api/search/specializations"),
        ]);
        setLanguages(
          languagesResponse.data.map((lang: Language) => ({
            value: lang.id,
            label: lang.language_name,
          }))
        );
        setSpecializations(
          specializationsResponse.data.map((spec: Specialization) => ({
            value: spec.id,
            label: spec.area_of_specialization,
          }))
        );
      } catch (error) {
        console.error("Error fetching options:", error);
        setError("Failed to fetch options. Please try again.");
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    if (selectedReason) {
      const options = getAppointmentOptions(selectedReason);
      setAppointmentOptions(options);
    }
  }, [selectedReason]);

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Book an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for visit
            </label>
            <select
              {...register("reason", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select reason</option>
              <option value="Regular consultation">Regular consultation</option>
              <option value="Acute Consultation">Acute Consultation</option>
              <option value="Preventive Health Check-Ups">
                Preventive Health Check-Ups
              </option>
            </select>
            {errors.reason && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          {appointmentOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Appointment Type
              </label>
              <select
                {...register("appointmentType", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select appointment type</option>
                {appointmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.appointmentType && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specialist needed
            </label>
            <select
              {...register("specialization", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select specialist</option>
              {specializations.map((spec) => (
                <option key={spec.value} value={spec.label}>
                  {spec.label}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred method of consultation
            </label>
            <select
              {...register("consultationMethod", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select consultation method</option>
              <option value="In person">In person</option>
              <option value="Telemedicine">Telemedicine</option>
            </select>
            {errors.consultationMethod && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("preferredLanguage")}
                className="mr-2"
              />
              Only Show Doctors with Preferred Language
            </label>
          </div>

          <Button variant="primary" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
