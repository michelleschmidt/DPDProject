import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
  buttonLink: string;
}

const SimpleForm: React.FC<Props> = ({ buttonLink }) => {
  const [formData, setFormData] = useState({
    feeling: "",
    AdditionalInfo: "",
    emergency: false,
  });
  const [errors, setErrors] = useState({
    feeling: "",
    AdditionalInfo: "",
  });

  const feelingsOptions = ["Happy", "Sad", "Angry", "Excited", "Anxious"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleFeelingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      feeling: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    const newErrors: any = {};
    if (!formData.feeling) {
      newErrors.feeling = "Feeling is required";
    }
    if (!formData.AdditionalInfo) {
      newErrors.AdditionalInfo = "Additional info is required";
    }

    // Update errors state
    setErrors(newErrors);

    // If there are errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // If no errors, proceed with form submission
    console.log(formData);
    // Here you can perform any action with the form data, like sending it to a server
    // Redirect to the specified link
    window.location.href = buttonLink;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="feeling">
        <Form.Label>Feeling</Form.Label>
        <Form.Select
          name="feeling"
          value={formData.feeling}
          onChange={handleFeelingChange}
          isInvalid={!!errors.feeling} // Set isInvalid based on errors.feeling
        >
          <option value="">Select feeling</option>
          {feelingsOptions.map((feeling, index) => (
            <option key={index} value={feeling}>
              {feeling}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.feeling} {/* Display error message */}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="AdditionalInfo">
        <Form.Label>Additional info for appointment</Form.Label>
        <Form.Control
          type="text"
          name="AdditionalInfo"
          value={formData.AdditionalInfo}
          onChange={handleChange}
          isInvalid={!!errors.AdditionalInfo} // Set isInvalid based on errors.AdditionalInfo
          placeholder="Enter your Additional info for appointment"
        />
        <Form.Control.Feedback type="invalid">
          {errors.AdditionalInfo} {/* Display error message */}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="emergency">
        <Form.Label>Is it an emergency?</Form.Label>
        <Form.Check
          type="checkbox"
          name="emergency"
          checked={formData.emergency}
          onChange={handleChange}
          label="Yes"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SimpleForm;
