import { motion } from "framer-motion";
import slide1 from "../assets/images/slide-1.jpg";
import slide2 from "../assets/images/slide-2.jpg";
import slide4 from "../assets/images/slide-4.jpg";
import slide5 from "../assets/images/slide-5.jpg";

const InfiniteImageScroll = () => {
  const images = [slide1, slide2, slide4, slide5];

  return (
    <div className="relative overflow-hidden w-full bg-white my-10 py-4 phone:py-4 mdphone:py-6 tablet:py-8 laptop:py-10">
      {/* Left and Right Gradient Overlay */}
      <div className="z-[10] absolute top-4 left-0 h-[80%] w-[10%] phone:w-[15%] mdphone:w-[12%] tablet:w-[8%] bg-white opacity-50"></div>
      <div className="z-[10] absolute top-4 right-0 h-[80%] w-[10%] phone:w-[15%] mdphone:w-[12%] tablet:w-[8%] bg-white opacity-50"></div>

      {/* Scrolling Image Container */}
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 50, // Adjust duration to control speed
          ease: "linear",
        }}
        style={{ whiteSpace: "nowrap" }}
      >
        {/* Map over the images array and duplicate for seamless looping */}
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-2 phone:mx-1 mdphone:mx-2 tablet:mx-4"
            style={{
              width: "100%",
              maxWidth: "312px", // Default
            }}
          >
            <img
              src={src}
              alt={`Slide ${index}`}
              loading="lazy"
              className="object-cover w-full h-[180px] phone:h-[200px] mdphone:h-[250px] tablet:h-[300px] laptop:h-[361px]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteImageScroll;
