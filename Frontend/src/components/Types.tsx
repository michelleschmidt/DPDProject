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
  languages: any[]; // You might want to define a more specific type for languages
}
