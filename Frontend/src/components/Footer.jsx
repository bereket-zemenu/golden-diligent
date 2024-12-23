import { IoHeadsetSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="relative bg-[#0b1727] mt-10 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-10 lg:space-y-0">
          {/* Left Section */}
          <div className="w-full flex-1">
            <img
              src="/logo.png" // Replace with your logo path
              alt="E-LMIS Logo"
              className="h-10 mb-4"
            />
            <p className="text-gray-400 text-sm mb-6">
              Illuminating pathways to success - Unleashing a world of
              opportunities, empowering entrepreneurs, and driving sustainable
              economic growth.
            </p>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Subscribe now"
                className="px-6 py-4 bg-gray-800 rounded-md text-sm w-2/3 border-none outline-none focus:outline-blue-900"
              />
              <button className="absolute right-0 lg:right-[34%] bg-blue-600 px-4 py-[13px] rounded-md text-sm font-medium hover:bg-blue-500 text-white">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Right Sections */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            {/* Customer Service */}
            <div>
              <h4 className="font-semibold mb-6 text-white text-[17px]">
                Customer Service
              </h4>
              <ul className="space-y-2">
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Contact
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Our Guarantee
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Help page
                </li>
              </ul>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6 text-white text-[17px]">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Testimonials
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Contact
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  Locations
                </li>
              </ul>
            </div>
            {/* My Accounts */}
            <div>
              <h4 className="font-semibold mb-6 text-white text-[17px]">
                My Accounts
              </h4>
              <ul className="space-y-2">
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  My Account
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  My Profile
                </li>
                <li className="text-[#6B7280] hover:text-white cursor-pointer text-[15px]">
                  FAQ
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute phone:bottom-[15%] tablet:bottom-[25%] h-[1.5px] w-[90%] bg-gray-400 left-1/2 transform -translate-x-1/2"></div>
        <div className="mt-8 pt-4 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 GOLDEN DILIGENT. All rights reserved.
            </p>
            <div className="space-x-4 text-sm text-gray-400">
              <a href="#">Terms & conditions</a>
              <a href="#">Privacy policy</a>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="z-[1] absolute w-[80%] md:w-[50%] lg:w-[31%] -top-[80px] right-0 bg-blue-600 p-4 polygon">
          <div className="pl-4 md:pl-12 flex gap-4 items-center">
            <IoHeadsetSharp
              size={50}
              color="white"
              className="p-4 bg-black rounded-3xl"
            />
            <div className="flex flex-col">
              <p className="text-white text-sm font-medium font-Poppins">
                Get in touch
              </p>
              <p className="text-white text-lg font-bold font-Poppins">
                0968247189
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#0b1727] z-[0] absolute w-[90%] md:w-[60%] lg:w-[35%] h-[50px] -top-[50px] right-0 polygon-1"></div>
      </div>
    </footer>
  );
};

export default Footer;
