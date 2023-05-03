import { getIn } from "formik";
import TextField from "@mui/material/TextField";
import "./address-form.scss";

const AddressForm = ({ type, values, errors, touched, handleBlur, handleChange }) => {
  const formattedName = (field) => `${type}.${field}`;
  const formattedError = (field) =>
    Boolean(getIn(touched, formattedName(field)) && getIn(errors, formattedName(field)));

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  const textFields = [
    {
      label: "First Name",
      value: "firstName",
      gridValue: "span 2",
    },
    {
      label: "Last Name",
      value: "lastName",
      gridValue: "span 2",
    },
    {
      label: "Country",
      value: "country",
      gridValue: "span 4",
    },
    {
      label: "Street Address",
      value: "street1",
      gridValue: "span 2",
    },
    {
      label: "Street Address 2 (optional)",
      value: "street2",
      gridValue: "span 2",
    },
    {
      label: "City",
      value: "city",
      gridValue: "span 2",
    },
    {
      label: "State",
      value: "state",
      gridValue: "1fr",
    },
    {
      label: "Zip Code",
      value: "zipCode",
      gridValue: "1fr",
    },
  ];

  return (
    <div className="address-form">
      {textFields.map(({ label, value, gridValue }) => (
        <TextField
          key={formattedName(value)}
          fullWidth
          type="text"
          label={label}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.value}
          name={formattedName(value)}
          error={formattedError(value)}
          helperText={formattedHelper(value)}
          sx={{ gridColumn: gridValue }}
        />
      ))}
    </div>
  );
};

export default AddressForm;
