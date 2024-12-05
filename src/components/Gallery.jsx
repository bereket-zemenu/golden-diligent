import { motion } from "framer-motion";
import { fadeIn } from "../variants";
// import shape1 from "../assets/images/shape-01.webp";
import gallery1 from "../assets/images/gallery-1.jpg";
import gallery2 from "../assets/images/gallery-2.jpg";
import gallery3 from "../assets/images/gallery-3.jpg";
import gallery4 from "../assets/images/gallery-4.jpg";
import gallery5 from "../assets/images/gallery-5.jpg";
// import gallery6 from "../assets/images/gallery-6.jpg";

function Gallery() {
  return (
    <div className="relative mt-16 phone:mt-2 mdphone:mt-4 mtab:mt-6 tablet:mt-8 btablet:mt-10 laptop:mt-0 py-16 phone:py-8 mtab:py-10 tablet:py-12 btablet:py-14 laptop:py-16">
      <motion.h1
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="z-[-1] absolute top-6 left-[39%] transform -translate-x-1/2 text-[#E6EAEC] font-bold text-6xl text-center leading-none"
      >
        who we are
      </motion.h1>
      <div className="relative z-0 w-full flex justify-center">
        <p className="w-[600px] text-center text-4xl font-bold">Gallery</p>
      </div>
      <div className="w-full flex justify-center ">
        <p className="text-center max-w-xl text-[#949fa9] mb-[5rem]">
          Immerse yourself in the vibrant tapestry of LMIS, an innovation hub
          that embodies the transformative essence, and witness the profound
          impact it creates.
        </p>
      </div>
      <div className="max-w-[70rem] m-auto  grid grid-cols-5 grid-rows-3 gap-4">
        <div className="rounded-lg overflow-hidden">
          <img src={gallery1} className="object-cover h-full w-full" />
        </div>
        <div className="row-span-2">
          <img src={gallery2} className="object-cover h-full" />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={gallery3} className="object-cover h-full w-full" />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={gallery4} className="object-cover h-full w-full" />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={gallery5} className="object-cover h-full w-full" />
        </div>
        <div className="rounded-lg overflow-hidden">
          <img src={gallery3} className="object-cover h-full w-full" />
        </div>
        <div className="col-span-2 h-[200px] rounded-lg overflow-hidden">
          <img src={gallery4} className="object-cover w-full h-full" />
        </div>
        <div className="row-span-2 rounded-lg overflow-hidden">
          <img src={gallery5} className="object-cover h-full" />
        </div>
        <div className="col-span-2 h-[200px] rounded-lg overflow-hidden">
          <img src={gallery5} className="object-cover w-full h-full" />
        </div>
        <div className="col-span-2 h-[200px] rounded-lg overflow-hidden">
          <img src={gallery3} className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
