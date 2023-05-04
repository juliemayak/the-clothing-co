import { Divider } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ShopItem from "@/components/shop-item/ShopItem";
import ItemControls from "@/components/item-controls/ItemControls";
import Button from "@/components/button/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/state/cart";
import { addToFavorites } from "@/state/favs";

import "./item-details.scss";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [tabValue, setTabValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleActiveTabChange = (_event, newValue) => {
    setTabValue(newValue);
  };

  const getItem = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}/api/items/${itemId}?populate=image`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        const item = json.data;
        setItem(item);
      });
  };

  const getItems = () => {
    return fetch(`${import.meta.env.VITE_BASE_URL}/api/items?populate=image`, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        const items = json.data;
        setItems(items);
      });
  };

  const handlePlusClick = () => setCount(count + 1);
  const handleMinusClick = () => setCount(Math.max(count - 1, 1));
  const handleButtonClick = () => {
    dispatch(addToCart({ item: { ...item, count } }));
  };
  const handleFavClick = () => {
    dispatch(addToFavorites({ item: { ...item } }));
    console.log("first", item);
  };

  const getCategory = (text) =>
    text?.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  const relatedItems = items
    .filter(
      (shopItem) =>
        shopItem.attributes.category === item.attributes.category && shopItem.id !== item.id
    )
    .slice(0, 4);

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);

  return (
    <div className="item-details">
      <div className="item-details__item">
        <div className="item-details__item-img">
          <img
            alt={item?.name}
            src={`${import.meta.env.VITE_BASE_URL}${
              item?.attributes?.image?.data?.attributes?.formats?.medium?.url
            }`}
          />
        </div>

        <div className="item-details__item-info">
          <div className="item-details__item-header">More about the Item</div>

          <div className="item-details__item-description">
            <h3 className="item-details__item-name">{item?.attributes?.name}</h3>
            <p className="item-details__item-price">${item?.attributes?.price}</p>
            <p className="item-details__item-text">{item?.attributes?.description}</p>
          </div>

          <div className="item-details__item-purchase">
            <div className="item-details__item-controls">
              <ItemControls
                handlePlusClick={handlePlusClick}
                handleMinusClick={handleMinusClick}
                count={count}
              />
            </div>
            <Button
              text="add to cart"
              className="item-details__item-button"
              onClick={handleButtonClick}
            />
          </div>
          <div>
            <div className="item-details__item-wishlist" onClick={handleFavClick}>
              <FavoriteBorderOutlinedIcon />
              <span>add to wishlist</span>
            </div>
            <p className="item-details__item-category">
              CATEGORY: {getCategory(item?.attributes?.category)}
            </p>
          </div>
        </div>
      </div>

      <div className="item-details__tabs">
        <Tabs value={tabValue} onChange={handleActiveTabChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </div>
      <div className="item-details__tabs-content">
        {tabValue === "description" && (
          <div className="item-details__tabs-content-text">{item?.attributes?.longDescription}</div>
        )}
        {tabValue === "reviews" && (
          <div className="item-details__tabs-content-list">No reviews yet</div>
        )}
      </div>
      <Divider />

      <div className="item-details__products">
        <h3 className="item-details__products-title">Related Products</h3>
        <div className="item-details__products-list">
          {relatedItems.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
