import { motion } from "framer-motion";
import { fadeIn } from "../variants";
// import shape1 from "../assets/images/shape-01.webp";
import about1 from "../assets/images/about-1.png";
import about2 from "../assets/images/about-2.png";
import about3 from "../assets/images/about-3.png";

import AboutCard from "./AboutCard";

function About() {
  return (
    <div className="relative mt-16 phone:mt-2 mdphone:mt-4 mtab:mt-6 tablet:mt-8 btablet:mt-10 laptop:mt-0 py-16 phone:py-8 mtab:py-10 tablet:py-12 btablet:py-14 laptop:py-16">
      <motion.h1
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="z-[-1] absolute top-6 left-1/4 transform -translate-x-1/2 text-[#E6EAEC] font-bold text-6xl text-center leading-none"
      >
        what is golden delight
      </motion.h1>
      <div className="relative z-0 w-full flex justify-center">
        <p className="w-[600px] text-center text-4xl font-bold">About Us</p>
      </div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="relative z-[11] max-w-[1150px] m-auto grid grid-cols-3 phone:grid-cols-1 phone:justify-items-center mtab:grid-cols-2 laptop:grid-cols-3 gap-8 pt-10 phone:pt-0 mtab:pt-2 tablet:pt-4 btablet:pt-6 laptop:pt-10 z-[10] px-4"
      >
        <AboutCard
          image={about1}
          title="website development"
          description="The Service-Driven Approach (SDA) is focused on services as primary units of value creation, design, development and operation."
          buttonText="Learn More"
        />
        <AboutCard
          image={about2}
          title="mobile app development"
          description="Generation of data in accordance with an AI system that can forecast future demands for human resources in many fields."
          buttonText="Learn More"
        />
        <AboutCard
          image={about3}
          title="software as service"
          description="A comprehensive Platform integrating both data and services driven approaches."
          buttonText="Learn More"
        />
      </motion.div>
    </div>
  );
}

export default About;
