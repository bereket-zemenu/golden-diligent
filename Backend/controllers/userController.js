import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import nodemailer from "nodemailer";

//creating the token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//logic for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // Use phone instead of email
    const user = await userModel.findOne({ email }); // Find user by phone

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id); // Create token using user ID
    res.json({ success: true, token }); // Respond with success and token
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Function to generate a 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP via email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL_USER, // Replace with your Gmail address
      pass: process.env.EMAIL_PASS, // Replace with your Gmail App Password
    },
  });

  const mailOptions = {
    from: "kgemechu908@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP for registration is: ${otp}`,
    html: `<p>Your OTP for registration is: <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const registerUser = async (req, res) => {
  const { email, password, confirmpassword, dateOfBirth } = req.body;

  // List of required fields
  const requiredFields = [
    "name",
    "fatherName",
    "grandFatherName",
    "nickName",
    "dateOfBirth",
    "region",
    "zone",
    "wereda",
    "city",
    "kebele",
    "country",
    "address",
    "state",
    "abroadCity",
    "height",
    "colorOfEye",
    "colorOfHair",
    "specialMark",
    "passportNo",
    "passportPlace",
    "passportDate",
    "passportRenewal",
    "passportAuthority",
    "certificationNumber",
    "certificationPlace",
    "certificationDate",
    "certificationAuthority",
    "certificationExpiry",
    "familyName",
    "famillyDocumentType",
    "famillyDocumentNumber",
    "famillyDocumentPlace",
    "famillyDocumentDate",
    "famillyDocumentAuthority",
    "famillyDocumentExpiry",
    "formerNationalities",
    "presentNationalities",
    "ethnicGroup",
  ];

  try {
    // Check for required fields
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `The field ${field} is required.`,
        });
      }
    }

    // Check if the user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (password !== confirmpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Validate dateOfBirth format
    if (!validator.isDate(dateOfBirth)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format for dateOfBirth",
      });
    }

    // Generate and send OTP
    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      ...req.body,
      password: hashedPassword, // Save hashed password
      otp, // Save OTP for later verification
      otpVerified: false, // Flag to indicate whether OTP is verified
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully. OTP sent to email.",
      userId: newUser._id, // Return user ID for frontend to use in OTP verification
      email: email,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body; // Ensure otp and userId are sent from the client
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.otp === otp) {
      // Success logic
      res
        .status(200)
        .json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//all users list

const usersList = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mesage: error });
  }
};

const getUserCount = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();

    res.json({ userCount });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { registerUser, verifyOTP, loginUser, usersList, getUserCount };
