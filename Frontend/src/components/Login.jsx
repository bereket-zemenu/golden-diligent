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
  const [focusStates, setFocusStates] = useState({
    isNameFocused: false,
    isEmailFocused: false,
    isPhoneFocused: false,
    isPassFocused: false,
    isConfirmPassFocused: false,
    isFatherNameFocused: false,
    isGrandFatherNameFocused: false,
    isNickNameFocused: false,
    isPlaceOfBirthFocused:false,
    isRegionFocused:false,
    isZoneFocused:false,
    isWeredaFocused:false,
    isCityFocused:false,
    isKebeleFocused:false,
    isCountryFocused:false,
    isAdessFocused:false,
    isCityAbroudFocused:false,
    isStateFocused:false,
    isZipCodeFocused:false,
    isHeightFocused:false,
    isColorOfEyesFocused:false,
    isColorOfHairFocused:false,
    isSpecialMarkFocused:false,
    isPassportNoFocused:false,
    isPassportPlaceFocused:false,
    isPassportDateFocused:false,
    isPassportAuthorityFocused:false,
    isPassportRenewalFocused:false,
    isCertificationNoFocused:false,
    isCertificationPlaceFocused:false,
    isCertificationDateFocused:false,
    isCertificationIssuingAuthorityFocused:false,
    isCertificationExpiryFocused:false,
    isDocumentTypeFocused:false,
    isDocumentNoFocused:false,
    isDocumentPlaceFocused:false,
    isDocumentDateFocused:false,
    isDocumentExpiryFocused:false,
    isDocumentAuthorityFocused:false,
    isFamillyDocumentTypeFocused:false,
    isFamillyDocumentNoFocused:false,
    isFamillyDocumentPlaceFocused:false,
    isFamillyDocumentDateFocused:false,
    isFamillyDocumentExpiryFocused:false,
    isFamillyDocumentAuthorityFocused:false,
    isFamilyNameFocused:false,
    isAscendantTypeFocused:false,
    isAscendantNoFocused:false,
    isAscendantPlaceFocused:false,
    isAscendantDateFocused:false,
    isAscendantExpiryFocused:false,
    isAscendantAuthorityFocused:false,
  });

  const [selectedLine, setSelectedLine] = useState("");
  // State to hold the input field label dynamically
  const [inputLabel, setInputLabel] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [step, setStep] = useState(1); // Track the current step
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    fatherName: "",
    grandFatherName:"",
    nickName:"",
    sex:"",
    dateOfBirth:"",
    region:"",
    zone:"",
    wereda:"",
    city:"",
    kebele:"",
    country:"",
    address:"",
    state:"",
    abroadCity:"",
    height:"",
    colorOfEye:"",
    colorOfHair:"",
    specialMark:"",
    passportNo:"",
    passportPlace:"",
    passportDate:"",
    passportRenewal:"",
    passportAuthority:"",
    certificationNumber:"",
    certificationPlace:"",
    certificationDate:"",
    certificationAuthority:"",
    certificationExpiry:"",
    documentNumber:"",
    documentType:"",
    documentPlace:"",
    documentDate:"",
    documentAuthority:"",
    documentExpiry:"",
    familyName: "",
    famillyDocumentType: "",
    famillyDocumentNumber:"",
    famillyDocumentPlace:"",
    famillyDocumentDate:"",
    famillyDocumentAuthority:"",
    famillyDocumentExpiry:"",
    formerNationalities: ["", "", ""],
    presentNationalities: ["", "", ""],
    ethnicGroup: "",

  });
  console.log(data)

  const handleFocusChange = (fieldName, isFocused) => {
    setFocusStates((prevStates) => ({
      ...prevStates,
      [fieldName]: isFocused,
    }));
  };

  const onChangeHandler = (event) => {
    const { name, value, type, dataset } = event.target;

    // Handle array fields
    if (dataset.index !== undefined) {
      const index = Number(dataset.index);
      setData((prevData) => ({
        ...prevData,
        [name]: prevData[name].map((item, idx) =>
          idx === index ? value : item
        ),
      }));
    }
    // Handle radio button changes
    else if (type === "radio") {
      setSelectedLine(value);
    }
    // Handle focus states
    else if (name.startsWith("isFocused")) {
      const focusField = `is${
        name.charAt(0).toUpperCase() + name.slice(1)
      }Focused`;
      setCurrState((prev) => ({ ...prev, [focusField]: value === "true" }));
    }
    // Handle step tracking or dynamic inputs
    else if (name === "step") {
      setStep(Number(value)); // Set step as a number
    }
    // Default handler for regular fields
    else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
      <div className="relative w-[63%] h-[90%] m-auto flex gap-2">
        {/* Left Section */}
        <div
          className={`z-[10] absolute h-full w-1/2 bg-white flex flex-col items-center p-8 pt-4 rounded-lg shadow-md ${
            move
              ? "transform translate-x-full transition-all duration-1000 ml-2"
              : "transform translate-x-0 transition-all duration-1000 -ml-2"
          }`}
        >
          {currState === "Login" && (
            <div className="absolute bottom-[165px] w-[72%] p-[1px] bg-gray-200"></div>
          )}
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
                  <div className="relative z-1 mb-4">
                    {/* Input Field */}
                    <input
                      name="email"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      onFocus={() => handleFocusChange("isEmailFocused", true)}
                      onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                        focusStates.isEmailFocused || data.email
                          ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          : "top-1/2 -translate-y-1/2"
                      }`}
                    >
                      Email
                    </label>
                  </div>
                  {currState === "signUp" ? (
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="name"
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isNameFocused", true)}
                        onBlur={() => handleFocusChange("isNameFocused", false)}
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
                          focusStates.isNameFocused || data.name
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Name/ ስም
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Phone Input */}
                  {currState === "signUp" && (
                    <div className="relative z-0">
                      <div className="flex items-center gap-2">
                        {/* {currState === "signUp" && <FlagImoji countryCode="ET" />} */}
                        <input
                          name="fatherName"
                          onChange={(e) =>
                            setData({ ...data, fatherName: e.target.value })
                          }
                          onFocus={() =>
                            handleFocusChange("isFatherNameFocused", true)
                          }
                          onBlur={() =>
                            handleFocusChange("isFatherNameFocused", false)
                          }
                          value={data.fatherName}
                          type="text"
                          id="fatherName"
                          placeholder=" "
                          className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="fatherName"
                          className={`absolute z-10 ${
                            currState === "Login"
                              ? "left-[50px]"
                              : "left-[10px]"
                          } transform transition-all text-gray-500 text-sm ${
                            focusStates.isFatherNameFocused || data.fatherName
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Father Name/ የአባት ስም
                        </label>
                      </div>
                    </div>
                  )}
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
                    onFocus={() => handleFocusChange("isPassFocused", true)}
                    onBlur={() => handleFocusChange("isPassFocused", false)}
                    value={data.password}
                    type={isOpen ? "text" : "password"}
                    id="password"
                    placeholder=" "
                    className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="password"
                    className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                      focusStates.isPassFocused || data.password
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
                      onFocus={() =>
                        handleFocusChange("isConfirmPassFocused", true)
                      }
                      onBlur={() =>
                        handleFocusChange("isConfirmPassFocused", false)
                      }
                      value={data.confirmpassword}
                      type={isConfirmOpen ? "text" : "password"}
                      id="confirmpassword"
                      placeholder=" "
                      className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label
                      htmlFor="confirmpassword"
                      className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                        focusStates.isConfirmPassFocused || data.confirmpassword
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
                  <div className="absolute bottom-6 right-12 ">
                    <button
                      type="button"
                      onClick={onNext}
                      className="w-full bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                    >
                      Next
                    </button>
                  </div>
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
                {currState === "signUp" ? (
                  <div>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="grandFatherName"
                        onChange={(e) =>
                          setData({ ...data, grandFatherName: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isGrandFatherNameFocused", true)}
                        onBlur={() => handleFocusChange("isGrandFatherNameFocused", false)}
                        value={data.grandFatherName}
                        type="text"
                        id="grandFatherName"
                        placeholder=" "
                        className="peer z-10 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      {/* Floating Label */}
                      <label
                          htmlFor="grandFatherName"
                          className={`absolute z-10 ${
                            currState === "Login"
                              ? "left-[10px]"
                              : "left-[10px]"
                          } transform transition-all text-gray-500 text-sm ${
                            focusStates.isGrandFatherNameFocused || data.grandFatherName
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Grand Father Name/ የአያት ስም
                        </label>
                    </div>
                    <div className="relative z-0 mb-4">
                      <div className="flex items-center gap-2">
                        <input
                          name="nickName"
                          onChange={(e) =>
                            setData({ ...data, nickName: e.target.value })
                          }
                          onFocus={() =>
                            handleFocusChange("isNickNameFocused", true)
                          }
                          onBlur={() =>
                            handleFocusChange("isNickNameFocused", false)
                          }
                          value={data.nickName}
                          type="text"
                          id="nickName"
                          placeholder=" "
                          className="peer z-10 w-full py-2 pl-[20px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="nickName"
                          className={`absolute z-10 ${
                            currState === "Login"
                              ? "left-[10px]"
                              : "left-[10px]"
                          } transform transition-all text-gray-500 text-sm ${
                            focusStates.isNickNameFocused || data.nickName
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Nick Name/ ልዩ መጠርያ
                        </label>
                      </div>
                    </div>
                    <div className="border border-blue-500 py-2 rounded-sm mb-8">
                      <p className="pl-4 font-Poppins text-xl text-gray-700 mb-2">
                        sex/ ፆታ
                      </p>
                      <div className="w-full flex gap-[2px] pl-6">
                        <div className="w-1/2 flex items-center gap-2">
                          <input
                            name="sex"
                            onChange={(e) =>
                              setData({ ...data, sex: e.target.value })
                            }
                            value="male"
                            type="radio"
                            id="male"
                            placeholder=" "
                            className="relative w-4 h-4 peer z-1"
                          />

                          <label htmlFor="male" className="text-sm text-gray-400">
                            Male/ወንድ
                          </label>
                        </div>
                        <div className="w-1/2 flex items-center gap-2">
                          <input
                            name="sex"
                            onChange={(e) =>
                              setData({ ...data, sex: e.target.value })
                            }
                            value="female"
                            type="radio"
                            id="female"
                            placeholder=" "
                            className="relative w-4 h-4 peer z-1"
                          />

                          <label
                            htmlFor="female"
                            className="text-sm text-gray-400"
                          >
                            Female/ ሴት
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-0 mb-4">
                      <div className="flex items-center gap-2">
                        <input
                          name="placeOfBirth"
                          onChange={(e) =>
                            setData({ ...data, placeOfBirth: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isPlaceOfBirthFocused", true)}
                          onBlur={() => handleFocusChange("isPlaceOfBirthFocused", false)}
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
                            currState === "Login"
                              ? "left-[20px]"
                              : "left-[20px]"
                          } transform transition-all text-gray-500 text-sm ${
                            focusStates.isPlaceOfBirthFocused || data.placeOfBirth
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Date Of Birth/ የትዉልድ ቀን
                        </label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                         onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                  </>
                )}

                <p className="text-right text-[10px] text-blue-800">
                  Forgot Password?
                </p>
                {currState == "Login" ? (
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-500"
                  >
                    {currState}
                  </button>
                ) : (
                  <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                    <button
                      type="button"
                      onClick={onPrevious}
                      className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
            {step === 3 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <div>
                      <h1 className="font-Poppins  text-gray-600 font-medium text-md mb-2">
                        PLACE OF BIRTH /IF IT IS IN ETHIOPIA/
                      </h1>
                      

                      {/* Phone Input */}
                      <div className="relative z-0">
                        <div className="flex items-center gap-2">
                          <input
                            name="region"
                            onChange={(e) =>
                              setData({ ...data, region: e.target.value })
                            }
                            onFocus={() => handleFocusChange("isRegionFocused", true)}
                            onBlur={() => handleFocusChange("isRegionFocused", false)}
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
                              currState === "Login"
                                ? "left-[20px]"
                                : "left-[20px]"
                            } transform transition-all text-gray-500 text-sm ${
                              focusStates.isRegionFocused || data.region
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            region/ ክልል
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
                          onFocus={() => handleFocusChange("isZoneFocused", true)}
                          onBlur={() => handleFocusChange("isZoneFocused", false)}
                          value={data.zone}
                          type="text"
                          id="zone"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="zone"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isZoneFocused || data.zone
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          zone/ ክ/ከተማ
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="wereda"
                          onChange={onChangeHandler}
                          onFocus={() => handleFocusChange("isWeredaFocused", true)}
                          onBlur={() => handleFocusChange("isWeredaFocused", false)}
                          value={data.wereda}
                          type="text"
                          id="wereda"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="wereda"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isWeredaFocused || data.wereda
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          wereda/ ወረዳ
                        </label>
                      </div>
                    )}
                    {currState === "signUp" ? (
                        <div className="relative z-1 mb-4">
                          {/* Input Field */}
                          <input
                            name="city"
                            onChange={(e) =>
                              setData({ ...data, city: e.target.value })
                            }
                            onFocus={() => handleFocusChange("isCityFocused", true)}
                            onBlur={() => handleFocusChange("isCityFocused", false)}
                            value={data.city}
                            type="text"
                            id="city"
                            placeholder=" "
                            className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          {/* Floating Label */}
                          <label
                            htmlFor="city"
                            className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                              focusStates.isCityFocused|| data.city
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            City/ ከተማ
                          </label>
                        </div>
                      ) : (
                        ""
                      )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="kebele"
                          onChange={(e) =>
                            setData({ ...data, kebele: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isKebeleFocused", true)}
                          onBlur={() => handleFocusChange("isKebeleFocused", false)}
                          value={data.kebele}
                          type="text"
                          id="kebele"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="kebele"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isKebeleFocused|| data.kebele
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          kebele/ ቀበሌ
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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}

            {step === 4 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <div>
                      <h1 className="font-Poppins  text-gray-600 font-medium text-md mb-2">
                        PLACE OF BIRTH /IF IT IS ABROAD/
                      </h1>
                      {currState === "signUp" ? (
                        <div className="relative z-1 mb-4">
                          {/* Input Field */}
                          <input
                            name="country"
                            onChange={(e) =>
                              setData({ ...data, country: e.target.value })
                            }
                            onFocus={() => handleFocusChange("isCountryFocused", true)}
                            onBlur={() => handleFocusChange("isCountryFocused", false)}
                            value={data.country}
                            type="text"
                            id="country"
                            placeholder=" "
                            className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          {/* Floating Label */}
                          <label
                            htmlFor="country"
                            className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                              focusStates.isCountryFocused || data.country
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            country/ አገር
                          </label>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* Phone Input */}
                      <div className="relative z-0">
                        <div className="flex items-center gap-2">
                          <input
                            name="address"
                            onChange={(e) =>
                              setData({ ...data, address: e.target.value })
                            }
                            onFocus={() => handleFocusChange("isAdressFocused", true)}
                            onBlur={() => handleFocusChange("isAdressFocused", false)}
                            value={data.address}
                            type="text"
                            id="address"
                            placeholder=" "
                            className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          {/* Floating Label */}
                          <label
                            htmlFor="address"
                            className={`absolute z-10 ${
                              currState === "Login"
                                ? "left-[20px]"
                                : "left-[20px]"
                            } transform transition-all text-gray-500 text-sm ${
                              focusStates.isAdessFocused || data.address
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            address/ አድራሻ
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Password Input */}

                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="abroadCity"
                          onChange={(e) =>
                            setData({ ...data, abroadCity: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCityAbroadFocused", true)}
                          onBlur={() => handleFocusChange("isCityAbroadFocused", false)}
                          value={data.abroadCity}
                          type="text"
                          id="abroadCity"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="abroadCity"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCityAbroudFocused || data.abroadCity
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          city/ ከተማ
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="state"
                          onChange={(e) =>
                            setData({ ...data, state: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isStateFocused", true)}
                          onBlur={() => handleFocusChange("isStateFocused", false)}
                          value={data.state}
                          type="text"
                          id="state"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="state"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isStateFocused || data.state
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          state/ ክልል
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="zipCode"
                          onChange={(e) =>
                            setData({ ...data, zipCode: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isZipCodeFocused", true)}
                          onBlur={() => handleFocusChange("isZipCodeFocused", false)}
                          value={data.zipCode}
                          type="text"
                          id="zipCode"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="zipCode"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isZipCodeFocused|| data.zipCode
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          zip code
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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}

            {step === 5 && (
              <>
                {currState === "signUp" ? (
                  <>
                    {currState === "signUp" && (
                      <div>
                        <h3 className="font-semibold text-sm mb-2 uppercase">
                         Nationality
                        </h3>

                        {/* Former Nationality */}
                        <div className="mb-2">
                          <label className="block font-medium mb-1 text-sm">
                            ሀ. ቀድሞው /{" "}
                            <span className="text-gray-500">FORMER</span>
                          </label>
                          <div className="flex gap-2 flex flex-col">
                            {[0, 1, 2].map((_, index) => (
                              <input
                                key={index}
                                type="text"
                                value={data.formerNationalities[index]}
                                onChange={(e) => {
                                  // Create a copy of the array and update the specific index
                                  const updatedNationalities = [...data.formerNationalities];
                                  updatedNationalities[index] = e.target.value;
                          
                                  // Update the state
                                  setData({ ...data, formerNationalities: updatedNationalities });
                                }}
                          
                                placeholder={`${index + 1}`}
                                className="w-full border border-blue-300 rounded-sm px-2 py-[2x] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Present Nationality */}
                        <div className="mb-2">
                          <label className="block font-medium mb-1 text-sm">
                            ለ. አሁን /{" "}
                            <span className="text-gray-500">PRESENT</span>
                          </label>
                          <div className="flex gap-2 flex flex-col">
                            {[0, 1, 2].map((_, index) => (
                              <input
                                key={index}
                                type="text"
                                value={data.presentNationalities[index]}
                                onChange={(e) => {
                                  // Create a copy of the array and update the specific index
                                  const updatedNationalities = [...data.presentNationalities];
                                  updatedNationalities[index] = e.target.value;
                          
                                  // Update the state
                                  setData({ ...data, presentNationalities: updatedNationalities });
                                }}
                          
                                placeholder={`${index + 1}`}
                                className="w-full border border-blue-300 rounded-sm px-2 py-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Ethnic Group */}
                        <div className="mb-2 ">
                          <label className="block font-medium mb-1 text-sm">
                            ሐ. ብሄር/ብሄረሰብ{" "}
                            <span className="text-gray-500">/ETHNIC GROUP</span>
                          </label>
                          <input
                            type="text"
                            value={data.ethnicGroup}
                            onChange={(e) =>
                              setData({ ...data, ethnicGroup: e.target.value })
                            }
                            placeholder="Ethnic Group"
                            className="w-full border border-blue-300 rounded-sm px-2 py-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Debug Output */}
                      </div>
                    )}

                    {/* Password Input */}

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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}

            {step === 6 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <div className="relative z-1">
                      <input
                        name="height"
                        onChange={(e) =>
                          setData({ ...data, height: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isHeightFocused", true)}
                        onBlur={() => handleFocusChange("isHeightFocused", false)}
                        value={data.height}
                        type="text"
                        id="height"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="height"
                        className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isHeightFocused || data.height
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Height/ ቁመት
                      </label>
                    </div>

                    {/* Confirm Password Input */}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="colorOfEyes"
                          onChange={(e) =>
                            setData({ ...data, colorOfEye: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isColorOfEyesFocused", true)}
                          onBlur={() => handleFocusChange("isColorOfEyesFocused", false)}
                          value={data.colorOfEye}
                          type="text"
                          id="colorOfEyes"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="colorOfEyes"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isColorOfEyesFocused || data.colorOfEye
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Color Of Eyes/ የአይን ቀለም
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
                          onFocus={() => handleFocusChange("isColorOfHairFocused", true)}
                          onBlur={() => handleFocusChange("isColorOfHairFocused", false)}
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
                            focusStates.isColorOfHairFocused || data.colorOfHair
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Color Of Hair/ የፀጉር ቀለም
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="specialMark"
                          onChange={(e) =>
                            setData({ ...data, specialMark: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isSpecialMarkFocused", true)}
                          onBlur={() => handleFocusChange("isSpecialMarkFocused", false)}
                          value={data.specialMark}
                          type="text"
                          id="specialMark"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="specialMark"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isSpecialMarkFocused || data.specialMark
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Special Mark/ልዩ ምልክት
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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
            {step === 7 && (
              <>
                {currState === "signUp" ? (
                  <><h1 className="text-left text-gray-800 text-sm font-Poppins font-medium"> APPLICANT&apos;S FORMER ETHIOPIAN PASSPORT </h1>
                    <div className="relative z-0">
                    
                      <div className="flex items-center gap-2">
                        <input
                          name="passportNo"
                          onChange={(e) =>
                            setData({ ...data, passportNo: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isPassportNoFocused", true)}
                          onBlur={() => handleFocusChange("isPassportNoFocused", false)}
                          value={data.passportNo}
                          type="text"
                          id="passportNo"
                          placeholder=" "
                          className="peer z-10 w-full py-2 pl-[50px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="passportNo"
                          className={`absolute z-10 ${
                            currState === "Login"
                              ? "left-[20px]"
                              : "left-[20px]"
                          } transform transition-all text-gray-500 text-sm ${
                            focusStates.isPassportNoFocused || data.passportNo
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Passport Number/ የፓስፖርት ቁጠር
                        </label>
                      </div>
                    </div>

                    {/* Password Input */}
                    <div className="relative z-1">
                      <input
                        name="passportPlace"
                        onChange={onChangeHandler}
                        onFocus={() => handleFocusChange("isPassportPlaceFocused", true)}
                        onBlur={() => handleFocusChange("isPassportPlaceFocused", false)}
                        value={data.passportPlace}
                        type="text"
                        id="passportPlace"
                        placeholder=" "
                        className="relative z-10 peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="passportPlace"
                        className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassportPlaceFocused || data.passportPlace
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Place Of Issue/የተሰጠበት ቦታ
                      </label>
                    </div>

                    {/* Confirm Password Input */}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="passportDate"
                          onChange={onChangeHandler}
                          onFocus={() => handleFocusChange("isPassportDateFocused", true)}
                          onBlur={() => handleFocusChange("isPassportDateFocused", false)}
                          value={data.dateOfIssue}
                          type="date"
                          id="passportDate"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="passportDate"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isPassportDateFocused || data.passportDate
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Date Of Issue/ የተሰጠበት ቀን
                        </label>
                      </div>
                    )}
                    {currState === "signUp" ? (
                      <div className="relative z-1 mb-4">
                        {/* Input Field */}
                        <input
                          name="passportRenewal"
                          onChange={(e) =>
                            setData({ ...data, passportRenewal: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isPassportRenewalFocused", true)}
                          onBlur={() => handleFocusChange("isPassportRenewalFocused", false)}
                          value={data.renewal}
                          type="text"
                          id="passportRenewal"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="passportRenewal"
                          className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                            focusStates.isPassportRenewalFocused || data.passportRenewal
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          last renewal/ የመጨረሻ የታደሰበት ጊዜ
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
                            name="passportAuthority"
                            onChange={(e) =>
                              setData({
                                ...data,
                                passportAuthority: e.target.value,
                              })
                            }
                            onFocus={() => handleFocusChange("isPassportAuthorityFocused", true)}
                            onBlur={() => handleFocusChange("isPassportAuthorityFocused", false)}
                            value={data.passportAuthority}
                            type="text"
                            id="passportAuthority"
                            placeholder=" "
                            className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          {/* Floating Label */}
                          <label
                            htmlFor="passportAuthority"
                            className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                              focusStates.isPassportAuthorityFocused || data.passportAuthority
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            Issuing Authority/ የሰጠው አካል
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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
            {step === 8 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <h1 className="text-sm font-medium text-gray-800 font-Poppins uppercase">
                      Birth Cirtification
                    </h1>
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="certificationNumber"
                          onChange={(e) =>
                            setData({ ...data, certificationNumber: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCertificationNoFocused", true)}
                          onBlur={() => handleFocusChange("isCertifcationNoFocused", false)}
                          value={data.certificationNumber}
                          type="text"
                          id="certificationNumber"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="certificationNumber"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCertificationNoFocused || data.certificationNumber
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          number/ቁጥር
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="certificationPlace"
                          onChange={(e) =>
                            setData({ ...data, certificationPlace: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCertificationPlaceFocused", true)}
                          onBlur={() => handleFocusChange("isCertificationPlaceFocused", false)}
                          value={data.certificationPlace}
                          type="text"
                          id="certificationPlace"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="certificationPlace"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCertificationPlaceFocused || data.certificationPlace
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Certification Place/ የተሰጠበት ቦታ
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="certificationDate"
                          onChange={(e) =>
                            setData({ ...data, certificationDate: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCertificationDateFocused", true)}
                          onBlur={() => handleFocusChange("isCertificationDateFocused", false)}
                          value={data.certificationDate}
                          type="date"
                          id="certificationDate"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="certificationDate"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCertificationDateFocused || data.certificationDate
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Certification Date/ የተሰጠበት ቀን
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="certificationIssuingAuthority"
                          onChange={(e) =>
                            setData({ ...data, certificationIssuingAuthority: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCertificationIssuingAuthorityFocused", true)}
                          onBlur={() => handleFocusChange("isCertificationIssuingAuthorityFocused", false)}
                          value={data.certificationIssuingAuthority}
                          type="text"
                          id="certificationIssuingAuthority"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="certificationIssuingAuthority"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCertificationIssuingAuthorityFocused ||
                            data.certificationIssuingAuthority
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Issuing Authority/ የሰጠው አካል
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="certificationExpiry"
                          onChange={(e) =>
                            setData({ ...data, certificationExpiry: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isCertificationExpiryFocused", true)}
                          onBlur={() => handleFocusChange("isCertificationExpiryFocused", false)}
                          value={data.certificationExpiry}
                          type="text"
                          id="certificationExpiry"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="certificationExpiry"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isCertificationExpiryFocused || data.certificationExpiry
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Date Of Expiry/ የሚፀናበት ጊዜ
                        </label>
                      </div>
                    )}

                    {/* Password Input */}

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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
            {step === 9 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <h1 className="text-xs font-medium text-gray-800 font-Poppins uppercase">
                      OTHER DOCUMENT CERTIFYING ETHIOPIAN ORIGIN (IF APPLICABLE)
                    </h1>
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="documentType"
                          onChange={(e) =>
                            setData({ ...data, documentType: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isDocumentTypeFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentTypeFocused", false)}
                          value={data.documentType}
                          type="text"
                          id="documentType"
                          placeholder=" "
                          className="relative peer z-1 w-full py-[4px] px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="documentType"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentTypeFocused || data.documentType
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Document Type/ የሰነዱ አይነት
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="documentNumber"
                          onChange={(e) =>
                            setData({ ...data, documentNumber: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isDocumentNoFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentNoFocused", false)}
                          value={data.documentNumber}
                          type="text"
                          id="documentNumber"
                          placeholder=" "
                          className="relative peer z-1 w-full py-[4px] px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="documentNumber"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentNoFocused || data.documentNumber
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Number/ ቁጥር
                        </label>
                      </div>
                    )}
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="documentPlace"
                          onChange={(e) =>
                            setData({ ...data, documentPlace: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isDocumentPlaceFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentPlaceFocused", false)}
                          value={data.documentPlace}
                          type="text"
                          id="documentPlace"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="documentPlace"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentPlaceFocused || data.documentPlace
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Place Of Issue/ የተሰጠበት ቦታ
                        </label>
                      </div>
                    )}

                       {currState === "signUp" && (
                          <div className="relative z-1">
                          <input
                          name="documentDate"
                          onChange={(e) =>
                            setData({ ...data, documentDate: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isDocumentDateFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentDateFocused", false)}
                          value={data.documentDate}
                          type="date"
                          id="otherDocumentDate"
                          placeholder=" "
                          className="relative peer z-1 w-full py-[4px] px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                        <label
                          htmlFor="documentDate"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentDateFocused || data.documentDate
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Date Of Issue/ የተሰጠበት ቀን
                        </label>
                      </div>
                    )}

                      {currState === "signUp" && (
                        <div className="relative z-1">
                        <input
                          name="documentAuthority"
                          onChange={(e) =>
                            setData({ ...data, documentAuthority: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isDocumentAuthorityFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentAuthorityFocused", false)}
                          value={data.documentAuthority}
                          type="text"
                          id="documentAuthority"
                          placeholder=" "
                          className="relative peer z-1 w-full py-[4px] px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="documentAuthority"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentAuthorityFocused || data.documentAuthority
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-1/2 -translate-y-1/2"
                          }`}
                        >
                          Issuing Authority/ የሰጠው አካል
                        </label>
                      </div>
                    )}
                    
                    
                    {currState === "signUp" && (
                      <div className="relative z-1">
                        <input
                          name="documentExpiry"
                          onChange={onChangeHandler}
                          onFocus={() => handleFocusChange("isDocumentExpiryFocused", true)}
                          onBlur={() => handleFocusChange("isDocumentExpiryFocused", false)}
                          value={data.documentExpiry}
                          type="date"
                          id="documentExpiry"
                          placeholder=" "
                          className="relative peer z-1 w-full py-[4px] px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="documentExpiry"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-xs ${
                            focusStates.isDocumentExpiryFocused|| data.documentExpiry
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Date Of Expiry/ የሚፀናበት ጊዜ
                        </label>
                      </div>
                    )}

                    {/* Password Input */}

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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused|| data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
            

            {step === 10 && (
              <>
                {currState === "signUp" ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <p className="font-Poppins text-sm uppercase font-md">
                      IF APPLICANT IS APPLYING FOR THE IDENTIFICATION CARD BASED ON HIS ASCENDANTS HE WOULD PROVIDE THE DETAILS OF DOCUMENT IDENTIFYING THE ASCENDANT 

                      </p>
                      <div className="border border-blue-500 py-4 px-4">
                      <div className="flex items-center gap-2 ">
                        <input
                          name="familyLine"
                          value="father"
                          type="radio"
                          id="fatherLine"
                          onChange={onChangeHandler}
                          checked={selectedLine === "father"}
                          className="w-4 h-4 outline-2 outline-blue-500"
                        />
                        <label htmlFor="fatherLine" className="text-gray-500">
                          Through Father&apos;s Line / በአባት ከሆነ
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          name="familyLine"
                          value="mother"
                          type="radio"
                          id="motherLine"
                          onChange={onChangeHandler}
                          checked={selectedLine === "mother"}
                          className="w-4 h-4"
                        />
                        <label htmlFor="motherLine" className="text-gray-500">
                          Through Mother&apos;s Line / በአናት ከሆነ
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          name="familyLine"
                          value="grandfather"
                          type="radio"
                          id="grandFatherLine"
                          onChange={onChangeHandler}
                          checked={selectedLine === "grandfather"}
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor="grandFatherLine"
                          className="text-gray-500"
                        >
                          Through Grand Father&apos;s Line / በአያት ከሆነ
                        </label>
                      </div>
                    </div>
                      </div>

                    {/* Dynamic Input */}
                    <div className="relative z-1 mt-4">
                      <input
                        name="familyName"
                        onChange={(e) =>
                          setData({ ...data, familyName: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isFamillyNameFocused", true)}
                        onBlur={() => handleFocusChange("isFamillyNameFocused", false)}
                        value={data.familyName}
                        type="text"
                        id="familyName"
                        placeholder=" "
                        className="relative z-10 peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="familyName"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isFamilyNameFocused|| data.familyName
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        {selectedLine === "father"
                          ? "Father Full Name/ የአባት ሙሉ ስም"
                          : selectedLine === "mother"
                          ? "Mother Full Name/ የአናት ሙሉ ስም"
                          : selectedLine === "grandfather"
                          ? "Grand Father Full Name/ የአያት ሙሉ ስም"
                          : "Family Full Name/ የቤተሰብ ስም"}
                      </label>
                    </div>

                    {/* Document Type Input */}
                    <div className="relative z-1 mt-4">
                      <input
                        name="famillyDocumentType"
                        onChange={(e) =>
                          setData({ ...data, famillyDocumentType: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isFamillyDocumentTypeFocused", true)}
                        onBlur={() => handleFocusChange("isFamillyDocumentTypeFocused", false)}
                        value={data.famillyDocumentType}
                        type="text"
                        id="famillyDocumentType"
                        placeholder=" "
                        className="relative z-10 peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="famillyDocumentType"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isFamillyDocumentTypeFocused|| data.famillyDocumentType
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Document Type/ የሰነዱ አይነት
                      </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={onNext}
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
             {step === 11 && (
              <>
                {currState === "signUp" ? (
                  <>
                  <h1 className="font-Poppins text-xs text-gray-800">IF APPLICANT IS APPLYING FOR THE IDENTIFICATION CARD BASED ON HIS ASCENDANTS HE WOULD PROVIDE THE DETAILS OF DOCUMENT IDENTIFYING THE ASCENDANT</h1>
                    <div>
                      
                      <div className="relative z-0 mb-4">
                        <div className="flex items-center gap-2">
                          <input
                            name="famillyDocumentNumber"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                setData({ ...data, famillyDocumentNumber: value });
                                setPhoneError("");
                              } else {
                                setPhoneError("Please enter numbers only.");
                              }
                            }}
                            onFocus={() => handleFocusChange("isFamillyDocumentNoFocused", true)}
                            onBlur={() => handleFocusChange("isFamillyDocumentNoFocused", false)}
                            value={data.famillyDocumentNumber}
                            type="text"
                            id="famillyDocumentNumber"
                            placeholder=" "
                            className="peer z-10 w-full py-2 pl-[1px] pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          {/* Floating Label */}
                          <label
                            htmlFor="phone"
                            className={`absolute z-10 ${
                              currState === "Login"
                                ? "left-[20px]"
                                : "left-[20px]"
                            } transform transition-all text-gray-500 text-sm ${
                              focusStates.isFamillyDocumentNoFocused || data.famillyDocumentNumber
                                ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                                : "top-1/2 -translate-y-1/2"
                            }`}
                          >
                            Number
                          </label>
                          {phoneError && (
                            <p className="absolute bottom-[-15px] left-8 text-red-500 text-xs mt-1">
                              {phoneError}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Phone Input */}
                    </div>

                    {/* Password Input */}
                    <div className="relative z-1">
                      <input
                        name="famillyDocumentPlace"
                        onChange={(e) =>
                          setData({ ...data, famillyDocumentPlace: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isFamillyDocumentPlaceFocused", true)}
                        onBlur={() => handleFocusChange("isFamillyDocumentPlaceFocused", false)}
                        value={data.famillyDocumentPlace}
                        type="text"
                        id="famillyDocumentPlace"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="famillyDocumentPlace"
                        className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isFamillyDocumentPlaceFocused || data.famillyDocumentPlace
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
                          name="famillyDocumentDate"
                          onChange={(e) =>
                            setData({ ...data, famillyDocumentDate: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isFamillyDocumentDateFocused", true)}
                          onBlur={() => handleFocusChange("isFamillyDocumentDateFocused", false)}
                          value={data.famillyDocumentDate}
                          type="date"
                          id="famillyDocumentDate"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label
                          htmlFor="famillyDocumentDate"
                          className={`absolute z-10 left-[20px] transform transition-all text-gray-500 text-sm ${
                            focusStates.isFamillyDocumentDateFocused || data.famillyDocumentDate
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
                          name="famillyDocumentAuthority"
                          onChange={(e) =>
                            setData({ ...data, famillyDocumentAuthority: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isFamillyDocumentAuthorityFocused", true)}
                          onBlur={() => handleFocusChange("isFamillyDocumentAuthorityFocused", false)}
                          value={data.famillyDocumentAuthority}
                          type="text"
                          id="famillyDocumentAuthority"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="famillyDocumentAuthority"
                          className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                            focusStates.isFamillyDocumentAuthorityFocused || data.famillyDocumentAuthority
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
                    {currState === "signUp" ? (
                      <div className="relative z-1 mb-4">
                        {/* Input Field */}
                        <input
                          name="famillyDocumentExpiry"
                          onChange={(e) =>
                            setData({ ...data, famillyDocumentExpiry: e.target.value })
                          }
                          onFocus={() => handleFocusChange("isFamillyDocumentExpiryFocused", true)}
                          onBlur={() => handleFocusChange("isFamillyDocumentExpiryFocused", false)}
                          value={data.famillyDocumentExpiry}
                          type="date"
                          id="famillyDocumentExpiry"
                          placeholder=" "
                          className="relative peer z-1 w-full py-2 px-3 pr-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Floating Label */}
                        <label
                          htmlFor="famillyDocumentExpiry"
                          className={`absolute left-3 transform transition-all text-gray-500 text-sm ${
                            focusStates.isFamillyDocumentExpiryFocused|| data.famillyDocumentExpiry
                              ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                              : "top-[-10px] bg-white px-1 text-xs text-blue-500"
                          }`}
                        >
                          Document Expiry
                        </label>
                      </div>
                    ) : (
                      ""
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
                    <div className="w-[75%] absolute bottom-6 right-12 flex justify-between">
                      <button
                        type="button"
                        onClick={onPrevious}
                        className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        
                        className="bg-blue-800 text-white py-2 px-6 rounded hover:bg-blue-500"
                      >
                        {currState}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative z-1 mb-4">
                      {/* Input Field */}
                      <input
                        name="email"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isEmailFocused", true)}
                        onBlur={() => handleFocusChange("isEmailFocused", false)}
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
                          focusStates.isEmailFocused || data.email
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email
                      </label>
                    </div>
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
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onFocus={() => handleFocusChange("isPassFocused", true)}
                        onBlur={() => handleFocusChange("isPassFocused", false)}
                        value={data.password}
                        type={isOpen ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="relative peer z-1 w-full py-2 px-3 border border-blue-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <label
                        htmlFor="password"
                        className={`absolute z-10 left-[10px] transform transition-all text-gray-500 text-sm ${
                          focusStates.isPassFocused || data.password
                            ? "top-[-10px] bg-white px-1 text-xs text-blue-500"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Password
                      </label>
                    </div>
                    {/* Submit Button */}
                    <p className="text-right text-[10px] text-blue-800">
                      Forgot Password?
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-1 rounded-sm text-md hover:bg-blue-600"
                    >
                      {currState}
                    </button>
                  </>
                )}
              </>
            )}
          </form>

          {currState === "Login" ? (
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
          ) : (
            ""
          )}
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
