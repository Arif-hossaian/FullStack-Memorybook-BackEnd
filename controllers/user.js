import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import User from "../models/userSchema.js";

//Sign In user
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExists = await User.findOne({ email });
    if (!isUserExists)
      return res.status(404).json({ msg: "User does not exits." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid Credentials" });
    const token = JWT.sign(
      {
        email: isUserExists.email,
        id: isUserExists._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: isUserExists, token });
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong." });
  }
};
//SignUp user
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const isUserExists = await User.findOne({ email });
    if (isUserExists)
      return res.status(400).json({ msg: "User already exits." });
    if (password === !confirmPassword)
      return res.status(400).json({ msg: "Passwords doesn't match" });
    const hashPassword = bcrypt.hash(password, 10);
    const result = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword,
    });
    const token = JWT.sign(
      {
        email: result.email,
        id: result._id,
      },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ msg: "Somthing went wrong." });
  }
};
