/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
const ServiceCard = ({ title, description, buttonText, image, bg }) => {
  return (
    <div className="relative group z-10 max-w-sm bg-white shadow-md rounded-lg overflow-hidden transition-all border">
      <div className="relative z-10 p-6 group-hover:cursor-pointer">
        <div className="flex justify-left mb-4 ">
          <div className={`p-4 rounded-3xl ${bg}`}>
            <img src={image} alt={title} className="h-[50px] w-[50px]" />
          </div>
        </div>
        <h2 className="capitalize text-primary group-hover:text-tertiary font-colasta text-primary text-lg font-semibold mb-2 text-left">
          {title}
        </h2>
        <p className="text-secondary text-[#63757CCC] group-hover:text-tertiary text-[13px] mb-4 text-left py-2">
          {description}
        </p>
      </div>
      <div className="absolute z-0 top-0 left-0 h-full w-full cursor-pointer"></div>
    </div>
  );
};

export default ServiceCard;
