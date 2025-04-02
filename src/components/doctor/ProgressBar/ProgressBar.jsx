import React from "react";
import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

export const ProgressBar = ({ currentStep, steps }) => {
  const currentStepLabel = steps[currentStep - 1]?.label || "Current Step";
  const nextStepLabel = steps[currentStep]?.label || "Finish";

  return (
    <div>
      <div className="progress-bar-desktop">
        {steps.map((step, index) => (
          <div className="progress-step" key={step.id}>
            <a
              className={`${
                currentStep >= step.id
                  ? "breadcrumb-item"
                  : "breadcrumb-item active"
              }`}
            >
              {step.label}
            </a>
            {index < steps.length - 1 && (
              <div className="breadcrumb-separator">
                <FeatherIcon icon="chevron-right" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="progress-bar-mobile">
        <div className="progress-circle">
          <span className="progress-text">
            {currentStep} of {steps.length}
          </span>
        </div>
        <div className="progress-info">
          <div className="progress-label">{currentStepLabel}</div>
          <div className="progress-next">Next: {nextStepLabel}</div>
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
