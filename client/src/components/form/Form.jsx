import Button from "@/components/button/Button";
import { Formik } from "formik";
import { checkoutSchema, formInitialValues } from "@/js/checkout-schema";
import Payment from "@/components/form/blocks/payment/Payment";
import Shipping from "@/components/form/blocks/shipping/Shipping";
import "./form.scss";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/state/cart";

const Form = ({
  activeCheckoutStep,
  setActiveCheckoutStep,
  isFirstCheckoutStep,
  isSecondCheckoutStep,
  setIsLoading,
}) => {
  const dispatch = useDispatch();
  const handleFormSubmit = async (values, actions) => {
    setActiveCheckoutStep(activeCheckoutStep + 1);

    // copy billing address to shipping address
    if (isFirstCheckoutStep && values.shippingAddress.isSameAddress) {
      const shippingAddressValues = {
        isSameAddress: true,
        ...values.billingAddress,
      };
      actions.setFieldValue("shippingAddress", shippingAddressValues);
    }

    if (isSecondCheckoutStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };
  const cart = useSelector((state) => state.cart.cart);
  const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

  async function makePayment(values) {
    setIsLoading(true);
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.shippingAddress.firstName, values.shippingAddress.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await dispatch(clearCart({}));
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    await setIsLoading(false);
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={formInitialValues}
      validationSchema={checkoutSchema[activeCheckoutStep]}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          {isFirstCheckoutStep && (
            <Shipping
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
          {isSecondCheckoutStep && (
            <Payment
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
          <div className="form__buttons">
            {!isFirstCheckoutStep && (
              <Button
                className="form__buttons-back"
                text="Back"
                onClick={() => setActiveCheckoutStep(activeCheckoutStep - 1)}
              />
            )}
            <Button type="submit" text={!isSecondCheckoutStep ? "Next" : "Place Order"} />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
