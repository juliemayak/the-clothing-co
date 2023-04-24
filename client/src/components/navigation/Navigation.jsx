import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "@/state";
import { useNavigate } from "react-router-dom";

import "./navigation.scss";

import { Badge, IconButton } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import Logo from "../svg/Logo.jsx";

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className="nav container">
      <div onClick={() => navigate("/")} className="nav__logo">
        <Logo />
      </div>
      <div className="nav__controls">
        <IconButton sx={{ color: "black" }}>
          <SearchOutlined />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <PersonOutline />
        </IconButton>

        <Badge
          badgeContent={cart.length}
          color="secondary"
          invisible={cart.length === 0}
          sx={{
            "& .MuiBadge-badge": {
              right: 5,
              top: 5,
              padding: "0 4px",
              height: "14px",
              minWidth: "13px",
            },
          }}
        >
          <IconButton sx={{ color: "black" }} onClick={() => dispatch(setIsCartOpen({}))}>
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>

        {/* <div className="nav__controls _mobile">
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>*/}
      </div>
    </div>
  );
};

export default Navigation;
