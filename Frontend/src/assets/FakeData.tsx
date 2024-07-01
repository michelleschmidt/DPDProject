import { DoctorDatawithImage } from "../components/Types";

export const alldoctors: DoctorDatawithImage[] = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    specialty: "General Practitioner",
    address: "123 Main St, Anytown, USA",
    language: "English",
    image:
      "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg",
    latitude: 48.106,
    longitude: 11.58,
    distance: 2,
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    address: "456 Elm St, Anytown, USA",
    language: "Spanish",
    image:
      "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    latitude: 48.136,
    longitude: 11.576,
    distance: 5,
  },
  {
    id: 3,
    name: "Dr. Mary Smith",
    specialty: "Pediatrician",
    address: "789 Oak St, Anytown, USA",
    language: "French",
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    latitude: 48.106,
    longitude: 11.6,
    distance: 10,
  },
];

export const mydoctors: DoctorDatawithImage[] = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    specialty: "General Practitioner",
    address: "123 Main St, Anytown, USA",
    language: "English",
    image:
      "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg",
    latitude: 48.106,
    longitude: 11.58,
    distance: 2,
  },
  {
    id: 3,
    name: "Dr. Mary Smith",
    specialty: "Pediatrician",
    address: "789 Oak St, Anytown, USA",
    language: "French",
    image:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    latitude: 48.106,
    longitude: 11.6,
    distance: 10,
  },
];

export const standardappointmentInfo = [
  {
    reason: "Regular consultation",
    date: "15.07.2024",
    time: "10:00 AM",
    details: "Routine Check-up",
    interpretation: true,
  },
  {
    reason: "Acute Consultation",
    date: "16.07.2024",
    time: "11:30 AM",
    details: "Acute infection",
    interpretation: true,
  },
  {
    reason: "Preventive Health Check-Ups",
    date: "30.08.2024",
    time: "02:00 PM",
    details: "Annual Health Check-Up",
    interpretation: false,
  },
];
