import { useSelector, useDispatch } from "react-redux";
import { removeAllFavorites } from "@/state/favs";
import ShopItem from "@/components/shop-item/ShopItem";
import Button from "@/components/button/Button";
import "./highlights.scss";

const Highlights = () => {
  const highlights = useSelector((state) => state.fav.highlights);
  const dispatch = useDispatch();
  const handleRemoveAllItems = () => {
    dispatch(removeAllFavorites());
  };

  return (
    <div className="highlights">
      <h3 className="highlights__title">Highlights</h3>
      {highlights.length >= 2 && (
        <Button text="clear all" onClick={handleRemoveAllItems} className="highlights__btn" />
      )}
      <div className="highlights__container">
        {highlights.length === 0 && <p>There are no highlighted items yet.</p>}
        {highlights.length >= 1 &&
          highlights.map((highlight) => <ShopItem key={highlight.id} item={highlight} />)}
      </div>
    </div>
  );
};

export default Highlights;
