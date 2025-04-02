import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { InputField } from "../InputField/InputField";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Select from "react-select";
import PhoneNumberInput from "../InputField/PhoneNumberInput";
// import { SelectField } from "../InputField/SelectField";

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

  const indonesianCityOptions = [
    { value: "Jakarta", label: "Jakarta" },
    { value: "Medan", label: "Medan" },
    { value: "Bandung", label: "Bandung" },
    { value: "Surabaya", label: "Surabaya" },
    { value: "Java", label: "Java" },
    { value: "Bekasi ", label: "Bekasi" },
    { value: "Palembang", label: "Palembang" },
    { value: "Semarang", label: "Semarang" },
    { value: "Sumatra", label: "Sumatra" },
  ];

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
                <label className="local-top">
                  Company logo <span className="login-danger">*</span>
                </label>
                {/* <InputField
                  required
                  type="text" // Изменяем тип инпута на "text", чтобы отображать имя файла
                  id="fileNameInput"
                  className={`form-control ${
                  errors.company_name ? "is-invalid" : ""
                }`}
                  name="company_logo"
                  value={formData.company_logo} // Показываем имя файла в инпуте
                  readOnly // Делаем инпут доступным только для отображения
                /> */}
                {/* <input
                  required
                  type="file"
                  id="file"
                  className={`form-control ${
                  errors.company_name ? "is-invalid" : ""
                }`}
                  name="company_logo"
                  onChange={handleFileChange}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                /> */}
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

                {/* <label htmlFor="file" className="custom-file-input__label">
                    Choose File
                  </label> */}
              </div>
              {/* <label htmlFor="file" className="upload">
                  Choose File
                </label> */}
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
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.request_type ? "is-invalid" : ""
                }`}
                label="Type of request"
                name="request_type"
                value={formData.request_type}
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
                  errors.date ? "is-invalid" : ""
                }`}
                name="date"
                label="Document date"
                value={formData.date ? dayjs(formData.date) : null}
                onChange={(date, dateString) =>
                  handleChange(null, date, dateString, "date")
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
              <label>
                Indonesian city <span className="login-danger">*</span>
              </label>
              <Select
                className={`${errors.indonesian_city ? "is-invalid" : ""}`}
                id="indonesian_city"
                value={indonesianCityOptions.find(
                  (option) => option.value === formData.indonesian_city
                )}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "indonesian_city")
                }
                options={indonesianCityOptions}
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
                  errors.first_person_name ? "is-invalid" : ""
                }`}
                label="Applicant's full name"
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
                  errors.first_person_birthplace ? "is-invalid" : ""
                }`}
                label="Place of birth"
                name="first_person_birthplace"
                value={formData.first_person_birthplace}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms cal-icon">
              <label>
                Date of birth <span className="login-danger">*</span>
              </label>
              <DatePicker
                placeholder=""
                className={`form-control datetimepicker ${
                  errors.first_person_birthdate ? "is-invalid" : ""
                }`}
                name="first_person_birthdate"
                label="Date of birth"
                value={
                  formData.first_person_birthdate
                    ? dayjs(formData.first_person_birthdate)
                    : null
                }
                onChange={(date, dateString) =>
                  handleChange(null, date, dateString, "first_person_birthdate")
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
                  errors.first_person_registration_address ? "is-invalid" : ""
                }`}
                label="Registration address"
                name="first_person_registration_address"
                value={formData.first_person_registration_address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.first_person_NIK ? "is-invalid" : ""
                }`}
                label="NIK"
                name="first_person_NIK"
                value={formData.first_person_NIK}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="row">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms">
              <InputField
                required
                className={`form-control ${
                  errors.second_person_name ? "is-invalid" : ""
                }`}
                label="Employee's full name"
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
                  errors.second_person_birthplace ? "is-invalid" : ""
                }`}
                label="Place of birth"
                name="second_person_birthplace"
                value={formData.second_person_birthplace}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="form-group local-forms cal-icon">
              <label>
                Date of birth <span className="login-danger">*</span>
              </label>
              <DatePicker
                placeholder=""
                className={`form-control datetimepicker ${
                  errors.second_person_birthdate ? "is-invalid" : ""
                }`}
                name="second_person_birthdate"
                label="Date of birth"
                value={
                  formData.second_person_birthdate
                    ? dayjs(formData.second_person_birthdate)
                    : null
                }
                onChange={(date, dateString) =>
                  handleChange(
                    null,
                    date,
                    dateString,
                    "second_person_birthdate"
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
