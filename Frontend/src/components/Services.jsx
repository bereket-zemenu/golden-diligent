import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
// import shape1 from "../assets/images/shape-01.webp";
import icon1 from "../assets/images/icon-1.svg";
import icon2 from "../assets/images/icon-2.svg";
import icon3 from "../assets/images/icon-3.svg";
import icon4 from "../assets/images/icon-4.svg";
import icon5 from "../assets/images/icon-5.svg";
import icon6 from "../assets/images/icon-6.svg";

function Services() {
  const bg1 = "bg-[#DBD17A]";
  const bg2 = "bg-[#FBA67B]";
  const bg3 = "bg-[#638FC0]";
  const bg4 = "bg-[#60BE90]";
  const bg5 = "bg-[#F1C875]";
  const bg6 = "bg-[#789EAC]";
  return (
    <div className="relative mt-16 phone:mt-2 mdphone:mt-4 mtab:mt-6 tablet:mt-8 btablet:mt-10 laptop:mt-0 py-16 phone:py-8 mtab:py-10 tablet:py-12 btablet:py-14 laptop:py-16">
      <motion.h1
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="z-[-1] absolute top-6 left-1/4 transform -translate-x-1/2 text-[#E6EAEC] font-bold text-6xl text-center leading-none"
      >
        what golden delight provides
      </motion.h1>
      <div className="relative z-0 w-full flex justify-center">
        <p className="w-[600px] text-center text-4xl font-bold">
          key feaures and services
        </p>
      </div>
      <div className="w-full flex justify-center ">
        <p className="text-center max-w-xl text-[#949fa9]">
          Connects job seekers with employers based on skills and requirements,
          fostering meaningful employment opportunities.
        </p>
      </div>
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.5 }}
        className="relative z-[11] max-w-[1150px] m-auto grid grid-cols-3 phone:grid-cols-1 phone:justify-items-center mtab:grid-cols-2 laptop:grid-cols-3 gap-8 pt-10 phone:pt-0 mtab:pt-2 tablet:pt-4 btablet:pt-6 laptop:pt-10 z-[10] px-4"
      >
        <ServiceCard
          image={icon1}
          bg={bg1}
          title="Job Matching Facility"
          description="Connects job seekers with employers based on skills and requirements, fostering meaningful employment opportunities."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon2}
          bg={bg2}
          title="Interoperability"
          description="Facilitates seamless data exchange among various stakeholders, enabling comprehensive analysis and collaboration."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon3}
          bg={bg3}
          title="Service-Driven Approach"
          description="Offers a comprehensive range of career development services, including online examinations and advisory systems, to support individuals in their professional journey."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon4}
          bg={bg4}
          title="General technology consulting"
          description="Utilizes state-of-the-art biometrics for accurate and secure user identification, ensuring data integrity and privacy."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon5}
          bg={bg5}
          title="Enhanced Security"
          description="Harnesses the power of AI and statistical tools to forecast labor market trends, empowering policymakers and stakeholders with predictive insights."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon6}
          bg={bg6}
          title="Future Forecasting"
          description="Provides qualitative and quantitative labor market information for strategic planning and informed decision-making."
          buttonText="Learn More"
        />
      </motion.div>
    </div>
  );
}

export default Services;
