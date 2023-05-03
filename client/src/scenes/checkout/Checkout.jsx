import { Stepper, Step, StepLabel } from "@mui/material";
import Form from "@/components/form/Form";
import { useState } from "react";
import "./checkout.scss";

const Checkout = () => {
  const [activeCheckoutStep, setActiveCheckoutStep] = useState(0);
  const isFirstCheckoutStep = activeCheckoutStep === 0;
  const isSecondCheckoutStep = activeCheckoutStep === 1;
  return (
    <div className="checkout">
      <Stepper activeStep={activeCheckoutStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <div className="checkout__form">
        <Form
          activeCheckoutStep={activeCheckoutStep}
          setActiveCheckoutStep={setActiveCheckoutStep}
          isFirstCheckoutStep={isFirstCheckoutStep}
          isSecondCheckoutStep={isSecondCheckoutStep}
        />
      </div>
    </div>
  );
};

export default Checkout;
