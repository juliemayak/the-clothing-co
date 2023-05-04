import { useSelector } from "react-redux";
import ShopItem from "@/components/shop-item/ShopItem";
import "./highlights.scss";

const Highlights = () => {
  const highlights = useSelector((state) => state.fav.highlights);

  return (
    <div className="highlights">
      <h3 className="highlights__title">Highlights</h3>
      <div className="highlights__container">
        {highlights.length === 0 && <p>There are no highlighted items yet.</p>}
        {highlights.length >= 1 &&
          highlights.map((highlight) => <ShopItem key={highlight.id} item={highlight} />)}
      </div>
    </div>
  );
};

export default Highlights;
