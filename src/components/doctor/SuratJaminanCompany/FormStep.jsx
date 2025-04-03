import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { InputField } from "../InputField/InputField";
import Select from "react-select";
import PhoneNumberInput from "../InputField/PhoneNumberInput";
import CompanyAddressInput from "../InputField/CompanyAddressInput";

export const FormStep = ({
  step,
  formData,
  setFormData,
  handleChange,
  handleSelectChange,
  handleFileChange,
  errors,
}) => {
  const [nationalityOptions, setNationalityOptions] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const options = data
          .map((country) => ({
            value: country.name.common,
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={country.flags?.png}
                  alt={country.name?.common}
                  style={{ width: "20px", height: "15px", marginRight: "10px" }}
                />
                {country.name.common}
              </div>
            ),
          }))
          .filter((option) => option.value);

        setNationalityOptions(options);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const [fileName, setFileName] = useState("");

  const loadFile = (event) => {
    handleFileChange(event);

    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  switch (step) {
    case 1:
      return (
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <div className="custom-file-input">
                <label className="local-top">Company logo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="company_logo"
                  id="file"
                  onChange={loadFile}
                  className="custom-file-input__hidden"
                />
                <input
                  type="text"
                  className={`custom-file-input__text ${
                    errors.company_logo ? "is-invalid" : ""
                  }`}
                  readOnly
                  value={fileName || "Choose File"}
                  onClick={() => document.getElementById("file").click()}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.company_name ? "is-invalid" : ""
                }`}
                label="Company name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                errors={errors}
              />
            </div>
          </div>
          {/* <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.company_address ? "is-invalid" : ""
                }`}
                label="Company address"
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
              />
            </div>
          </div> */}
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <label>
                Company address <span className="login-danger">*</span>
              </label>
              <div>
                <CompanyAddressInput
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <PhoneNumberInput
                errors
                required
                label="Company phone"
                name="company_phone"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.company_email ? "is-invalid" : ""
                }`}
                type="email"
                label="Company e-mail"
                name="company_email"
                value={formData.company_email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.company_nib ? "is-invalid" : ""
                }`}
                label="Company NIB"
                name="company_nib"
                value={formData.company_nib}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.first_person_name ? "is-invalid" : ""
                }`}
                label="Person's full name"
                name="first_person_name"
                value={formData.first_person_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.first_person_position ? "is-invalid" : ""
                }`}
                label="Person's post"
                name="first_person_position"
                value={formData.first_person_position}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.second_person_name ? "is-invalid" : ""
                }`}
                label="Person's full name"
                name="second_person_name"
                value={formData.second_person_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.second_person_passport_num ? "is-invalid" : ""
                }`}
                label="Passport number"
                name="second_person_passport_num"
                value={formData.second_person_passport_num}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.second_person_reason_to_apply ? "is-invalid" : ""
                }`}
                label="Reason to apply"
                name="second_person_reason_to_apply"
                value={formData.second_person_reason_to_apply}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.visa_type ? "is-invalid" : ""
                }`}
                label="Visa type"
                name="visa_type"
                value={formData.visa_type}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <label>
                Citizenship <span className="login-danger">*</span>
              </label>
              <Select
                className={`${errors.nationality ? "is-invalid" : ""}`}
                id="nationality"
                value={nationalityOptions.find(
                  (option) =>
                    option.value === formData.second_person_nationality
                )}
                onChange={(selectedOption) =>
                  handleSelectChange(
                    selectedOption,
                    "second_person_nationality"
                  )
                }
                options={nationalityOptions}
                placeholder=""
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused
                      ? "none"
                      : "2px solid rgba(46, 55, 164, 0.1);",
                    boxShadow: state.isFocused ? "0 0 0 1px #2e37a4" : "none",
                    "&:hover": {
                      borderColor: state.isFocused
                        ? "none"
                        : "2px solid rgba(46, 55, 164, 0.1)",
                    },
                    borderRadius: "10px",
                    fontSize: "14px",
                    minHeight: "45px",
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen
                      ? "rotate(-180deg)"
                      : "rotate(0)",
                    transition: "250ms",
                    width: "35px",
                    height: "35px",
                  }),
                }}
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

FormStep.propTypes = {
  step: PropTypes.number,
  formData: PropTypes.object,
  setFormData: PropTypes.any,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  handleFileChange: PropTypes.func,
  isClicked: PropTypes.any,
  errors: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
};
