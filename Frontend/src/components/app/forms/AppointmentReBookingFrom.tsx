import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm, { FormField } from "./GenericForm";
import axiosInstance from "../../../Axios";
import { useAuth } from "../../auth/AuthContext"; // Import useAuth hook
import "../../App.css";

const AppointmentReBookingForm: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [appointmentOptions, setAppointmentOptions] = useState<string[]>([]);
  const [showOtherText, setShowOtherText] = useState(false);
  const { userData } = useAuth(); // Use useAuth hook to access token
  const history = useNavigate();

  const handleFieldChange = (
    name: string,
    value: string | boolean | string[] | Date | null
  ) => {
    if (name === "reason") {
      setSelectedReason(value as string);
    } else if (name === "appointmentType") {
      setShowOtherText(value === "Other");
    }
  };

  const getAppointmentOptions = (reason: string | null): string[] => {
    switch (reason) {
      case "Regular consultation":
        return [
          "Routine Check-up",
          "Diagnostic appointment",
          "Follow Up appointment",
          "Non-urgent medical issue",
          "Other",
        ];
      case "Acute Consultation":
        return [
          "Sudden worsening of chronic condition",
          "Acute infection",
          "Acute pain",
        ];
      case "Preventive Health Check-Ups":
        return [
          "Annual Health Check-Up",
          "Cancer Screening",
          "Well-Child Visit",
          "Vaccination appointment",
          "Other",
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (selectedReason) {
      setAppointmentOptions(getAppointmentOptions(selectedReason));
    }
  }, [selectedReason]);

  const appointmentFields: FormField[] = [
    {
      name: "reason",
      type: "select",
      label: "Reason for visit",
      options: [
        "Regular consultation",
        "Acute Consultation",
        "Preventive Health Check-Ups",
      ],
      placeholder: "Select reason",
    },
    ...(selectedReason
      ? [
          {
            name: "appointmentType",
            type: "select",
            label: "Appointment Type",
            options: appointmentOptions,
            placeholder: "Select appointment type",
          } as FormField,
        ]
      : []),
    ...(showOtherText
      ? [
          {
            name: "otherReason",
            type: "text",
            label: "Please specify other reason",
          } as FormField,
        ]
      : []),
    {
      name: "description",
      type: "textarea",
      label: "Description",
    },
    {
      name: "preferredConsultationMethod",
      type: "select",
      label: "Preferred method of consultation",
      options: ["In person", "Telemedicine"],
      placeholder: "Select consultation method",
    },
    {
      name: "appointment",
      type: "date",
      label: "Appointment",
      showTimeSelect: true,
    },

    {
      name: "phone",
      type: "phone",
      label: "I need translation assistance",
      isRequired: false,
    },
  ];

  const handleSubmit = (formData: any) => {
    //history("/find");
    /* // Data to be sent to the backend immediately
    const dataToSend = {
      language_name: formData.showPreferredLanguageDoctors,
      specialization_id: parseInt(formData.specialist, 10), // Convert specialization_id to an integer
      address: "",
      radius: 2.5,
    };

    // Data to be stored for later use
    const dataToStore = {
      reason: formData.reason,
      appointmentType: formData.appointmentType,
      otherReason: formData.otherReason,
      description: formData.description,
      preferredConsultationMethod: formData.preferredConsultationMethod,
    };

    axiosInstance
      .get("https://health-connect-kyp7.onrender.com/api/search", {
        params: dataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Appointment booked successfully:", response.data);

        // Store the data for later use
        localStorage.setItem("appointmentData", JSON.stringify(dataToStore));

        // Navigate to the find-doctor page
        history("/find", { state: { appointmentData: dataToStore } });
      })
      .catch((error) => {
        console.error("Appointment booking error:", error);
      }); */
  };

  return (
    <div className="appointment-booking-form">
      <GenericForm
        fields={appointmentFields}
        onSubmit={handleSubmit}
        buttonText="Book Appointment"
        initialData={{ reason: selectedReason }}
        onFieldChange={handleFieldChange}
      />
    </div>
  );
};

export default AppointmentReBookingForm;
