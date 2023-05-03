import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import "./confirmation.scss";

const Confirmation = () => {
  return (
    <div className="confirmation">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congratulations on Making your Purchase</strong>
      </Alert>
    </div>
  );
};

export default Confirmation;
