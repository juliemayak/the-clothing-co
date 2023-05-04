import React, { useEffect, useState } from "react";
import "./shop-list.scss";
import ShopItem from "@/components/shop-item/ShopItem";
import { Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "@/state/cart";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShopList = () => {
  const isNonMobile = useMediaQuery("(min-width:480px)");

  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("all");
  const items = useSelector((state) => state.cart.items);

  const handleTabChange = (e, val) => setTabValue(val);

  function getItems() {
    return fetch(`${import.meta.env.VITE_BASE_URL}/api/items?populate=image`, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        const items = json.data;
        dispatch(setItems(items));
      });
  }

  useEffect(() => {
    getItems();
  }, []);

  const categories = items.reduce(
    (accumulator, item) => {
      const category = item.attributes.category;
      if (category) {
        accumulator[category].push(item);
      }
      accumulator["all"].push(item);
      return accumulator;
    },
    { all: [], topRated: [], newArrivals: [], bestSellers: [] }
  );

  return (
    <div className="shop">
      <h3 className="shop__title">
        Our featured <b>products</b>
      </h3>
      <Tabs
        textColor="inherit"
        value={tabValue}
        onChange={handleTabChange}
        centered
        sx={{
          mb: "25px",
          "& .MuiTabs-flexContainer": {
            flexDirection: isNonMobile ? "row" : "column",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#000",
          },
        }}
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
      >
        {Object.keys(categories).map((category) => {
          const categoryName = category.replace(/([a-z])([A-Z])/g, "$1 $2");
          const categoryItems = categories[category];
          const shouldRenderTab = category === "all" || categoryItems.length > 0;
          return shouldRenderTab && <Tab key={category} label={categoryName} value={category} />;
        })}
      </Tabs>
      <div className="shop__list">
        {categories[tabValue].map((item) => (
          <ShopItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopList;
