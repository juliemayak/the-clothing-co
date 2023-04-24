import "./subscription.scss";
import { InputBase, Divider, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";

const Subscription = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="subscription">
      <IconButton sx={{ pointerEvents: "none" }}>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <h3 className="subscription__title">Stay Updated</h3>
      <p className="subscription__text">
        on our latest arrivals and promotions by subscribing to our newsletter.
      </p>
      <div className="subscription__input-container">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <p className="subscription__input-text">Subscribe</p>
      </div>
    </div>
  );
};

export default Subscription;
