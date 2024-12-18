import { useState } from "react";
import otpImage from "../assets/images/otp-image.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useStores } from "../contexts/storeContext";

const Confirmation = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const { email } = location.state || {}; // Get email from passed state
  const { url } = useStores();
  console.log(typeof otp.join(""), url);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      console.log("Request Payload:", { email, otp }); // Debugging logs
      const response = await axios.post(`${url}/api/user/verify-otp`, {
        email,
        otp,
      });
      console.log("Response:", response);

      console.log(response.data.message);
      if (response.data.success) {
        alert("OTP Verified Successfully!");
        // Redirect or perform further actions
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.error("Error verifying OTP:", error.response.data.message);
        alert(`Failed to verify OTP: ${error.response.data.message}`);
      } else {
        console.error("Error verifying OTP:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Side - Image and Illustration */}
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="p-8">
          {/* You can replace this with an actual image */}
          <img
            src={otpImage}
            alt="OTP Illustration"
            className="w-full max-w-md mx-auto"
          />
          {/* <p className="text-gray-700 text-center mt-4">
            Secure your account with 2-step verification.
          </p> */}
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4 transform">
              <span className="inline-block text-5xl text-blue-500 rotate-45">
                &uarr;
              </span>
            </div>

            <h2 className="font-Poppins text-lg font-semibold text-gray-700 mb-2 text-center">
              We have sent the Code Verification to your email adress
            </h2>
            <p className="text-blue-600 font-semibold mb-4">{email}</p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            onClick={() => verifyOTP(email, otp.join(""))}
          >
            Verify
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Didn’t receive OTP Number?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
