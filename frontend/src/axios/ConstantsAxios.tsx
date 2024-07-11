// src/constants/apiEndpoints.ts

export const API_ENDPOINTS = {
  // Appointments
  GET_ALL_APPOINTMENTS: "/api/appointments/",
  CREATE_APPOINTMENT: "/api/appointments/new",
  CREATE_APPOINTMENT_BY_ADMIN: "/api/appointments/create-new",
  GET_USER_APPOINTMENTS: "/api/appointments/user-appointments",
  GET_DOCTOR_APPOINTMENTS: "/api/appointments/doctor-appointments",
  GET_DOCTOR_PATIENTS: (id: number) =>
    `/api/appointments/doctor-patients/${id}`,
  GET_USER_DOCTORS: (id: number) => `/api/appointments/user-doctors/${id}`,
  GET_USER_APPOINTMENTS_BY_ADMIN: (id: number) =>
    `/api/appointments/user/${id}`,
  GET_DOCTOR_APPOINTMENTS_BY_ADMIN: (id: number) =>
    `/api/appointments/doctor/${id}`,
  UPDATE_APPOINTMENT: (id: number) => `/api/appointments/${id}`,
  DELETE_APPOINTMENT: (id: number) => `/api/appointments/${id}`,

  // Availability
  CREATE_AVAILABILITY: "/api/availabilities/",
  CREATE_AVAILABILITY_BY_DOCTOR: "/api/availabilities/availability-create",
  GET_ALL_AVAILABILITIES: "/api/availabilities/all-availabilities",
  GET_DOCTOR_AVAILABILITIES: "/api/availabilities/doctor-availabilities",
  GET_DOCTOR_AVAILABILITIES_BY_USER: (doctor_id: number) =>
    `/api/availabilities/doctor/${doctor_id}`,
  GET_AVAILABILITY_BY_ID: (id: number) => `/api/availabilities/${id}`,
  UPDATE_AVAILABILITY: (id: number) => `/api/availabilities/${id}`,
  DELETE_AVAILABILITY: (id: number) => `/api/availabilities/${id}`,

  // Dashboard
  SEARCH: "/api/dashboard/",
  GET_LANGUAGES: "/api/dashboard/languages",
  GET_SPECIALIZATIONS: "/api/dashboard/specializations",
  GET_DOCTORS_COUNT: "/api/dashboard/doctors-count",
  GET_USERS_COUNT: "/api/dashboard/users-count",

  // Users
  GET_DOCTORS: "/api/users/",
  CREATE_USER: "/api/users/admin-create",
  GET_PATIENTS: "/api/users/patients",
  GET_ALL_USERS: "/api/users/all-users",
  GET_DOCTOR_BY_ID: (id: number) => `/api/users/doctor/${id}`,
  GET_USER_BY_ID: (id: number) => `/api/users/${id}`,
  UPDATE_USER: (id: number) => `/api/users/${id}`,
  DELETE_USER: (id: number) => `/api/users/${id}`,
};

export const ERROR_MESSAGES = {
  FETCH_FAILED: "Failed to fetch data. Please try again.",
  CREATE_FAILED: "Failed to create resource.",
  UPDATE_FAILED: "Failed to update resource.",
  DELETE_FAILED: "Failed to delete resource.",
  UNAUTHORIZED: "You do not have permission to perform this action.",
};
