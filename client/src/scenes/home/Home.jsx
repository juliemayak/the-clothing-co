import "./home.scss";
import ShopList from "@/components/shop-list/ShopList";
import MainCarousel from "@/components/main-carousel/MainCarousel";
import Subscription from "@/components/subscription/Subscription";

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ShopList />
      {/* TODO: add subscribe logic */}
      <Subscription />
    </div>
  );
};

export default Home;
