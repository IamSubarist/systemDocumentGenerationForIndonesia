import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { InputField } from "./InputField";

const API_KEY = "pk.3facf9d47dcbee33061c3d11cc013167";

const CompanyAddressInput = ({ formData, handleChange, errors }) => {
  const [query, setQuery] = useState(formData.company_address || "");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    handleChange(event, null, null, "company_address");

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.locationiq.com/v1/autocomplete.php`,
          {
            params: {
              key: API_KEY,
              q: value,
              format: "json",
              "accept-language": "en",
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Ошибка получения адресов:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (address) => {
    setQuery(address);
    setSuggestions([]);
    handleChange(
      { target: { name: "company_address", value: address } },
      null,
      null,
      "company_address"
    );
  };

  return (
    <div className="address-input-container" style={{ position: "relative" }}>
      <InputField
        required
        className={`form-control ${errors.company_address ? "is-invalid" : ""}`}
        label="Company address"
        name="company_address"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul
          className="suggestions-list"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderTop: "none",
            zIndex: 1000,
            marginTop: "4px",
            padding: "0",
            listStyle: "none",
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={`${item.place_id}-${index}`}
              onClick={() => handleSelect(item.display_name)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyAddressInput;

CompanyAddressInput.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any,
  formData: PropTypes.any,
  handleChange: PropTypes.any,
  errors: PropTypes.any,
};
