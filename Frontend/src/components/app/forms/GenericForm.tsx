import React, { FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Forms.css";
import Button from "../../Button"; // Import the custom Button component

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
    | "textarea"
    | "phone";
  label: string;
  options?: string[];
  optionsdb?: { value: string; label: string }[];
  placeholder?: string;
  multiple?: boolean;
  showTimeSelect?: boolean;
  isRequired?: boolean;
  checkboxLabel?: string;
}

interface GenericFormProps {
  fields: FormField[];
  onSubmit: (formData: any) => void;
  buttonText: string;
  initialData?: any;
  onFieldChange?: (
    name: string,
    value: string | string[] | Date | boolean | null
  ) => void;
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
    let formIsValid = true;
    const newErrors: any = {};

    fields.forEach((field) => {
      if (
        !formData[field.name] &&
        field.type !== "checkbox" &&
        field.type !== "phone"
      ) {
        formIsValid = false;
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      console.log("Calling onSubmit with formData:", formData);
      onSubmit(formData);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {fields.map((field) => (
        <Form.Group
          controlId={field.name}
          key={field.name}
          className="form-group"
        >
          {field.type === "phone" ? (
            <div className="phone-field">
              <Form.Check
                type="checkbox"
                id={`${field.name}Checkbox`}
                name={field.name}
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(e)}
                label={field.label}
              />
              {field.checkboxLabel && (
                <small className="form-text text-muted">
                  {field.checkboxLabel}
                </small>
              )}
            </div>
          ) : (
            <>
              {field.type !== "date" && <Form.Label>{field.label}</Form.Label>}
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "password" ||
              field.type === "tel" ? (
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
                  rows={4}
                />
              ) : field.type === "select" ? (
                <Form.Select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(e)}
                  isInvalid={!!errors[field.name]}
                  multiple={field.multiple}
                >
                  <option value="">{field.placeholder}</option>
                  {(field.optionsdb || field.options)?.map((option) => (
                    <option
                      key={typeof option === "string" ? option : option.value}
                      value={typeof option === "string" ? option : option.value}
                    >
                      {typeof option === "string" ? option : option.label}
                    </option>
                  ))}
                </Form.Select>
              ) : field.type === "date" ? (
                <div className="date-field">
                  <Form.Label>{field.label}</Form.Label>
                  <DatePicker
                    selected={formData[field.name]}
                    onChange={(date) => handleDateChange(date, field.name)}
                    showTimeSelect={field.showTimeSelect || false}
                    dateFormat={
                      field.showTimeSelect
                        ? "MMMM d, yyyy h:mm aa"
                        : "MMMM d, yyyy"
                    }
                    className="form-control"
                  />
                </div>
              ) : field.type === "checkbox" ? (
                <Form.Check
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                  isInvalid={!!errors[field.name]}
                  label={field.checkboxLabel || field.label}
                />
              ) : null}
            </>
          )}
          <Form.Control.Feedback type="invalid">
            {errors[field.name]}
          </Form.Control.Feedback>
        </Form.Group>
      ))}
      <Button onClick={handleButtonClick} color="primary">
        {buttonText}
      </Button>
    </Form>
  );
};

export default GenericForm;
