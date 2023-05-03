import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import Checkout from "./scenes/checkout/Checkout";
import ItemDetails from "./scenes/item-details/ItemDetails";
import Confirmation from "./scenes/checkout/confirmation/Confirmation";
import Layout from "./components/layout/Layout";
import "./reset.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<Confirmation />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
