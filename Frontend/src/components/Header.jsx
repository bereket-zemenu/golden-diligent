// import Link from "./Link";
import PageNav from "./PageNav";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
// import MySvg from "../assets/images/pic-1.svg";

// import Navbar from "./Navbar";
// import cube from "../assets/images/cube.png";

function Header() {
  return (
    <div className="relative h-screen overflow-hidden">
      <PageNav />
      <div className="max-w-[1200px] mx-auto flex flex-col gap-2 px-4">
        {/* Tagline */}
        <div className="flex">
          <p className="bg-[#2289FF]/15 text-[#2289FF] text-[14px] mdphone:text-[12px] ptab:text-[14px] font-medium py-2 px-[11px] rounded-[5px] mt-20 tablet:mt-28">
            Empowering Opportunity. Advancing Ethiopia.
          </p>
        </div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="font-semibold text-4xl mdphone:text-5xl tablet:text-6xl laptop:text-7xl leading-tight phone:w-[90%] tablet:w-[700px]"
        >
          Empowering Individuals, Businesses & Nations
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-[16px] mdphone:text-[17px] tablet:text-[18px] laptop:text-[20px] text-[#949fa9] leading-[1.5] mt-4 phone:w-[95%] tablet:w-[750px]"
        >
          The Ethiopian Labor Market Information System empowers individuals,
          businesses, and nations by connecting skilled Ethiopian workers with
          domestic and global employment opportunities, fostering economic
          growth and development.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="relative z-[999] flex flex-col phone:flex-row gap-4 mt-6 tablet:mt-8 laptop:mt-10"
        >
          <button className="flex items-center justify-center gap-2 bg-[#000080] opacity-[0.6] px-6 py-2 rounded-lg text-sm mdphone:text-base">
            <p className="text-white font-semibold">Register</p>
            <MdOutlineArrowRightAlt color="white" size={20} />
          </button>
          <button className="flex items-center gap-2 bg-[#2289FF]/15 px-4 py-2 rounded-lg text-sm mdphone:text-base">
            <FaVideo size={25} color="yellow" />
            <p>National Job Portal ላይ እንዴት ሥራ ማግኘት እንደሚቻል ይመልከቱ።</p>
          </button>
        </motion.div>
      </div>

      {/* Images */}
      <img
        src="/pic-1.svg"
        className="z-[999999] w-[150px] phone:w-0 tablet:w-[250px] laptop:w-[350px] absolute -top-[10px] right-[50px] tablet:right-[100px] laptop:right-[270px]"
      />
      <img
        src="/pic-2.svg"
        className="z-[999999] w-[100px] phone:w-[150px] phone:w-[100px] tablet:w-[200px] laptop:w-[250px] absolute top-[50px] phone:top-[80px] right-[10px] phone:right-0"
      />
      <img
        src="/pic-3.svg"
        className="z-[999999] w-[150px] phone:w-[200px] phone:w-0 tablet:w-[300px] laptop:w-[350px] absolute bottom-0 right-[0px] phone:right-0"
      />
      <img
        src="/pic-4.svg"
        className="z-[999999] w-[150px] phone:w-[200px] phone:bottom-[31%] phone:right-0 tablet:w-[300px] laptop:w-[350px] absolute bottom-[20px] tablet:bottom-[40px] laptop:bottom-[20px] right-[50px] laptop:right-[350px] "
      />
    </div>
  );
}

export default Header;
