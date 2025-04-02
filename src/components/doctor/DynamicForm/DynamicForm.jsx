import React from "react";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { DatePicker, Select } from "antd";
import PropTypes from "prop-types";
import { documentConfigs } from "../../../assets/json/DocumentConfigs";

export const DynamicForm = ({
  documentType,
  formData,
  //   setFormData,
  step,
  handleChange,
  handleSelectChange,
  handleFileChange,
  errors,
  isClicked,
}) => {
  const config = documentConfigs[documentType];

  if (!config) {
    return <p>Invalid document type</p>;
  }

  return (
    <div>
      {config.fields
        .filter((field) => field.step === step)
        .map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>

            {field.type === "text" && (
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(e)}
              />
            )}

            {field.type === "file" && (
              <input
                type="file"
                onChange={(e) => handleFileChange(e, field.name)}
              />
            )}

            {field.type === "select" && (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => handleSelectChange(e, field.name)}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {/* Отображение ошибок */}
            {isClicked && errors[field.name] && (
              <p style={{ color: "red" }}>{errors[field.name]}</p>
            )}
          </div>
        ))}
    </div>
  );
};

DynamicForm.propTypes = {
  step: PropTypes.any,
  formData: PropTypes.object,
  setFormData: PropTypes.any,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  handleFileChange: PropTypes.func,
  isClicked: PropTypes.any,
  errors: PropTypes.any,
  documentType: PropTypes.any,
};
