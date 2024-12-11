import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AutoSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4", "Slide 5"];

  return (
    <div className="mx-auto mt-8 max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-4">
        Infinite Autoplay Slider
      </h2>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <h3 className="text-center p-6 bg-gray-200 rounded shadow-md">
              {slide}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AutoSlider;
