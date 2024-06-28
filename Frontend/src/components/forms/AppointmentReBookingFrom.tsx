import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm, { FormField } from "./GenericForm";

const AppointmentReBookingForm: React.FC = () => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [appointmentOptions, setAppointmentOptions] = useState<string[]>([]);
  const [showPreferredLanguageDoctors, setShowPreferredLanguageDoctors] =
    useState(false);

  const navigate = useNavigate();

  const handleFieldChange = (
    name: string,
    value: string | boolean | string[] | Date | null
  ) => {
    if (name === "reason") {
      setSelectedReason(value as string);
    } else if (name === "showPreferredLanguageDoctors") {
      setShowPreferredLanguageDoctors(value as boolean);
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
      const options = getAppointmentOptions(selectedReason);
      setAppointmentOptions(options);
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
    {
      name: "appointmentType",
      type: "select",
      label: "Appointment Type",
      options: appointmentOptions,
      placeholder: "Select appointment type",
    },
    {
      name: "specialist",
      type: "select",
      label: "Specialist needed",
      options: ["Cardiologist", "GP", "Gyno"], // Make sure `specialistOptions` is defined elsewhere
      placeholder: "Select specialist",
    },
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
      name: "showPreferredLanguageDoctors",
      type: "checkbox",
      label: "Only Show Doctors with Preferred Language",
    },
  ];

  const handleSubmit = (formData: any) => {
    console.log("Form Data:", formData);
    navigate("/find-doctors", { state: { formData } });
  };

  return (
    <div>
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
