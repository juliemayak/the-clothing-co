import { Divider, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { increaseCount, decreaseCount, removeFromCart, setIsCartOpen } from "@/state";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import ItemControls from "@/components/item-controls/ItemControls";
import "./cart-menu.scss";

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((acc, item) => {
    acc += item.count * item.attributes.price;
    return acc;
  }, 0);

  const handleCheckoutBtnClick = () => {
    if (cart.length >= 1) {
      navigate("/checkout");
      dispatch(setIsCartOpen({}));
    }
  };

  const toggleCartMenu = () => dispatch(setIsCartOpen({}));

  return (
    <div className={`cart-menu${isCartOpen ? " _open" : ""}`}>
      <div className="cart-menu__overlay" />
      <div className="cart-menu__modal">
        <div className="cart-menu__container">
          <div className="cart-menu__header">
            <h3 className="cart-menu__header-title">shopping bag ({cart.length})</h3>
            <IconButton sx={{ right: "-12px", color: "#000" }} onClick={toggleCartMenu}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="cart-menu__body">
            {cart.map((item) => {
              const { id, count } = item;

              const { price, name, image, shortDescription } = item.attributes;

              const {
                data: {
                  attributes: {
                    formats: {
                      medium: { url },
                    },
                  },
                },
              } = image;
              return (
                <div key={`${name}-${item.id}`} className="cart-menu__item">
                  <div className="cart-menu__item-img">
                    <img alt={name} src={`${import.meta.env.VITE_BASE_URL}${url}`} />
                  </div>
                  <div className="cart-menu__item-description">
                    <div className="cart-menu__item-header">
                      <p className="cart-menu__item-text">{name}</p>
                      <IconButton
                        onClick={() => dispatch(removeFromCart({ id: id }))}
                        sx={{ right: "-12px" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <p className="cart-menu__item-text">{shortDescription}</p>
                    <div className="cart-menu__item-footer">
                      <div className="cart-menu__item-footer-cotrols">
                        <ItemControls
                          handleMinusClick={() => dispatch(decreaseCount({ id: id }))}
                          handlePlusClick={() => dispatch(increaseCount({ id: id }))}
                          count={count}
                        />{" "}
                      </div>
                      <p className="cart-menu__item-text">
                        ${price} x {count}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Divider />
          </div>
          <div className="cart-menu__footer">
            <div className="cart-menu__footer-container">
              <p className="cart-menu__footer-text">subtotal</p>
              <p className="cart-menu__footer-text">${totalPrice}</p>
            </div>
            <Button
              onClick={handleCheckoutBtnClick}
              text="checkout"
              isDisabled={cart.length === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
