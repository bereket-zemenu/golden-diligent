import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import MapComponent from "./MapComponent";

function Locations() {
  return (
    <div className="relative">
      <motion.h1
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="z-[-1] absolute top-[-40px] left-1/4 transform -translate-x-1/2 text-[#E6EAEC] font-bold text-6xl text-center leading-none"
      >
        Discover golden delight
      </motion.h1>
      <div className="relative z-0 w-full flex justify-center">
        <p className="w-[600px] text-center text-4xl font-bold">
          golden delight Location
        </p>
      </div>
      <div className="w-full flex justify-center ">
        <p className="text-center max-w-xl text-[#949fa9]">
          OSSC registration centers become beacons of hope. Explore the map
          section to uncover the locations of LMIS registration centers, where
          transformative change takes shape.
        </p>
      </div>
      <MapComponent />
    </div>
  );
}

export default Locations;
