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
  const { move, setMove, currState, setCurrState, url, setToken } = useStores();
  const [regMessage, setRegMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);
  const [isConfirmPassFocused, setIsConfirmPassFocused] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [step, setStep] = useState(1); // Track the current step
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

  const onNext = () => {
    // Optional: Add validation before proceeding
    setStep((prev) => prev + 1);
  };

  const onPrevious = () => {
    setStep((prev) => prev - 1);
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
        setRegMessage("");
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
          className={`z-[10] absolute h-full w-1/2 bg-white flex flex-col items-center p-8 pt-4 rounded-lg shadow-md ${
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
            {step === 1 && (
              <>
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
                            setIsEmailFocused(false);
                          }
                        }}
                        onFocus={() => setIsEmailFocused(true)}
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
                          isEmailFocused || data.email
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
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="name"
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.name}
                        type="text"
                        id="name"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="name"
                        className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                          isFocused || data.name
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Name
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {/* {currState === "signUp" && <FlagImoji countryCode="ET" />} */}
                      <input
                        name="fatherName"
                        onChange={(e) =>
                          setData({ ...data, fatherName: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsPhoneFocused(false);
                          }
                        }}
                        onFocus={() => setIsPhoneFocused(true)}
                        value={data.fatherName}
                        type="text"
                        id="fatherName"
                        placeholder=" "
                        className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="phone"
                        className={`absolute z-10 ${
                          currState === "Login" ? "left-[50px]" : "left-[10px]"
                        } transform transition-all text-gray-500 text-sm ${
                          isPhoneFocused || data.fatherName
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Father Name
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
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

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.password
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
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

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.confirmpassword
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                {currState === "signUp" ? (
                  <button
                    type="button"
                    onClick={onNext}
                    className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-500"
                  >
                    Next1
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-500"
                  >
                    {currState}
                  </button>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="grandFatherName"
                        onChange={(e) =>
                          setData({ ...data, grandFatherName: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.grandFatherName}
                        type="text"
                        id="grandFatherName"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="email"
                        className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                          isFocused || data.grandFatherName
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Grand Father Name
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      <input
                        name="nickName"
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsPhoneFocused(false);
                          }
                        }}
                        onFocus={() => setIsPhoneFocused(true)}
                        value={data.nickName}
                        type="text"
                        id="nickName"
                        placeholder=" "
                        className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="nickName"
                        className={`absolute z-10 ${
                          currState === "Login" ? "left-[10px]" : "left-[10px]"
                        } transform transition-all text-gray-500 text-sm ${
                          isPhoneFocused || data.nickName
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Nick Name
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="border border-blue-500 rounded-sm">
                  <p className="pl-4 font-Poppins text-xl text-gray-700 mb-2">
                    sex
                  </p>
                  <div className="flex gap-2 pl-4">
                    <div className="flex gap-2">
                      <input
                        name="sex"
                        onChange={onChangeHandler}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsPassFocused(false);
                          }
                        }}
                        onFocus={() => setIsPassFocused(true)}
                        value={data.sex}
                        type="radio"
                        id="sex"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3"
                      />

                      <label htmlFor="password" className="text-gray-400">
                        Male
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        name="sex"
                        onChange={onChangeHandler}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsConfirmPassFocused(false);
                          }
                        }}
                        onFocus={() => setIsConfirmPassFocused(true)}
                        value={data.dateOfBirth}
                        type="radio"
                        id="sex"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3"
                      />

                      <label
                        htmlFor="confirmpassword"
                        className="text-gray-400"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="relative z-0">
                  <div className="flex items-center gap-2">
                    <input
                      name="placeOfBirth"
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsPhoneFocused(false);
                        }
                      }}
                      onFocus={() => setIsPhoneFocused(true)}
                      value={data.placeOfBirth}
                      type="date"
                      id="placeOfBirth"
                      placeholder=" "
                      className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Floating Label */}
                    <label
                      htmlFor="placeOfBirth"
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-[20px]" : "left-[20px]"
                      } transform transition-all text-gray-500 text-sm ${
                        isPhoneFocused || data.placeOfBirth
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                      }`}
                    >
                      Place Of Birth
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next2
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="placeOfBirth"
                        onChange={(e) =>
                          setData({ ...data, placeOfBirth: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.placeOfBirth}
                        type="text"
                        id="placeOfBirth"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="email"
                        className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                          isFocused || data.placeOfBirth
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Place Of Birth
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      <input
                        name="region"
                        onChange={(e) =>
                          setData({ ...data, region: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsPhoneFocused(false);
                          }
                        }}
                        onFocus={() => setIsPhoneFocused(true)}
                        value={data.region}
                        type="text"
                        id="region"
                        placeholder=" "
                        className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="region"
                        className={`absolute z-10 ${
                          currState === "Login" ? "left-[20px]" : "left-[20px]"
                        } transform transition-all text-gray-500 text-sm ${
                          isPhoneFocused || data.region
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        region
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password Input */}

                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="zone"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.zone}
                      type="text"
                      id="zone"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="zone"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.zone
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      zone
                    </label>
                  </div>
                )}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="wereda"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.wereda}
                      type="text"
                      id="wereda"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="wereda"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.wereda
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      wereda
                    </label>
                  </div>
                )}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="kebele"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.kebele}
                      type="text"
                      id="kebele"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="kebele"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.kebele
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      kebele
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next3
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <div className="relative z-1">
                  <input
                    name="height"
                    onChange={onChangeHandler}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setIsPassFocused(false);
                      }
                    }}
                    onFocus={() => setIsPassFocused(true)}
                    value={data.height}
                    type="text"
                    id="height"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.height
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Height
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="colorOfEyes"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.colorOfEyes}
                      type="text"
                      id="colorOfEyes"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.colorOfEyes
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Color Of Eyes
                    </label>
                  </div>
                )}

                {currState === "signUp" ? (
                  <div className="relative z-1 mb-4">
                    {/* Input Field */}
                    <input
                      name="colorOfHair"
                      onChange={(e) =>
                        setData({ ...data, colorOfHair: e.target.value })
                      }
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsFocused(false);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      value={data.colorOfHair}
                      type="text"
                      id="colorOfHair"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Floating Label */}
                    <label
                      htmlFor="colorOfHair"
                      className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                        isFocused || data.colorOfHair
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Color Of Hair
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="specialMark"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.specialMark}
                      type="text"
                      id="specialMark"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="specialMark"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.specialMark
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Special Mark
                    </label>
                  </div>
                )}

                {/* Phone Input */}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next4
                  </button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <div className="relative z-0">
                  <div className="flex items-center gap-2">
                    <input
                      name="passportNo"
                      onChange={(e) =>
                        setData({ ...data, passportNo: e.target.value })
                      }
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsPhoneFocused(false);
                        }
                      }}
                      onFocus={() => setIsPhoneFocused(true)}
                      value={data.passportNo}
                      type="text"
                      id="passportNo"
                      placeholder=" "
                      className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Floating Label */}
                    <label
                      htmlFor="phone"
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-[20px]" : "left-[20px]"
                      } transform transition-all text-gray-500 text-sm ${
                        isPhoneFocused || data.passportNo
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Passport Number
                    </label>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
                  <input
                    name="placeOfIssue"
                    onChange={onChangeHandler}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setIsPassFocused(false);
                      }
                    }}
                    onFocus={() => setIsPassFocused(true)}
                    value={data.placeOfIssue}
                    type="text"
                    id="placeOfIssue"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.placeOfIssue
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Place Of Issue
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="dateOfIssue"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.dateOfIssue}
                      type="date"
                      id="dateOfIssue"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.dateOfIssue
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                      }`}
                    >
                      Date Of Issue
                    </label>
                  </div>
                )}
                {currState === "signUp" ? (
                  <div className="relative z-1 mb-4">
                    {/* Input Field */}
                    <input
                      name="renewal"
                      onChange={(e) =>
                        setData({ ...data, renewal: e.target.value })
                      }
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsFocused(false);
                        }
                      }}
                      onFocus={() => setIsFocused(true)}
                      value={data.renewal}
                      type="text"
                      id="renewal"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Floating Label */}
                    <label
                      htmlFor="renewal"
                      className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                        isFocused || data.renewal
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      last renewal
                    </label>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="issuingAuthority"
                        onChange={(e) =>
                          setData({ ...data, issuingAuthority: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.issuingAuthority}
                        type="text"
                        id="emailissuingAuthority"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="email"
                        className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                          isFocused || data.issuingAuthority
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Issuing Authority
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}

                  {/* Password Input */}
                </div>

                {/* Confirm Password Input */}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next5
                  </button>
                </div>
              </>
            )}
            {step === 6 && (
              <>
                <div className="flex flex-col gap-2 pl-2">
                  <p>
                    Through which family line do applicants claiming the
                    certification card
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      name="familyLine"
                      onChange={(e) => {
                        const value = e.target.value;
                      }}
                      value={data.fatherLine}
                      type="radio"
                      id="fatherLine"
                      placeholder=" "
                      className="w-4 h-4 outline-2 outline-blue-500"
                    />

                    {/* Floating Label */}
                    <label htmlFor="fatherLine" className="text-gray-500">
                      Father&apos;s Line
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      name="familyLine"
                      onChange={onChangeHandler}
                      value={data.motherLine}
                      type="radio"
                      id="motherLine"
                      placeholder=""
                      className="w-4 h-4"
                    />

                    <label htmlFor="motherLine" className="text-gray-500">
                      Mother&apos;s Line
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      name="familyLine"
                      onChange={onChangeHandler}
                      value={data.grandFatherLine}
                      type="radio"
                      id="grandFatherLine"
                      placeholder=" "
                      className="w-4 h-4"
                    />

                    <label htmlFor="grandFatherLine" className="text-gray-500">
                      Grand Father&apos;s Line
                    </label>
                  </div>
                </div>

                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="famillyFullName"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.famillyFullName}
                      type="text"
                      id="famillyFullName"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.famillyFullName
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Familly Full Name
                    </label>
                  </div>
                )}

                <div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="documentType"
                        onChange={(e) =>
                          setData({ ...data, documentType: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.documentType}
                        type="text"
                        id="documentType"
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
                        Document Type
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {currState === "signUp" && <FlagImoji countryCode="ET" />}
                      <input
                        name="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setData({ ...data, number: value });
                            setPhoneError("");
                          } else {
                            setPhoneError("Please enter numbers only.");
                          }
                        }}
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsPhoneFocused(false);
                          }
                        }}
                        onFocus={() => setIsPhoneFocused(true)}
                        value={data.number}
                        type="text"
                        id="number"
                        placeholder=" "
                        className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="number"
                        className={`absolute z-10 ${
                          currState === "Login" ? "left-[20px]" : "left-[80px]"
                        } transform transition-all text-gray-500 text-sm ${
                          isPhoneFocused || data.number
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Familly Number
                      </label>
                      {phoneError && (
                        <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <span
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-2" : "left-10"
                      } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                    >
                      +251
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
                  <input
                    name="familyPlaceIssue"
                    onChange={onChangeHandler}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        setIsPassFocused(false);
                      }
                    }}
                    onFocus={() => setIsPassFocused(true)}
                    value={data.familyPlaceIssue}
                    type="text"
                    id="familyPlaceIssue"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.familyPlaceIssue
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Family Place Of Issue
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
                    <input
                      name="familyDateIssue"
                      onChange={onChangeHandler}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setIsConfirmPassFocused(false);
                        }
                      }}
                      onFocus={() => setIsConfirmPassFocused(true)}
                      value={data.familyDateIssue}
                      type="date"
                      id="familyDateIssue"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="familyDateIssue"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.familyDateIssue
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                      }`}
                    >
                      Family Date Of Issue
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next6
                  </button>
                </div>
              </>
            )}
            {step === 7 && (
              <>
                <div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="issuingAuthority"
                        onChange={(e) =>
                          setData({ ...data, issuingAuthority: e.target.value })
                        }
                        onBlur={(e) => {
                          if (!e.target.value) {
                            setIsFocused(false);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        value={data.issuingAuthority}
                        type="text"
                        id="issuingAuthority"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                        htmlFor="email"
                        className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                          isFocused || data.issuingAuthority
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Issuing Authority
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {currState === "signUp" && <FlagImoji countryCode="ET" />}
                      <input
                        name="phone"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setData({ ...data, phone: value });
                            setPhoneError("");
                          } else {
                            setPhoneError("Please enter numbers only.");
                          }
                        }}
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
                      {phoneError && (
                        <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <span
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-2" : "left-10"
                      } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                    >
                      +251
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
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

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.password
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
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

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.confirmpassword
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next7
                  </button>
                </div>
              </>
            )}
            {step === 8 && (
              <>
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

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {currState === "signUp" && <FlagImoji countryCode="ET" />}
                      <input
                        name="phone"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setData({ ...data, phone: value });
                            setPhoneError("");
                          } else {
                            setPhoneError("Please enter numbers only.");
                          }
                        }}
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
                      {phoneError && (
                        <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <span
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-2" : "left-10"
                      } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                    >
                      +251
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
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

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.password
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
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

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.confirmpassword
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next8
                  </button>
                </div>
              </>
            )}
            {step === 9 && (
              <>
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

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {currState === "signUp" && <FlagImoji countryCode="ET" />}
                      <input
                        name="phone"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setData({ ...data, phone: value });
                            setPhoneError("");
                          } else {
                            setPhoneError("Please enter numbers only.");
                          }
                        }}
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
                      {phoneError && (
                        <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <span
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-2" : "left-10"
                      } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                    >
                      +251
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
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

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.password
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
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

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.confirmpassword
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    Next9
                  </button>
                </div>
              </>
            )}
            {step === 10 && (
              <>
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

                  {/* Phone Input */}
                  <div className="relative z-0">
                    <div className="flex items-center gap-2">
                      {currState === "signUp" && <FlagImoji countryCode="ET" />}
                      <input
                        name="phone"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            setData({ ...data, phone: value });
                            setPhoneError("");
                          } else {
                            setPhoneError("Please enter numbers only.");
                          }
                        }}
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
                      {phoneError && (
                        <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <span
                      className={`absolute z-10 ${
                        currState === "Login" ? "left-2" : "left-10"
                      } top-1/2 transform -translate-y-1/2 text-gray-600 text-sm`}
                    >
                      +251
                    </span>
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative z-1">
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

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                      isPassFocused || data.password
                        ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                        : "top-1/2 -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                </div>

                {/* Confirm Password Input */}
                {currState === "signUp" && (
                  <div className="relative z-1">
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

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        isConfirmPassFocused || data.confirmpassword
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Confirm Password
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {/* <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                >
                  {currState}
                </button> */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    {currState}
                  </button>
                </div>
              </>
            )}
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
