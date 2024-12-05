/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
const AboutCard = ({ title, description, buttonText, image, bg }) => {
  return (
    <div className="relative group z-10 max-w-sm bg-white shadow-sm rounded-lg overflow-hidden transition-all border">
      <div className="relative z-10 p-6 group-hover:cursor-pointer">
        <div className="flex justify-center mb-4 ">
          <div className={`p-4 rounded-3xl ${bg}`}>
            <img src={image} alt={title} className="h-[150px] w-[150px]" />
          </div>
        </div>
        <h2 className="capitalize text-[#2289FF] group-hover:text-tertiary font-colasta text-primary text-xl font-semibold mb-2 text-center">
          {title}
        </h2>
        <p className="text-[#949494] group-hover:text-tertiary text-[17px] mb-4 text-center py-2 px-[1px]">
          {description}
        </p>
      </div>
      <div className="absolute z-0 top-0 left-0 h-full w-full cursor-pointer"></div>
    </div>
  );
};

export default AboutCard;
