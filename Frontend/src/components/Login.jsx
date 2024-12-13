import { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import MyAnimation from "./MyAnimation";
import { useStores } from "../contexts/storeContext";
import FlagImoji from "./FlagImoji";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { move, setMove, currState, setCurrState } = useStores();
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="relative w-[63%] h-[85%] m-auto flex gap-2">
        {/* Left Section */}
        <div
          className={`z-[10] absolute h-full w-1/2 bg-white flex flex-col items-center p-8 pt-16 rounded-lg shadow-md ${
            move
              ? "transform translate-x-full transition-all duration-1000 ml-2"
              : "transform translate-x-0 transition-all duration-1000 -ml-2"
          }`}
        >
          <div className="absolute bottom-[165px] w-[72%] p-[1px] bg-gray-200"></div>

          <h2 className="text-xl font-bold mb-2 text-blue-500 font-Poppins">
            {currState}
          </h2>
          {currState === "Login" ? (
            <p className="mb-6 text-[12px] text-gray-400 font-Poppins">
              Don&apos;t You Have An Account?{" "}
              <span
                onClick={() => {
                  setMove(!move);
                  setCurrState("signUp");
                }}
                className="text-blue-500 cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="mb-6 text-[12px] text-gray-400 font-Poppins">
              already Have An Account?{" "}
              <span
                onClick={() => {
                  setMove(!move);
                  setCurrState("Login");
                }}
                className="text-blue-500 cursor-pointer"
              >
                Sign in
              </span>
            </p>
          )}
          <form className="space-y-4 w-80">
            <div>
              {currState === "signUp" ? (
                <div className="relative z-1 mb-4">
                  {/* Input Field */}
                  <input
                    type="text"
                    id="email"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 pl-[0px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Floating Label */}
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-focus:top-[-2px] peer-focus:bg-white peer-focus:px-1 peer-focus:left-[10px] peer-focus:text-blue-500 peer-focus:text-xs"
                  >
                    Email
                  </label>

                  {/* Country Code */}
                </div>
              ) : (
                ""
              )}
              <div className="relative z-0">
                {/* Input Field */}
                <div className="flex items-center gap-2">
                  {currState === "signUp" && <FlagImoji countryCode="ET" />}
                  <input
                    type="text"
                    id="phone"
                    placeholder=" "
                    className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute z-10 ${
                      currState === "Login" ? "left-[50px]" : "left-[90px]"
                    } top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all duration-200 
    peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 
    peer-focus:top-[-2px] peer-focus:bg-white peer-focus:px-1 
    peer-focus:left-[45px] peer-focus:text-blue-500 peer-focus:text-xs`}
                  >
                    Phone Number
                  </label>
                </div>

                {/* Floating Label */}

                {/* Country Code */}
                <span
                  className={`absolute z-10 ${
                    currState === "Login" ? "left-2" : "left-10"
                  } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                >
                  +251
                </span>
              </div>
            </div>

            <div className="relative z-1">
              {/* Eye Icon */}
              {isOpen ? (
                <HiEye
                  size={15}
                  color="#3B82F6"
                  onClick={() => setIsOpen(!isOpen)}
                  className="z-10 absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              ) : (
                <HiEyeOff
                  size={15}
                  color="#3B82F6"
                  onClick={() => setIsOpen(!isOpen)}
                  className="z-10 absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                />
              )}

              {/* Input Field */}
              <input
                type={isOpen ? "text" : "password"}
                id="password"
                placeholder=" "
                className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Floating Label */}
              <label
                htmlFor="password"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-focus:top-[-2px] peer-focus:bg-white peer-focus:px-1 peer-focus:left-[10px] peer-focus:text-blue-500 peer-focus:text-xs"
              >
                Password
              </label>
            </div>
            {currState === "signUp" ? (
              <div className="relative z-1">
                {/* Eye Icon */}
                {isConfirmOpen ? (
                  <HiEye
                    size={15}
                    color="#3B82F6"
                    onClick={() => setIsConfirmOpen(!isConfirmOpen)}
                    className="z-10 absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <HiEyeOff
                    size={15}
                    color="#3B82F6"
                    onClick={() => setIsConfirmOpen(!isConfirmOpen)}
                    className="z-10 absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  />
                )}

                {/* Input Field */}
                <input
                  type={isOpen ? "text" : "password"}
                  id="confirmpassword"
                  placeholder=" "
                  className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Floating Label */}
                <label
                  htmlFor="confirmpassword"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm transition-all peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:text-gray-400 peer-focus:top-[-2px] peer-focus:bg-white peer-focus:px-1 peer-focus:left-[10px] peer-focus:text-blue-500 peer-focus:text-xs"
                >
                  Confirm Password
                </label>
              </div>
            ) : (
              ""
            )}
            <p className="text-right text-[10px] text-blue-800">
              Forgot Password?
            </p>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
            >
              {currState}
            </button>
          </form>

          <div
            className={`absolute ${
              currState === "Login" ? "bottom-20" : "bottom-5"
            }`}
          >
            <img
              src="/logo.png"
              alt="Ministry of Labor and Skills"
              className="h-10"
            />
          </div>
        </div>
        {/* Right Section */}
        <div
          className={`z-[20] absolute h-full w-1/2 bg-blue-900 text-white flex flex-col gap-2 items-center p-8 rounded-lg ${
            move
              ? "transform -translate-x-0 transition-all duration-1000 -ml-2"
              : "transform translate-x-full transition-all duration-1000 "
          }`}
        >
          <div className="absolute z-[0] bottom-0 w-full h-[90px] bg-footer-image bg-cover bg-no-repeat bg-scroll bg-center phone:bg-center"></div>
          <div className="">
            <img
              src="/logo.png"
              alt="Ministry of Labor and Skills"
              className="h-12"
            />
          </div>
          <p className="text-white opacity-[0.70] w-1/2 text-center text-sm font-Poppins">
            Ethiopian Labor Market Information System
          </p>
          <MyAnimation />
          <p className="text-white opacity-[0.70] w-[90%] text-center font-Poppins">
            Create a free E-LMIS account to visualize your future with the
            accurate information provided today, find employment, pursue higher
            education, and get a job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
