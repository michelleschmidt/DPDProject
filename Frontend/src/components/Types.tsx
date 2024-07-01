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
