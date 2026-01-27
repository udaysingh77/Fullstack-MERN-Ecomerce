import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String },
    zipCode: { type: String },
    city: { type: String },
    address: { type: String },
    profilePic: { type: String, default: "" },
    profilePicPublicId: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: { type: String, default: null },
    isVarified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
