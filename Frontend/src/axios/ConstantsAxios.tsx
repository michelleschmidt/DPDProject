import axiosInstance from "./Axios";
import { Appointment, Doctor, Patient } from "../components/Types";

// Helper function to set loading and error states
const setLoading = (loading: boolean) => {
  // Implement the loading state handling logic
};

const setError = (error: string | null) => {
  // Implement the error state handling logic
};

const logout = () => {
  // Implement the logout logic
};

// Fetch appointments
export const fetchAppointmentsForDoctor = async (
  doctorId: number,
  setAppointments: Function,
  setError: Function
) => {
  if (!doctorId) return;
  try {
    const response = await axiosInstance.get(
      `/api/appointments/doctor/${doctorId}`
    );
    console.log("Raw appointment data:", response.data);
    if (response.data && Array.isArray(response.data)) {
      const mappedAppointments = response.data.map((appointment: any) => ({
        ...appointment,
        patient: {
          ...appointment.patient,
          userId: appointment.patient_id,
        },
        doctor: {
          ...appointment.doctor,
          userId: appointment.doctor_id,
        },
        availability: {
          ...appointment.availability,
          availability_date: appointment.availability?.availability_date
            ? new Date(
                appointment.availability.availability_date
              ).toLocaleString()
            : "No date provided",
        },
        appointment_reason: {
          reason:
            appointment.appointment_reason?.reason || "No Reason Provided",
          notes: appointment.appointment_reason?.notes || "",
        },
        book_translation: appointment.bookTranslation,
        status: appointment.status || "Unknown",
      }));
      setAppointments(mappedAppointments);
      console.log("Fetched and formatted appointments:", mappedAppointments);
    } else {
      console.error(
        "Unexpected response format for appointments:",
        response.data
      );
      setError("Unexpected response format for appointments");
    }
  } catch (error) {
    console.error("Error fetching appointments for doctor:", error);
    setError("Failed to fetch appointments. Please try again.");
  }
};

// Fetch user-specific appointments
export const fetchUserAppointments = async (setAppointments: Function) => {
  try {
    const response = await axiosInstance.get(
      "/api/appointments/user-appointments"
    );
    if (response.data && Array.isArray(response.data)) {
      const mappedAppointments = response.data.map((appointment: any) => ({
        ...appointment,
        doctor: {
          ...appointment.doctor,
          userId: appointment.doctor_id,
        },
        book_translation: appointment.bookTranslation,
      }));
      setAppointments(mappedAppointments);
      console.log("Appointments: ", mappedAppointments);
    } else {
      console.error(
        "Unexpected response format for appointments:",
        response.data
      );
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

// Fetch doctors
export const fetchDoctors = async (setDoctors: Function) => {
  try {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.get("/api/users");
    setDoctors(response.data);
  } catch (error: any) {
    console.error("Error fetching doctors:", error);
    setError("Failed to fetch doctors. Please try again.");
    if (error.response && error.response.status === 401) {
      logout();
    }
  } finally {
    setLoading(false);
  }
};

// Fetch user-specific doctors
export const fetchUserDoctors = async (setDoctors: Function, userData: any) => {
  try {
    console.log("ID: ", userData?.userId);
    const response = await axiosInstance.get("/api/appointments/user-doctors");
    if (response.data && Array.isArray(response.data)) {
      const mappedDoctors: Doctor[] = response.data.map((doctor: any) => ({
        userId: doctor.id,
        specialization: {
          id: doctor.specialization_id || 0,
          area_of_specialization: doctor.area_of_specialization,
        },
        first_name: doctor.doctor_name.split(" ")[1],
        last_name: doctor.doctor_name.split(" ")[2],
        title: doctor.doctor_name.split(" ")[0],
        email: doctor.email || "",
        phone_number: doctor.phone_number || "",
        address: {
          street: doctor.street || "",
          postcode: doctor.postcode || "",
          city: doctor.city || "",
          state: doctor.state || "",
          country: "",
        },
        languages: doctor.languages || [],
      }));
      setDoctors(mappedDoctors);
      console.log(mappedDoctors);
    } else {
      console.error("Unexpected response format for doctors:", response.data);
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
};

// Fetch patients
export const fetchPatients = async (setPatients: Function) => {
  try {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.get("/api/users/patients");
    const mappedPatients: Patient[] = response.data.map((patient: any) => ({
      userId: patient.id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      role: patient.role,
      address: {
        street: patient.address.street,
        city: patient.address.city,
        state: patient.address.state,
        country: patient.address.country,
        postcode: patient.address.postal_code,
      },
      languages: patient.languages.map((lang: any) => ({
        id: lang.id,
        language_name: lang.language_name,
      })),
      title: patient.title,
      phone_number: patient.phone_number,
      date_of_birth: new Date(patient.date_of_birth),
      insurance: patient.insurance_type,
    }));
    setPatients(mappedPatients);
    console.log(mappedPatients);
  } catch (error: any) {
    console.error("Error fetching Patients:", error);
    setError("Failed to fetch Patients. Please try again.");
    if (error.response && error.response.status === 401) {
      logout();
    }
  } finally {
    setLoading(false);
  }
};

export default {
  fetchUserAppointments,
  fetchDoctors,
  fetchUserDoctors,
  fetchPatients,
};
