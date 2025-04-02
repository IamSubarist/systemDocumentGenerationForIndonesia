import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PropTypes from "prop-types";

const PhoneNumberInput = ({
  formData,
  onChange,
  name,
  setFormData,
  label,
  required,
  errors,
}) => {
  const [phone, setPhone] = useState(formData[name] || "");
  const [isValid, setIsValid] = useState(true);

  const handlePhoneChange = (value, country) => {
    setPhone(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    onChange(value, name);

    setIsValid(value.replace(`+${country.dialCode}`, "").length >= 7);
  };

  return (
    <div>
      <PhoneInput
        className={`${errors.company_phone ? "is-invalid" : ""}`}
        inputClass="custom-phone-input"
        placeholder=""
        value={phone}
        onChange={handlePhoneChange}
        enableSearch={false}
        disableDropdown={false}
        inputProps={{
          name: "company_phone",
          required: true,
        }}
        containerStyle={{ width: "100%" }}
        inputStyle={{
          width: "100%",
          height: "45px",
          borderRadius: "10px",
          fontSize: "14px",
        }}
        dropdownStyle={{
          background: "rgba(255, 255, 255, 0.9)",
        }}
      />
      <label>
        {label} {required ? <span className="login-danger">*</span> : ""}
      </label>
      {!isValid && (
        <p style={{ color: "red", fontSize: "12px" }}>
          Неверный номер телефона
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;

PhoneNumberInput.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.any,
  required: PropTypes.any,
  errors: PropTypes.any,
};
