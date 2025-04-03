import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { InputField } from "../InputField/InputField";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Select from "react-select";
import PhoneNumberInput from "../InputField/PhoneNumberInput";
import axios from "axios";

export const FormStep = ({
  step,
  formData,
  setFormData,
  handleChange,
  handleSelectChange,
  handleFileChange,
  isClicked,
  errors,
}) => {
  const [cityOptions, setCityOptions] = useState([]);

  const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://185.80.234.165:4022/v1/cities"
        );
        const formattedCities = response.data.data.map((city) => ({
          value: capitalizeWords(city),
          label: capitalizeWords(city),
        }));
        setCityOptions(formattedCities);
      } catch (error) {
        console.error("Ошибка при получении городов:", error);
      }
    };

    fetchCities();
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
          <div className="col-12 col-md-6 col-xl-4">
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
            <div className="form-group local-forms cal-icon">
              <label>
                Document date <span className="login-danger">*</span>
              </label>
              <DatePicker
                placeholder=""
                className={`form-control datetimepicker ${
                  errors.letter_date ? "is-invalid" : ""
                }`}
                name="letter_date"
                label="Document date"
                value={
                  formData.letter_date ? dayjs(formData.letter_date) : null
                }
                onChange={(date, dateString) =>
                  handleChange(null, date, dateString, "letter_date")
                }
                suffixIcon={null}
                style={{
                  borderColor: isClicked
                    ? "#2E37A4"
                    : "2px solid rgba(46, 55, 164, 0.1)",
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms cal-icon">
              <label>
                Start probationary period date{" "}
                <span className="login-danger">*</span>
              </label>
              <DatePicker
                placeholder=""
                className={`form-control datetimepicker ${
                  errors.start_probationary_period_date ? "is-invalid" : ""
                }`}
                name="start_probationary_period_date"
                label="Start probationary period date"
                value={
                  formData.start_probationary_period_date
                    ? dayjs(formData.start_probationary_period_date)
                    : null
                }
                onChange={(date, dateString) =>
                  handleChange(
                    null,
                    date,
                    dateString,
                    "start_probationary_period_date"
                  )
                }
                suffixIcon={null}
                style={{
                  borderColor: isClicked
                    ? "#2E37A4"
                    : "2px solid rgba(46, 55, 164, 0.1)",
                }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.inviting_person_name ? "is-invalid" : ""
                }`}
                label="Inviting person's full name"
                name="inviting_person_name"
                value={formData.inviting_person_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.inviting_person_position ? "is-invalid" : ""
                }`}
                label="Inviting person's position"
                name="inviting_person_position"
                value={formData.inviting_person_position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <label>
                Indonesian city <span className="login-danger">*</span>
              </label>
              <Select
                className={`${errors.indonesian_city ? "is-invalid" : ""}`}
                id="indonesian_city"
                value={cityOptions.find(
                  (option) => option.value === formData.indonesian_city
                )}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "indonesian_city")
                }
                options={cityOptions}
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
    case 2:
      return (
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.invited_person_name ? "is-invalid" : ""
                }`}
                label="Invited person's full name"
                name="invited_person_name"
                value={formData.invited_person_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.invited_person_position ? "is-invalid" : ""
                }`}
                label="Invited person's position"
                name="invited_person_position"
                value={formData.invited_person_position}
                onChange={handleChange}
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
};
