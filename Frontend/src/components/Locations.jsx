import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import MapComponent from "./MapComponent";

function Locations() {
  return (
    <div className="relative px-4 phone:px-2 py-8" id="location">
      {/* Heading Section */}
      <motion.h1
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="z-[-1] absolute top-[-40px] left-1/3 transform -translate-x-1/2 text-[#E6EAEC] font-bold text-6xl phone:text-4xl mdphone:text-5xl text-center leading-none"
      >
        Discover golden delight
      </motion.h1>

      {/* Subheading Section */}
      <div className="relative z-0 w-full flex justify-center">
        <p className="w-[600px] phone:w-auto px-2 text-center text-4xl phone:text-2xl mdphone:text-3xl font-bold">
          golden delight Location
        </p>
      </div>

      {/* Description Section */}
      <div className="w-full flex justify-center mt-4">
        <p className="text-center max-w-xl phone:max-w-xs text-[#949fa9] text-base phone:text-sm leading-relaxed">
          OSSC registration centers become beacons of hope. Explore the map
          section to uncover the locations of LMIS registration centers, where
          transformative change takes shape.
        </p>
      </div>

      {/* Map Component */}
      <MapComponent />
    </div>
  );
}

export default Locations;
