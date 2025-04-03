/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import axios from "axios";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { FormStep } from "./FormStep";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import dayjs from "dayjs";
import { citizenshipTranslate } from "../../../assets/json/CitizenshipTranslate";

const SuratJaminanCompany = () => {
  const [formData, setFormData] = useState({
    company_logo: "",
    company_name: "PT. Nusantara Sejahtera",
    company_address: "Jl. Merdeka No. 99, Surabaya",
    company_phone: "+62 31 789 4567",
    company_email: "info@nusantarasejahtera.co.id",
    company_nib: "342342523525",
    first_person_name: "Ahmad Fauzi",
    first_person_position: "Director",
    second_person_name: "John Smith",
    second_person_nationality: "",
    second_person_passport_num: "A12345678",
    second_person_reason_to_apply: "Investasi",
    visa_type: "C28",
  });
  // const [formData, setFormData] = useState({
  //   company_name: "",
  //   company_address: "",
  //   company_phone: "",
  //   company_email: "",
  //   request_type: "",
  //   date: "",
  //   indonesian_city: "",
  //   first_person_name: "",
  //   first_person_birthplace: "",
  //   first_person_birthdate: "",
  //   first_person_registration_address: "",
  //   first_person_NIK: "",
  //   second_person_name: "",
  //   second_person_birthplace: "",
  //   second_person_birthdate: "",
  //   second_person_nationality: "",
  //   second_person_passport_num: "",
  // });

  const requiredFields = {
    1: [
      "company_name",
      "company_address",
      "company_phone",
      "company_email",
      "company_nib",
      "first_person_name",
      "first_person_position",
    ],
    2: [
      "second_person_name",
      "second_person_passport_num",
      "second_person_reason_to_apply",
      "visa_type",
      "second_person_nationality",
    ],
  };

  const steps = [
    { id: 1, label: "Company data" },
    { id: 2, label: "Person data" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = steps.length;

  const [errors, setErrors] = useState({});

  const translateToIndonesian = async (text) => {
    const url = "https://libretranslate.com/translate";

    try {
      const response = await axios.post(
        url,
        {
          q: text,
          source: "en",
          target: "id",
          format: "text",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.translatedText;
    } catch (error) {
      console.error("Ошибка перевода:", error);
      return text;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          company_logo: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = async (selectedOption, fieldName) => {
    if (!selectedOption) return;

    const translatedValue = await translateToIndonesian(selectedOption.value);

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: translatedValue,
    }));
  };

  const validateRequiredFieldsForStep = () => {
    const fieldsForCurrentStep = requiredFields[currentStep];
    const newErrors = {};

    fieldsForCurrentStep.forEach((field) => {
      const value = formData[field];

      if (typeof value === "string" && value.trim() === "") {
        newErrors[field] = "Это поле обязательно для заполнения";
      } else if (value instanceof Date && isNaN(value.getTime())) {
        newErrors[field] = "Это поле обязательно для заполнения";
      } else if (Array.isArray(value) && value.length === 0) {
        newErrors[field] = "Это поле обязательно для заполнения";
      } else if (value === null || value === undefined) {
        newErrors[field] = "Это поле обязательно для заполнения";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateRequiredFieldsForStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      alert("Пожалуйста, заполните все обязательные поля.");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Данные формы: ", formData);

    const citizenshipIndonesian =
      citizenshipTranslate[formData.second_person_nationality] ||
      formData.second_person_nationality;

    const data = {
      type: "SURAT_JAMINAN_COMPANY",
      data: {
        ...(formData.company_logo && { company_logo: formData.company_logo }),
        company_name: formData.company_name,
        company_address: formData.company_address,
        company_phone: formData.company_phone,
        company_email: formData.company_email,
        company_nib: formData.company_nib,
        first_person_name: formData.first_person_name,
        first_person_position: formData.first_person_position,
        second_person_name: formData.second_person_name,
        second_person_nationality: citizenshipIndonesian,
        second_person_passport_num: formData.second_person_passport_num,
        second_person_reason_to_apply: formData.second_person_reason_to_apply,
        visa_type: formData.visa_type,
      },
    };

    try {
      const response = await axios.post("http://185.80.234.165:4022/v1", data, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Файл скачан.");

      console.log("Ответ от бэкенда:", response.data);

      // setFormData({
      //   company_logo: "",
      //   company_name: "",
      //   company_address: "",
      //   company_phone: "",
      //   company_email: "",
      //   first_person_name: "",
      //   first_person_birthplace: "",
      //   first_person_birthdate: "",
      //   first_person_registration_address: "",
      //   first_person_NIK: "",
      //   second_person_name: "",
      //   second_person_birthplace: "",
      //   second_person_birthdate: "",
      //   second_person_nationality: "",
      //   second_person_passport_num: "",
      //   request_type: "",
      //   date: "",
      //   indonesian_city: "",
      // });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleChange = (e, date, dateString, fieldName) => {
    if (e && e.target) {
      const { name, value } = e.target;

      if (name) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        if (value.trim() !== "") {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[name];
            return newErrors;
          });
        }
      } else {
        console.warn("Field name is undefined, can't update formData");
      }
    } else if (date) {
      const formattedDate = dayjs.isDayjs(date)
        ? date.format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        : null;

      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: null,
      }));
    }
  };

  return (
    <div>
      <Header />
      <Sidebar
        id="menu-item1"
        id1="menu-items1"
        activeClassName="surat-jaminan-company"
      />
      <div>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Header */}
            <div className="page-header">
              <div className="">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <ProgressBar currentStep={currentStep} steps={steps} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="">
                        <div className="col-12">
                          <div className="form-heading">
                            <h4>SURAT JAMINAN COMPANY</h4>
                          </div>
                        </div>
                        <FormStep
                          step={currentStep}
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                          handleSelectChange={handleSelectChange}
                          handleFileChange={handleFileChange}
                          errors={errors}
                        />
                        <NavigationButtons
                          currentStep={currentStep}
                          nextStep={nextStep}
                          prevStep={prevStep}
                          handleSubmit={handleSubmit}
                          totalSteps={totalSteps}
                          validateRequiredFieldsForStep={
                            validateRequiredFieldsForStep
                          }
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuratJaminanCompany;
