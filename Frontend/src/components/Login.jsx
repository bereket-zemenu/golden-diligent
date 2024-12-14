/* eslint-disable no-unused-vars */
import { useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import MyAnimation from "./MyAnimation";
import { useStores } from "../contexts/storeContext";
import FlagImoji from "./FlagImoji";
import axios from "axios";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { move, setMove, currState, setCurrState } = useStores();
  const { url, setToken } = useStores();
  const [regMessage, setRegMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isConfirmPassFocused, setIsConfirmPassFocused] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    let response;
    if (currState === "Login") {
      newUrl += "/api/user/login";
      response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        // setShowLogin(false);
      } else {
        setErrMessage("");
        setRegMessage("");
        setLoginError(response.data.message);
      }
    } else {
      newUrl += "/api/user/register";
      response = await axios.post(newUrl, data);
      if (response.data.success) {
        setRegMessage("registered successfully");
        setMove(!move);
        setCurrState("Login");
        setErrMessage("");
      } else {
        setErrMessage(response.data.message);
      }
    }
  };
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
          {regMessage ? regMessage : ""}
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
          <form onSubmit={onLogin} className="space-y-4 w-80">
            <div>
              {currState === "signUp" ? (
                <div className="relative z-1 mb-4">
                  {/* Input Field */}
                  <input
                    name="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setIsFocused(false);
                      }
                    }}
                    onFocus={() => setIsFocused(true)}
                    value={data.email}
                    type="text"
                    id="email"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Floating Label */}
                  <label
                    htmlFor="email"
                    className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                      isFocused || data.email
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Email
                  </label>
                </div>
              ) : (
                ""
              )}
              <div className="relative z-0">
                {/* Input Field */}
                <div className="flex items-center gap-2">
                  {currState === "signUp" && <FlagImoji countryCode="ET" />}
                  <input
                    name="phone"
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setIsPhoneFocused(false);
                      }
                    }}
                    onFocus={() => setIsPhoneFocused(true)}
                    value={data.phone}
                    type="text"
                    id="phone"
                    placeholder=" "
                    className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Floating Label */}
                  <label
                    htmlFor="phone"
                    className={`absolute z-10 ${
                      currState === "Login" ? "left-[50px]" : "left-[90px]"
                    } transform transition-all text-gray-500 text-sm ${
                      isPhoneFocused || data.phone
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
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
                name="password"
                onChange={onChangeHandler}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setIsPassFocused(false);
                  }
                }}
                onFocus={() => setIsPassFocused(true)}
                value={data.password}
                type={isOpen ? "text" : "password"}
                id="password"
                placeholder=" "
                className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Floating Label */}
              <label
                htmlFor="password"
                className={`absolute z-10 ${
                  currState === "Login" ? "left-[20px]" : "left-[20px]"
                } transform transition-all text-gray-500 text-sm ${
                  isPassFocused || data.password
                    ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                    : "top-1/2 -translate-y-1/2"
                }`}
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
                  name="confirmpassword"
                  onChange={onChangeHandler}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setIsConfirmPassFocused(false);
                    }
                  }}
                  onFocus={() => setIsConfirmPassFocused(true)}
                  value={data.confirmpassword}
                  type={isConfirmOpen ? "text" : "password"}
                  id="confirmpassword"
                  placeholder=" "
                  className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Floating Label */}
                <label
                  htmlFor="confirmpassword"
                  className={`absolute z-10 ${
                    currState === "Login" ? "left-[20px]" : "left-[20px]"
                  } transform transition-all text-gray-500 text-sm ${
                    isConfirmPassFocused || data.confirmpassword
                      ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                      : "top-1/2 -translate-y-1/2"
                  }`}
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
