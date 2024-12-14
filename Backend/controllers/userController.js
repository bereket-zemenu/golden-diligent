import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

//creating the token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//logic for user login
const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body; // Use phone instead of email
    const user = await userModel.findOne({ phone }); // Find user by phone

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

//logic for user register
const registerUser = async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPasword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      image: "",

      email: email,
      password: hashPasword,
      phone: phone,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, mssage: "Error" });
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

export { registerUser, loginUser, usersList, getUserCount };
