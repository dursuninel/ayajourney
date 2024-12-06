import React from "react";

const StepNavigation = ({ currentStep, nextStep, prevStep }) => (
  <div>
    <button onClick={prevStep} disabled={currentStep === 1}>
      Geri
    </button>
    <button onClick={nextStep} disabled={currentStep === 3}>
      İleri
    </button>
  </div>
);

export default StepNavigation;
