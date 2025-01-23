import React from "react";
import { useTranslation } from "react-i18next";

const StepNavigation = ({ currentStep, nextStep, prevStep }) => {
  const { t } = useTranslation();

  return (
    <div>
      <button onClick={prevStep} disabled={currentStep === 1}>
        {t("input.prev")}
      </button>
      <button onClick={nextStep} disabled={currentStep === 3}>
        {t("input.next")}
      </button>
    </div>
  );
};

export default StepNavigation;
