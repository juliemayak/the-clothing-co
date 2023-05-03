import { Checkbox, FormControlLabel } from "@mui/material";
import AddressForm from "../address-form/AddressForm";
import "./shipping.scss";

const Shipping = ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => {
  function handleCheckboxChange() {
    setFieldValue("shippingAddress.isSameAddress", !values.shippingAddress.isSameAddress);
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
        className={`shipping__form ${values.shippingAddress.isSameAddress ? "_closed" : "_open"}`}
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
