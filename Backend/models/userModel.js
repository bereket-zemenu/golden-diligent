import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },

  password: { type: String, required: true },
  otp: {
    type: String,
    required: [true, "OTP is required"], // This error message will be shown when OTP is missing
  },
  otpVerified: { type: Boolean, default: false }, // OTP verification flag
  confirmpassword: { type: String, required: true },
  fatherName: { type: String, required: true },
  grandFatherName: { type: String, required: true },
  nickName: { type: String, required: true },
  sex: { type: String },
  dateOfBirth: { type: Date, required: true },
  region: { type: String, required: true },
  zone: { type: String, required: true },
  wereda: { type: String, required: true },
  city: { type: String, required: true },
  kebele: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  abroadCity: { type: String, required: true },
  height: { type: String, required: true },
  colorOfEye: { type: String, required: true },
  colorOfHair: { type: String, required: true },
  specialMark: { type: String, required: true },
  passportNo: { type: String, required: true },
  passportPlace: { type: String, required: true },
  passportDate: { type: Date, required: true },
  passportRenewal: { type: Date, required: true },
  passportAuthority: { type: String, required: true },
  certificationNumber: { type: String, required: true },
  certificationPlace: { type: String, required: true },
  certificationDate: { type: Date, required: true },
  certificationAuthority: { type: String, required: true },
  certificationExpiry: { type: Date, required: true },
  documentNumber: { type: String },
  documentType: { type: String },
  documentPlace: { type: String },
  documentDate: { type: Date },
  documentAuthority: { type: String },
  documentExpiry: { type: Date },
  familyName: { type: String, required: true },
  famillyDocumentType: { type: String, required: true },
  famillyDocumentNumber: { type: String, required: true },
  famillyDocumentPlace: { type: String, required: true },
  famillyDocumentDate: { type: Date, required: true },
  famillyDocumentAuthority: { type: String, required: true },
  famillyDocumentExpiry: { type: Date, required: true },
  formerNationalities: { type: [String] },
  presentNationalities: { type: [String] },
  ethnicGroup: { type: String, required: true },
});

const userModel = mongoose.models.user || mongoose.model("user", UserSchema);
export default userModel;
