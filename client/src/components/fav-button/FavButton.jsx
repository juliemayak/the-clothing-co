import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { addToFavorites, removeFromFavorites } from "@/state/favs";
import "./fav-button.scss";

const FavButton = ({ item, hasContent }) => {
  const highlights = useSelector((state) => state.fav.highlights);
  const [isFavItem, setIsFavItem] = useState(
    highlights?.some((favItem) => favItem?.id === Number(item.id))
  );
  const dispatch = useDispatch();

  const handleFavClick = () => {
    if (isFavItem) {
      setIsFavItem(false);
      dispatch(removeFromFavorites({ item }));
    } else {
      setIsFavItem(true);
      dispatch(addToFavorites({ item }));
    }
  };

  return (
    <div className="fav-button" onClick={handleFavClick}>
      <FavoriteBorderOutlinedIcon
        sx={{
          cursor: "pointer",
          "&:hover": { opacity: "0.6" },
          fill: isFavItem ? "red" : "black",
        }}
      />
      {hasContent && (
        <span>
          {!isFavItem && <span>add to wishlist</span>}
          {isFavItem && <span>added to wishlist</span>}
        </span>
      )}
    </div>
  );
};

export default FavButton;
