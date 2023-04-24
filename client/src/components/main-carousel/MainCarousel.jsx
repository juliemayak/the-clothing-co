import "./main-carousel.scss";
import { IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const importAll = async (files) => {
  const images = {};
  for (const path in files) {
    if (files.hasOwnProperty(path)) {
      const file = await files[path]();
      images[path.replace("./", "")] = file.default || file;
    }
  }
  return images;
};

const heroTextureImports = await importAll(
  import.meta.glob("@/assets/images/*.{png,jpg,jpeg,svg}")
);

const MainCarousel = () => {
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            height: "100%",
            top: "0",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            borderRadius: "0",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            height: "100%",
            top: "0",
            borderRadius: "0",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <div key={`carousel-image-${index}`} className="carousel__container">
          <img className="carousel__image" src={texture} alt={`carousel-${index}`} />
          <div className="carousel__description">
            <p className="carousel__description-text">New items</p>
            <h1 className="carousel__description-title">Summer Sale</h1>
            {/* TODO: add link/ref */}
            <p className="carousel__description-link">Discover More</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
