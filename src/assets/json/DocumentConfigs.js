export const documentConfigs = {
  SURAT_JAMINAN: {
    steps: [
      { id: 1, label: "Company data" },
      { id: 2, label: "Applicant data" },
      { id: 3, label: "Employee data" },
    ],
    fields: [
      { name: "company_logo", label: "Company Logo", type: "file", step: 1 },
      { name: "company_name", label: "Company Name", type: "text", step: 1 },
      {
        name: "company_address",
        label: "Company Address",
        type: "text",
        step: 1,
      },
      { name: "company_phone", label: "Company Phone", type: "text", step: 1 },
      { name: "company_email", label: "Company Email", type: "email", step: 1 },
      { name: "request_type", label: "Request Type", type: "text", step: 1 },
      { name: "date", label: "Date", type: "date", step: 1 },
      {
        name: "indonesian_city",
        label: "Indonesian City",
        type: "text",
        step: 1,
      },

      {
        name: "first_person_name",
        label: "First Person Name",
        type: "text",
        step: 2,
      },
      {
        name: "first_person_birthplace",
        label: "Birthplace",
        type: "text",
        step: 2,
      },
      {
        name: "first_person_birthdate",
        label: "Birthdate",
        type: "date",
        step: 2,
      },
      {
        name: "first_person_registration_address",
        label: "Address",
        type: "text",
        step: 2,
      },
      { name: "first_person_NIK", label: "NIK", type: "text", step: 2 },

      {
        name: "second_person_name",
        label: "Second Person Name",
        type: "text",
        step: 3,
      },
      {
        name: "second_person_birthplace",
        label: "Birthplace",
        type: "text",
        step: 3,
      },
      {
        name: "second_person_birthdate",
        label: "Birthdate",
        type: "date",
        step: 3,
      },
      {
        name: "second_person_nationality",
        label: "Nationality",
        type: "select",
        options: ["Indonesia", "USA", "UK"],
        step: 3,
      },
      {
        name: "second_person_passport_num",
        label: "Passport Number",
        type: "text",
        step: 3,
      },
    ],
  },

  SURAT_PENDUKUNG: {
    steps: [
      { id: 1, label: "Basic Info" },
      { id: 2, label: "Details" },
    ],
    fields: [
      {
        name: "applicant_name",
        label: "Applicant Name",
        type: "text",
        step: 1,
      },
      {
        name: "document_type",
        label: "Document Type",
        type: "select",
        options: ["ID", "Passport"],
        step: 1,
      },
      { name: "issue_date", label: "Issue Date", type: "date", step: 2 },
    ],
  },
};
