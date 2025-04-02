import React from "react";
import PropTypes from "prop-types";

export const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required,
  className,
}) => {
  return (
    <div>
      {label && (
        <label>
          {label} {required ? <span className="login-danger">*</span> : ""}
        </label>
      )}
      <input
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        {...(type === "file" ? {} : { value })}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.any,
  errors: PropTypes.any,
};
