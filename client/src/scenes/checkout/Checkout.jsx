import { Stepper, Step, StepLabel } from "@mui/material";
import Form from "@/components/form/Form";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import "./checkout.scss";

const Checkout = () => {
  const [activeCheckoutStep, setActiveCheckoutStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstCheckoutStep = activeCheckoutStep === 0;
  const isSecondCheckoutStep = activeCheckoutStep === 1;
  return (
    <div className="checkout">
      <Stepper activeStep={activeCheckoutStep} sx={{ m: "20px 0", width: "100%" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      {!isLoading && (
        <div className="checkout__form">
          <Form
            activeCheckoutStep={activeCheckoutStep}
            setActiveCheckoutStep={setActiveCheckoutStep}
            isFirstCheckoutStep={isFirstCheckoutStep}
            isSecondCheckoutStep={isSecondCheckoutStep}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      )}
      <CircularProgress
        sx={{
          display: isLoading ? "block" : "none",
        }}
      />
    </div>
  );
};

export default Checkout;
