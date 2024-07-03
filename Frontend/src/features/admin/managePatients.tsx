import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import axiosInstance from "../../Axios";
import "../../App.css";
import AdminHeader from "../../components/website/layout/adminHeader";
import GenericTable from "../../components/Table";
import { Patient, Interaction } from "../../components/Types";
import GenericForm, { FormField } from "../../components/app/forms/GenericForm";
import { patients as fakePatients } from "../../assets/FakeData";

const ManagePatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    selectedLanguage: "",
    filterName: "",
    filterInsurance: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientInteractions, setPatientInteractions] = useState<Interaction[]>(
    []
  );
  const [languages, setLanguages] = useState<
    { id: number; language_name: string }[]
  >([]);

  useEffect(() => {
    // Fetch languages
    axiosInstance
      .get("/api/languages")
      .then((response) => {
        setLanguages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });

    // Set patients from fake data
    setPatients(fakePatients);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // In a real app, you'd make an API call here
      // await axiosInstance.delete(`/patients/${id}`);
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      setError("An error occurred while deleting the patient");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      // In a real app, you'd make API calls here
      // const patientResponse = await axiosInstance.get(`/patients/${id}`);
      // const interactionsResponse = await axiosInstance.get(`/patients/${id}/interactions`);

      const selectedPatient = patients.find((patient) => patient.id === id);
      setSelectedPatient(selectedPatient || null);

      // Fake interactions data
      setPatientInteractions([
        {
          id: 1,
          date: new Date(),
          doctorName: "Dr. Smith",
          status: "Completed",
          patientId: 0,
          doctorId: 0,
          language: "",
          translation: "",
        },
        {
          id: 2,
          date: new Date(),
          doctorName: "Dr. Johnson",
          status: "Scheduled",
          patientId: 0,
          doctorId: 0,
          language: "",
          translation: "",
        },
      ]);

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setError("An error occurred while fetching patient data");
    }
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFilters({
      ...filters,
      [id]: value,
    });
  };

  const columns: string[] = [
    "Name",
    "Address",
    "Insurance",
    "Phone Number",
    "Language",
  ];

  const filterOptions = {
    language: {
      value: filters.selectedLanguage,
      handleChange: handleFilterChange,
    },
    name: {
      value: filters.filterName,
      handleChange: handleFilterChange,
    },
    insurance: {
      value: filters.filterInsurance,
      handleChange: handleFilterChange,
    },
  };

  const actions = [
    {
      label: "Edit",
      onClick: handleEdit,
    },
    {
      label: "Delete",
      onClick: handleDelete,
    },
  ];

  const formFields: FormField[] = [
    {
      name: "preferredLanguage",
      type: "select",
      label: "Preferred Language",
      optionsdb: languages.map((language) => ({
        value: language.id.toString(),
        label: language.language_name,
      })),
      placeholder: "Select preferred language",
      multiple: false,
    },
    {
      name: "title",
      type: "select",
      label: "Title",
      options: ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."],
      placeholder: "Select title",
      multiple: false,
    },
    {
      name: "first_name",
      type: "text",
      label: "First Name",
      placeholder: "Enter First name",
    },
    {
      name: "name",
      type: "text",
      label: "Last Name",
      placeholder: "Enter Last name",
    },
    {
      name: "dob",
      type: "date",
      label: "Date of Birth",
      showTimeSelect: false,
    },
    {
      name: "postcode",
      type: "text",
      label: "Postcode",
      placeholder: "Enter postcode",
    },
    {
      name: "city",
      type: "text",
      label: "City",
      placeholder: "Enter City",
    },
    {
      name: "state",
      type: "text",
      label: "State",
      placeholder: "Enter State",
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      placeholder: "Enter Country",
    },
    {
      name: "contactInformation",
      type: "text",
      label: "Contact Information",
      placeholder: "+49 (0) 12368544",
    },
    {
      name: "emergency_contact",
      type: "text",
      label: "Emergency Contact Person",
      placeholder: "Enter Name",
    },
    {
      name: "relationship",
      type: "text",
      label: "Relationship",
      placeholder: "Brother, Father, Mother",
    },
    {
      name: "phone_number",
      type: "text",
      label: "Phone Number",
      placeholder: "+49(0)1236547",
    },
    {
      name: "street",
      type: "text",
      label: "Street",
      placeholder: "Enter street name and house number",
    },
    {
      name: "accessibilityNeeds",
      type: "text",
      label: "Accessibility Needs",
      placeholder: "Enter accessibility needs",
    },
  ];

  const tableData = patients.map((patient) => ({
    id: patient.id,
    Name: patient.name,
    Address: `${patient.address}`,
    Insurance: patient.insurance || "N/A",
    "Phone Number": patient.phoneNumber,
    Language: patient.language,
  }));

  const handleFormSubmit = async (formData: any) => {
    try {
      // In a real app, you'd make an API call here
      // await axiosInstance.put(`/patients/${selectedPatient?.id}`, formData);
      setShowModal(false);
      // Update the patient in the local state
      setPatients(
        patients.map((patient) =>
          patient.id === selectedPatient?.id
            ? { ...patient, ...formData }
            : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient:", error);
      setError("An error occurred while updating the patient");
    }
  };

  return (
    <div className="container">
      <div className="AdminHeader">
        <AdminHeader text={""} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <GenericTable
        columns={columns}
        data={patients}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        filterOptions={filterOptions}
        heading="Manage Patients"
        actions={actions}
        add={"Patient"}
      />
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GenericForm
            fields={formFields}
            onSubmit={handleFormSubmit}
            initialData={selectedPatient || {}}
            buttonText="Update"
          />
          <h3>Patient Interactions</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patientInteractions.map((interaction) => (
                <tr key={interaction.id}>
                  <td>{new Date(interaction.date).toLocaleDateString()}</td>
                  <td>{interaction.doctorName}</td>
                  <td>{interaction.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManagePatients;
