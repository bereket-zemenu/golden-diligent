import { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import MyAnimation from "./MyAnimation";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-[63%] h-[85%] m-auto flex gap-2">
        {/* Left Section */}
        <div className="relative w-1/2 bg-white flex flex-col items-center p-8 pt-16 rounded-lg">
          <div className="absolute bottom-[165px] w-[72%] p-[1px] bg-gray-200"></div>

          <h2 className="text-xl font-bold mb-2 text-blue-500 font-Poppins">
            Login
          </h2>
          <p className="mb-6 text-sm text-gray-400">
            Don&apos;t You Have An Account?{" "}
            <span className="text-blue-500">Sign Up</span>
          </p>
          <form className="space-y-4 w-80">
            <div>
              {/* <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label> */}
              <div className="relative flex items-center border border-blue-500 rounded-sm">
                <span className="absolute left-2 pr-3 text-gray-600">+251</span>
                <input
                  type="text"
                  id="phone"
                  placeholder="PhoneNumber"
                  className="pl-[60px] w-full py-1 px-3 focus:outline-none "
                />
              </div>
            </div>
            <div className="relative">
              {/* <IoEyeOffOutline className="absolute right-5 top-1/2 transform -translate-y-1/2" /> */}

              {isOpen ? (
                <HiEye
                  onClick={() => setIsOpen(!isOpen)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <HiEyeOff
                  onClick={() => setIsOpen(!isOpen)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              )}
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full border border-blue-500 rounded-sm py-1 px-3 focus:outline-none"
              />
            </div>
            <p className="text-right text-[10px] text-blue-800">
              Forgot Password?
            </p>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          <div className="absolute bottom-20">
            <img
              src="/logo.png"
              alt="Ministry of Labor and Skills"
              className="h-10"
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="relative w-1/2 bg-blue-900 text-white flex flex-col gap-2 items-center p-8 rounded-lg">
          <div className="absolute z-[0] bottom-0 w-full h-[90px] bg-footer-image bg-cover bg-no-repeat bg-scroll bg-center phone:bg-center"></div>
          <div className="">
            <img
              src="/logo.png"
              alt="Ministry of Labor and Skills"
              className="h-12"
            />
          </div>
          <p className="text-white opacity-[0.70] w-1/2 text-center font-Poppins">
            Ethiopian Labor Market Information System
          </p>
          <MyAnimation />
          <p className="text-white opacity-[0.70] w-[90%] text-center font-Poppins">
            Create a free E-LMIS account to visualize your future with the
            accurate information provided today, find employment, pursue higher
            education, and get a job.
          </p>
          {/* <div className="absolute bottom-10">
            <img
              src={ethio}
              alt="Ethiopian Skyline"
              className="h-16 object-cover"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
