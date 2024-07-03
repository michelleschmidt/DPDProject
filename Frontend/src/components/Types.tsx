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

export interface Interaction {
  id: number;
  patientId: number;
  date: Date;
  doctorId: number;
  language: string;
  status: string;
  translation: string;
  patientName?: string;
  doctorName?: string;
}
export interface Patient {
  id: number;
  name: string;
  address: string;
  insurance: string;
  phoneNumber: string;
  language: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialisation: string;
  language: string;
}
