import React from "react";
import Select from "react-select";

export const SelectField = (
  id,
  type,
  handleSelectChange,
  options,
  formData
) => {
  return (
    <Select
      id={id}
      value={options.find((option) => option.value === formData.type)}
      onChange={(selectedOption) => handleSelectChange(selectedOption, type)}
      options={options}
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
  );
};
