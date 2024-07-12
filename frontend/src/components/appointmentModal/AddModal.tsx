import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Appointment,
  Patient,
  Doctor,
  Availability,
  AppointmentReason,
} from "../Types";
import axiosInstance from "../../axios/Axios";
import { API_ENDPOINTS } from "../../axios/ConstantsAxios";

interface AddAppointmentModalProps {
  isOpen: boolean;
  onSubmit: (appointment: Omit<Appointment, "id">) => void;
  onClose: () => void;
  preselectedDoctor?: Doctor;
  preselectedPatientId?: number;
  sendby: "Admin" | "Patient";
}

const appointmentReasons: { [key: string]: string[] } = {
  "Regular consultation": [
    "Routine Check-up",
    "Diagnostic appointment",
    "Follow Up appointment",
    "Non-urgent medical issue",
    "Other",
  ],
  "Acute Consultation": [
    "Sudden worsening of chronic condition",
    "Acute infection",
    "Acute pain",
  ],
  "Preventive Health Check-Ups": [
    "Annual Health Check-Up",
    "Cancer Screening",
    "Well-Child Visit",
    "Vaccination appointment",
    "Other",
  ],
};

interface FormData {
  patientId: number;
  doctorId: number;
  date: Date | null;
  time: string;
  appointmentReasonCategory: string;
  appointmentReasonSubcategory: string;
  bookTranslation: boolean;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  sendby,
  onSubmit,
  preselectedPatientId,
  preselectedDoctor,
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      patientId: preselectedPatientId || 0,
      doctorId: preselectedDoctor?.id || 0,
      date: null,
      time: "",
      appointmentReasonCategory: "",
      appointmentReasonSubcategory: "",
      bookTranslation: false,
    },
  });

  const selectedDoctorId = watch("doctorId");
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  const fetchPatients = useCallback(async () => {
    if (sendby !== "Admin") return;
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_PATIENTS);
      const mappedPatients: Patient[] = response.data.map((patient: any) => ({
        userId: patient.id,
        first_name: patient.first_name,
        last_name: patient.last_name,
        address: patient.address,
        languages: patient.languages,
        location: patient.location,
        insurance: patient.insurance_type,
      }));
      setPatients(mappedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to fetch patients. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [sendby]);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_ENDPOINTS.GET_DOCTORS);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
      fetchDoctors();
    }
  }, [isOpen, fetchPatients, fetchDoctors]);

  const fetchDoctorAvailability = useCallback(async (doctorId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        `/api/availabilities/doctor/${doctorId}`
      );
      if (response.data && Array.isArray(response.data)) {
        setAvailabilities(response.data);
      } else {
        throw new Error("Unexpected response format for availabilities");
      }
    } catch (error: any) {
      console.error("Error fetching availabilities:", error);
      setError(`Failed to fetch availabilities. ${error.message}`);
      setAvailabilities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      fetchDoctorAvailability(Number(selectedDoctorId));
    }
  }, [selectedDoctorId, fetchDoctorAvailability]);

  const getAvailableDates = () => {
    const dates = [
      ...new Set(availabilities.map((a) => a.availability_date.split("T")[0])),
    ];
    return dates.map((date) => new Date(date));
  };

  const getAvailableTimeSlots = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return availabilities
      .filter((a) => a.availability_date.startsWith(dateString) && a.active)
      .map((a) => a.availability_date.split("T")[1].substring(0, 5));
  };

  const onSubmitForm = async (data: FormData) => {
    try {
      setLoading(true);
      setError(null);

      const selectedAvailability = availabilities.find(
        (a) =>
          a.availability_date.startsWith(
            data.date!.toISOString().split("T")[0]
          ) && a.availability_date.includes(data.time)
      );

      if (!selectedAvailability || !selectedAvailability.id) {
        throw new Error("Selected availability not found or invalid");
      }

      const newAppointment = {
        user_id: sendby === "Patient" ? preselectedPatientId : data.patientId,
        doctor_id: data.doctorId,
        availability_id: selectedAvailability.id,
        appointment_reason: {
          reason: data.appointmentReasonCategory,
          notes: data.appointmentReasonSubcategory,
        },
        book_translation: data.bookTranslation,
      };

      console.log("New appointment data:", newAppointment);

      let response;
      if (sendby === "Admin") {
        response = await axiosInstance.post(
          "/api/appointments/create-new",
          newAppointment
        );
      } else if (sendby === "Patient") {
        response = await axiosInstance.post(
          "/api/appointments/new",
          newAppointment
        );
      }

      if (response && response.data) {
        onSubmit(response.data);
        onClose();
      }
    } catch (error: any) {
      console.error("Error adding appointment:", error);
      setError(
        `Failed to add appointment. ${
          error.response?.data?.error || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Appointment</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {sendby === "Admin" && (
            <div className="mb-4">
              <label className="block mb-2">Patient:</label>
              <Controller
                name="patientId"
                control={control}
                rules={{ required: "Patient is required" }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-2 border rounded"
                    onChange={(e) => {
                      const selectedPatientId = Number(e.target.value);
                      field.onChange(selectedPatientId);
                    }}
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.userId} value={patient.userId}>
                        {patient.first_name} {patient.last_name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Doctor:</label>
            <Controller
              name="doctorId"
              control={control}
              rules={{ required: "Doctor is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const selectedDoctorId = Number(e.target.value);
                    field.onChange(selectedDoctorId);
                  }}
                >
                  <option value="">Select a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.title} {doctor.first_name} {doctor.last_name} -{" "}
                      {doctor.specialization?.area_of_specialization}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {selectedDoctorId && availabilities.length > 0 && (
            <>
              <div className="mb-4">
                <label className="block mb-2">Select Date:</label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      includeDates={getAvailableDates()}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select an available date"
                      className="w-full p-2 border rounded"
                    />
                  )}
                />
              </div>

              {selectedDate && (
                <div className="mb-4">
                  <label className="block mb-2">Select Time:</label>
                  <Controller
                    name="time"
                    control={control}
                    rules={{ required: "Time is required" }}
                    render={({ field }) => (
                      <div>
                        {getAvailableTimeSlots(selectedDate).map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => field.onChange(time)}
                            className={`m-1 p-2 rounded ${
                              field.value === time
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>
              )}
            </>
          )}

          <div className="mb-4">
            <label className="block mb-2">Appointment Reason:</label>
            <Controller
              name="appointmentReasonCategory"
              control={control}
              rules={{ required: "Appointment reason category is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("appointmentReasonSubcategory", "");
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select a reason category</option>
                  {Object.keys(appointmentReasons).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <Controller
            name="appointmentReasonCategory"
            control={control}
            render={({ field }) => (
              <>
                {field.value && (
                  <div className="mb-4">
                    <label className="block mb-2">Specific Reason:</label>
                    <Controller
                      name="appointmentReasonSubcategory"
                      control={control}
                      rules={{ required: "Specific reason is required" }}
                      render={({ field: subField }) => (
                        <select
                          {...subField}
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select a specific reason</option>
                          {appointmentReasons[field.value].map(
                            (subcategory: string) => (
                              <option key={subcategory} value={subcategory}>
                                {subcategory}
                              </option>
                            )
                          )}
                        </select>
                      )}
                    />
                  </div>
                )}
              </>
            )}
          />

          <div className="mb-4">
            <label className="flex items-center">
              <Controller
                name="bookTranslation"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  />
                )}
              />
              Book Translation
            </label>
            <p className="text-sm text-gray-600 mt-1">
              Check this if translation services for this appointment are
              needed.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;
