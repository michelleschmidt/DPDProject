import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface FormField {
  name: string;
  type:
    | "text"
    | "select"
    | "date"
    | "email"
    | "password"
    | "tel"
    | "checkbox"
    | "textarea";
  label: string;
  optionsdb?: { value: string; label: string }[];
  options?: string[];
  placeholder?: string;
  multiple?: boolean;
  showTimeSelect?: boolean;
  isRequired?: boolean;
}

interface GenericFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  buttonText: string;
  initialData?: any;
  onFieldChange?: (name: string, value: string | Date | boolean | null) => void;
}

const GenericForm: React.FC<GenericFormProps> = ({
  fields,
  onSubmit,
  buttonText,
  initialData = {},
  onFieldChange,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] =
        initialData[field.name] || (field.type === "date" ? null : "");
      return acc;
    }, {} as any)
  );

  const [errors, setErrors] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as any)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({
      ...formData,
      [name]: fieldValue,
    });
    setErrors({ ...errors, [name]: "" });
    if (onFieldChange) {
      onFieldChange(name, fieldValue);
    }
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setFormData({ ...formData, [name]: date });
    setErrors({ ...errors, [name]: "" });
    if (onFieldChange) {
      onFieldChange(name, date);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors: any = {};

    fields.forEach((field) => {
      if (!formData[field.name] && field.type !== "checkbox") {
        formIsValid = false;
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      onSubmit(formData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {fields.map((field) => (
        <Form.Group controlId={field.name} key={field.name}>
          <Form.Label>{field.label}</Form.Label>
          {field.type === "text" ||
          field.type === "email" ||
          field.type === "password" ? (
            <Form.Control
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              placeholder={field.placeholder}
            />
          ) : field.type === "textarea" ? (
            <Form.Control
              as="textarea"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              placeholder={field.placeholder}
              rows={4} // Adjust rows for textarea
            />
          ) : field.type === "select" ? (
            <Form.Select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              multiple={field.multiple}
            >
              <option value="">{field.placeholder}</option>
              {field.optionsdb?.map((option) => (
                <option key={option.value} value={option.value}>
                  {" "}
                  {/* Access value property */}
                  {option.label}
                </option>
              ))}
            </Form.Select>
          ) : field.type === "date" ? (
            <DatePicker
              selected={formData[field.name]}
              onChange={(date) => handleDateChange(date, field.name)}
              showTimeSelect={field.showTimeSelect || false}
              dateFormat={
                field.showTimeSelect ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy"
              }
              className="form-control"
            />
          ) : field.type === "checkbox" ? (
            <Form.Check
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleChange}
              isInvalid={!!errors[field.name]}
              label={field.label}
            />
          ) : null}
          <Form.Control.Feedback type="invalid">
            {errors[field.name]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <Button variant="primary" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
};

export default GenericForm;
