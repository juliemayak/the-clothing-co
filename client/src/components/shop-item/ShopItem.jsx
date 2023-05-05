import "./item.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/button/Button";
import ItemControls from "@/components/item-controls/ItemControls";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { addToCart } from "@/state/cart";
import { useNavigate } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "@/state/favs";

const ShopItem = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // highlights handling
  const highlights = useSelector((state) => state.fav.highlights);

  const [isFavItem, setIsFavItem] = useState(highlights.some((favItem) => favItem.id === item.id));

  const handleFavClick = () => {
    if (isFavItem) {
      setIsFavItem(false);
      dispatch(removeFromFavorites({ item }));
    } else {
      setIsFavItem(true);
      dispatch(addToFavorites({ item }));
    }
  };

  const [count, setCount] = useState(1);
  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  const handleItemClick = () => {
    navigate(`/item/${item.id}`);
  };

  const increaseItemCount = () => {
    setCount(count + 1);
  };

  const decreaseItemCount = () => {
    setCount(Math.max(count - 1, 1));
  };

  const handleAddToCart = () => dispatch(addToCart({ item: { ...item, count } }));

  const getCategory = () => {
    return category?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="item" style={{ width: `${width}` }}>
      <div className="item__image">
        <img onClick={handleItemClick} src={url} alt={name} />
        <div className="item__image-controls">
          <ItemControls
            handlePlusClick={increaseItemCount}
            handleMinusClick={decreaseItemCount}
            count={count}
          />
          <Button onClick={handleAddToCart} text="Add to cart" className="item__image-btn" />
        </div>
      </div>
      <div className="item__container">
        <p className="item__text _small">{getCategory()}</p>
        <p className="item__text">{name}</p>
        <div className="item__text-container">
          <p className="item__text _bold">${price}</p>
          <FavoriteBorderOutlinedIcon
            onClick={handleFavClick}
            sx={{
              cursor: "pointer",
              "&: hover": { opacity: "0.6" },
              fill: isFavItem ? "red" : "black",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
