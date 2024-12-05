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
        className="text-primary font-bold text-center capitalize text-4xl phone:text-xl mtab:text-2xl btablet:text-3xl laptop:text-4xl my-6 phone:my-2 tablet:my-4 laptop:my-6 mt-8"
      >
        Key features and services
      </motion.h1>
      <div className="w-full flex justify-center">
        <p className="w-[600px]">
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
          title="website development"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon2}
          bg={bg2}
          title="mobile app development"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon3}
          bg={bg3}
          title="software as service"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon4}
          bg={bg4}
          title="General technology consulting"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon5}
          bg={bg5}
          title="software development training"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
        <ServiceCard
          image={icon6}
          bg={bg6}
          title="software security tasting"
          description="we develop Web apps, and websites for companies and for individuals with SEO optimization, with Attractive UI/UX design, Responsive design."
          buttonText="Learn More"
        />
      </motion.div>
    </div>
  );
}

export default Services;
