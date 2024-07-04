import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/layout/adminHeader";
import Button from "../../utils/Button";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios";

interface Language {
  id: number;
  language_name: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number>(1); // Default to English
  const [formData, setFormData] = useState<any>({
    preferredLanguage: "1",
    emailDoctor: "",
    password: "",
    title: "",
    first_name: "",
    name: "",
    postcode: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
    street: "",
  });

  useEffect(() => {
    axiosInstance
      .get("/api/search/languages")
      .then((response) => setLanguages(response.data))
      .catch((error) => console.error("Error fetching languages:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "preferredLanguage") {
      setSelectedLanguage(parseInt(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axiosInstance
      .post("/api/auth/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const isFrench = selectedLanguage === 3;

  return (
    <div className="h-screen w-full">
      <AdminHeader text={""} />
      <div className="h-full w-full gap-8 flex bg-blue-50 flex-col items-center pt-28">
        <div className="flex flex-col gap-8 w-[400px] bg-white rounded-2xl px-5 py-6 shadow-custom">
          <h1 className="text-center text-blue-600 font-semibold text-3xl">
            {isFrench ? "S'inscrire" : "Register"}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Langue Préférée" : "Preferred Language"}*
              </span>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                className="input_ outline-none rounded-lg px-2 p-1"
              >
                {languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.language_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Adresse e-mail" : "Email address"}*
              </span>
              <input
                type="email"
                name="emailDoctor"
                value={formData.emailDoctor}
                onChange={handleChange}
                placeholder={isFrench ? "Entrer l'email" : "Enter email"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Mot de passe" : "Password"}*
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  isFrench ? "Entrer le mot de passe" : "Enter password"
                }
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Titre" : "Title"}*
              </span>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input_ outline-none rounded-lg px-2 p-1"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Prénom" : "First Name"}*
              </span>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder={isFrench ? "Entrer le prénom" : "Enter First name"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Nom de famille" : "Last Name"}*
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={
                  isFrench ? "Entrer le nom de famille" : "Enter Last name"
                }
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Rue" : "Street"}*
              </span>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder={
                  isFrench
                    ? "Entrer le nom de la rue et le numéro de maison"
                    : "Enter street name and house number"
                }
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Code postal" : "Postcode"}*
              </span>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder={
                  isFrench ? "Entrer le code postal" : "Enter postcode"
                }
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Ville" : "City"}*
              </span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder={isFrench ? "Entrer la ville" : "Enter City"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "État" : "State"}*
              </span>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder={isFrench ? "Entrer l'État" : "Enter State"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Pays" : "Country"}*
              </span>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder={isFrench ? "Entrer le pays" : "Enter Country"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-medium">
                {isFrench ? "Informations de contact" : "Contact Information"}*
              </span>
              <input
                type="text"
                name="contactInformation"
                value={formData.contactInformation}
                onChange={handleChange}
                placeholder={isFrench ? "+49 (0) 12368544" : "+49 (0) 12368544"}
                className="input_ outline-none rounded-lg px-2 p-1"
              />
            </div>

            <div className="flex flex-col gap-4 w-full">
              <Button
                onClick={() => console.log("submit")}
                text={isFrench ? "S'inscrire" : "Register"}
                className={"text-center"}
              />
              <div className="text-center text-sm">
                {isFrench
                  ? "Vous avez déjà un compte?"
                  : "Already have an account?"}{" "}
                <Link to={"/signin"} className="text-blue-400 hover:underline">
                  {isFrench ? "se connecter" : "sign in"}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
