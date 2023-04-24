import CartMenu from "@/components/cart-menu/CartMenu";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import "./layout.scss";

const Layout = (props) => {
  return (
    <div className="layout container">
      <Navigation />
      {props.children}
      <CartMenu />
      <Footer />
    </div>
  );
};

export default Layout;
