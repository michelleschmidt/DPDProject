export interface DoctorDatawithImage {
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  image: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export interface DoctorData {
  id: number;
  name: string;
  specialty: string;
  address: string;
  language: string;
  distance: number;
}
export interface UserData {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  address: {
    city: string;
    state: string;
    street: string;
    country: string;
    postcode: string;
  };
  languages: any[];
  token?: string;
}

export interface Availability {
  id: number;
  doctor_id: number;
  availability_date: Date;
  active: boolean;
}

export interface Appointment {
  id: number;
  user: {
    first_name: string;
    last_name: string;
  };
  doctor: {
    first_name: string;
    last_name: string;
  };
  availability: {
    date: string;
    start_time: string;
  };
  appointment_reason: string;
  book_translation: boolean;
}

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  title?: string;
  email: string;
  phone_number?: string;
  address: string;
  insurance?: string;
  languages: {
    language_name: string;
  }[];
}

export interface Doctor {
  id: number;
  last_name: string;
  title: string;
  first_name: string;
  specialization: {
    area_of_specialization: string;
  };
  languages: {
    language_name: string;
  }[];
  profileImage: string;
}

export interface Language {
  id: number;
  language_name: string;
}

export interface Specialization {
  id: number;
  area_of_specialization: string;
}
