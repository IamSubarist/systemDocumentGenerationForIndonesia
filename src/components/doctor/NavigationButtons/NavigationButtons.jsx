import PropTypes from "prop-types";
import React from "react";

export const NavigationButtons = ({
  currentStep,
  nextStep,
  prevStep,
  handleSubmit,
  validateRequiredFieldsForStep,
  totalSteps,
}) => {
  const isFinalStep = currentStep === totalSteps;

  const handleNext = () => {
    if (validateRequiredFieldsForStep()) {
      nextStep();
    }
  };

  const handleSubmitClick = (e) => {
    if (e) e.preventDefault();
    if (validateRequiredFieldsForStep()) {
      handleSubmit(e);
    }
  };

  return (
    <div
      className="col-12"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
      }}
    >
      <div
        className="doctor-submit"
        style={{ display: "flex", flexDirection: "row", gap: "10px" }}
      >
        {currentStep > 1 && (
          <button
            onClick={prevStep}
            type="button"
            className="btn btn-primary cancel-form"
          >
            Back
          </button>
        )}

        {isFinalStep ? (
          <button
            type="button"
            className="btn btn-primary submit-form"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            type="button"
            className="btn btn-primary submit-form"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

NavigationButtons.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.any,
  validateRequiredFieldsForStep: PropTypes.any,
};
