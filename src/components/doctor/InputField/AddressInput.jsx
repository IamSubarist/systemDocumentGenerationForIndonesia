import React, { useState, useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

const AddressInput = ({ formData, setFormData }) => {
  const [inputValue, setInputValue] = useState(formData.company_address || "");
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.formatted_address) {
      setInputValue(place.formatted_address);
      setFormData((prev) => ({
        ...prev,
        company_address: place.formatted_address,
      }));
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceSelect}
    >
      <input
        type="text"
        placeholder="Введите адрес"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </Autocomplete>
  );
};

export default AddressInput;
