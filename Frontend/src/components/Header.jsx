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
      {" "}
      <PageNav />
      {/* <Navbar /> */}
      <div className="max-w-[1200px] m-auto flex flex-col gap-2">
        <div className="flex">
          <p className="bg-[#2289FF]/15 text-[#2289FF] text-[14px] font-medium py-2 px-[11px] rounded-[5px] mt-28">
            Empowering Opportunity. Advancing Ethiopia.
          </p>
        </div>
        <motion.h1
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="font-semibold text-7xl w-[700px]"
        >
          Empowering Individuals, Businesses & Nations
        </motion.h1>
        <motion.p
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="text-[18px] text-[#949fa9] w-[750px] phone:text-[18px] mdphone:text-[18px] ptab:text-[19px] mtab:text-[20px] tablet:[22px] text-secondary leading-[1.36] mt-4"
        >
          The Ethiopian Labor Market Information System empowers individuals,
          businesses, and nations by connecting skilled Ethiopian workers with
          domestic and global employment opportunities, fostering economic
          growth and development.
        </motion.p>
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="relative z-[999] flex gap-4 mt-10 phone:mt-6 tablet:mt-6 laptop:mt-10"
        >
          <button className="flex items-center gap-2 bg-[#000080] opacity-[0.6]  px-8 py-2 rounded-lg">
            <p className="text-white font-semibold">Register</p>
            <MdOutlineArrowRightAlt color="white" size={25} />
          </button>
          <button className="flex items-center gap-2 bg-[#2289FF]/15 px-4 py-2 rounded-lg">
            <FaVideo size={30} color="yellow" />

            <p>National Job Portal ላይ እንዴት ሥራ ማግኘት እንደሚቻል ይመልከቱ።</p>
          </button>
        </motion.div>
      </div>
      <img
        src="/pic-1.svg"
        className="z-[999999] w-[350px] absolute -top-[20px] right-[270px]"
      />
      <img
        src="/pic-2.svg"
        className="z-[999999] w-[250px] absolute top-[120px] right-[10px]"
      />
      <img
        src="/pic-3.svg"
        className="z-[999999] w-[350px] absolute bottom-0 right-[0px]"
      />
      <img
        src="/pic-4.svg"
        className="z-[999999] w-[350px] absolute bottom-[60px] right-[350px]"
      />
    </div>
  );
}

export default Header;
