export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export interface Language {
  id: number;
  language_name: string;
}

export interface Specialization {
  id: number;
  area_of_specialization: string;
}

export interface User {
  userId: number;
  token?: string;
  first_name: string;
  last_name: string;
  email?: string;
  role?: string;
  address: Address;
  languages: Language[];
  title?: string;
  phone_number?: string;
  date_of_birth?: Date;
  password?: string;
  gender?: string;
}

export interface Doctor extends User {
  specialization: Specialization;
  profileImage: string;
}

export interface Patient extends User {
  insurance?: string;
}

export interface DoctorWithDistance extends Doctor {
  distance: number;
}

export interface Availability {
  id: number;
  doctor_id: number;
  availability_date: string;
  active: boolean;
}

export interface AppointmentReason {
  reason?: string;
  notes?: string;
}

export interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentReason: AppointmentReason;
  bookTranslation: boolean;
  completed: boolean;
  doctor: Doctor;
  patient: Patient;
  availability: Availability;
}
