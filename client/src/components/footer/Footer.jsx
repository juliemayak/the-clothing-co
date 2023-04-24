import "./footer.scss";

function Footer() {
  const footerData = [
    {
      name: "About",
      links: [
        {
          name: "Careers",
          link: "/",
        },
        {
          name: "Our Stores",
          link: "/",
        },
        {
          name: "Terms & Conditions",
          link: "/",
        },
        {
          name: "Privacy Policy",
          link: "/",
        },
      ],
    },
    {
      name: "Customer Care",
      links: [
        {
          name: "Help Center",
          link: "/",
        },
        {
          name: "Track Your Order",
          link: "/",
        },
        {
          name: "Corporate & Bulk Purchasing",
          link: "/",
        },
        {
          name: "Returns & Refunds",
          link: "/",
        },
      ],
    },
    {
      name: "Contact Us",
      links: [
        {
          name: "123 Main Street, Anytown USA 12345.",
        },
        {
          name: "Email: juliemayak2@gmail.com",
        },
        {
          name: "Tel: (555) 123-4567",
        },
      ],
    },
  ];
  return (
    <div className="footer">
      <div className="footer__container container">
        <div className="footer__about">
          <h4 className="footer__about-title">&copy; 2023 The Clothing Co.</h4>
          <div className="footer__about-text">
            We offer a wide selection of stylish and high-quality clothing for men and women, as
            well as accessories to complete your look. Our mission is to provide our customers with
            exceptional service and a seamless online shopping experience. From trendy pieces to
            wardrobe staples, we've got you covered.
          </div>
        </div>

        <ul className="footer__links-container">
          {footerData.map((column) => {
            const footerLinks = column.links.map(({ name, link }) => (
              <li className="footer__links-item">{link ? <a href={link}>{name}</a> : name}</li>
            ));
            return (
              <div className="footer__links">
                <h4 className="footer__links-title">{column.name}</h4>
                {footerLinks}
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
