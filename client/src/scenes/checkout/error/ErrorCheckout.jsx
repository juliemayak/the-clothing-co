import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Confirmation = () => {
  return (
    <div className="error">
      <Alert severity="error">
        <AlertTitle>Payment Error</AlertTitle>
        The payment has failed — <strong>Please try making your order again</strong>
      </Alert>
    </div>
  );
};

export default Confirmation;
