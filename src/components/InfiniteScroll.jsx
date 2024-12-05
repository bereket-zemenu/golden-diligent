import { motion } from "framer-motion";
import slide1 from "../assets/images/slide-1.jpg";
import slide2 from "../assets/images/slide-2.jpg";
import slide4 from "../assets/images/slide-4.jpg";
import slide5 from "../assets/images/slide-5.jpg";

const InfiniteImageScroll = () => {
  const images = [slide1, slide2, slide4, slide5];

  return (
    <div className="relative overflow-hidden relative w-full bg-white my-10 py-8">
      <div className="z-[999] absolute top-8 left-0 h-[85%] w-[5%] bg-white opacity-[0.25]"></div>
      <div className="z-[999] absolute top-8 right-0 h-[85%] w-[5%] bg-white opacity-[0.25]"></div>
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
          <div key={index} className="w-[312px] h-[361px] flex-shrink-0 mx-4">
            <img
              src={src}
              alt={`Slide ${index}`}
              loading="lazy"
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteImageScroll;
