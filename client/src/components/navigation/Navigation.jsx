import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "@/state/cart";
import { useNavigate } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import { useRef } from "react";
import { PersonOutline, ShoppingBagOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import Logo from "@/components/svg/Logo";
import Dropdown from "@/js/dropdown";
import "./navigation.scss";

const Navigation = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);

  !isLoading && new Dropdown();

  const cart = useSelector((state) => state.cart.cart);
  const handleHighlightsClick = () => {
    navigate("/highlights");
  };
  const handleCartMenuClick = () => dispatch(setIsCartOpen());

  const handleUserAuth = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
  };

  const handleUsernameClick = () => {
    navigate(`/user/${user.nickname}`);
  };

  return (
    <div className="nav container">
      <div onClick={() => navigate("/")} className="nav__logo">
        <Logo />
      </div>
      <div className="nav__controls">
        <IconButton sx={{ color: "black" }} onClick={handleHighlightsClick}>
          <FavoriteBorderOutlined />
        </IconButton>
        <div className="nav__user-btn" data-dropdown-btn>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>
          <div ref={dropdownRef} className="nav__user-menu" data-dropdown-list>
            {isAuthenticated ? (
              <>
                <div className="nav__user-menu-item" onClick={handleUsernameClick}>
                  {user.nickname}
                </div>
                <div className="nav__user-menu-item" onClick={handleUserAuth}>
                  log out
                </div>
              </>
            ) : (
              <div className="nav__user-menu-item" onClick={handleUserAuth}>
                log in | sign up
              </div>
            )}
          </div>
        </div>

        <Badge
          badgeContent={cart?.length}
          color="secondary"
          invisible={cart?.length === 0}
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
          <IconButton sx={{ color: "black" }} onClick={handleCartMenuClick}>
            <ShoppingBagOutlined />
          </IconButton>
        </Badge>
      </div>
    </div>
  );
};

export default Navigation;
