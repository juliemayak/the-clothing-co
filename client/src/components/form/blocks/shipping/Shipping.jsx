import { Checkbox, FormControlLabel } from "@mui/material";
import AddressForm from "../address-form/AddressForm";
import { useRef } from "react";
import gsap from "gsap";
import "./shipping.scss";

const Shipping = ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  const shippingFormRef = useRef();

  function toggleShippingForm() {
    const form = shippingFormRef.current;
    const tl = gsap.timeline();
    if (values.shippingAddress.isSameAddress) {
      tl.fromTo(
        form,
        {
          height: 0,
        },
        {
          duration: 0.7,
          height: "auto",
          ease: "power2.out",
        }
      );
      tl.fromTo(form, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "sine.out" }, 0.1);
    } else {
      tl.to(form, {
        height: 0,
        duration: 0.3,
        ease: "power1.out",
        overwrite: true,
      });
      tl.to(form, { autoAlpha: 0, duration: 0.2, overwrite: false }, 0);
    }
  }

  function handleCheckboxChange() {
    setFieldValue("shippingAddress.isSameAddress", !values.shippingAddress.isSameAddress);
    toggleShippingForm();
  }

  return (
    <div className="shipping">
      <div className="shipping__form">
        <p className="shipping__title">Billing Information</p>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </div>

      <div className="shipping__checkbox">
        <FormControlLabel
          label="Same for Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={handleCheckboxChange}
            />
          }
        />
      </div>

      <div
        ref={shippingFormRef}
        className={`shipping__form ${values.shippingAddress.isSameAddress ? "_closed" : ""}`}
      >
        <p className="shipping__title">Shipping Information</p>
        <AddressForm
          type="shippingAddress"
          values={values.shippingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Shipping;
