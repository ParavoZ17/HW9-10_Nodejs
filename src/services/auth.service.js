import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";

import HttpError from "../utils/HttpError.js";

const { JWT_SECRET } = process.env;

export const register = async (payload) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword });
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw HttpError(401, "Email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "Email or password invalid");

  if (user.mustChangePassword) {
    throw HttpError(403, "You must change your password before login");
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
  return token;
};

export const changePassword = async (userId, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await user.update({
    password: hashedPassword,
    mustChangePassword: false,
  });

  return { message: "Password changed successfully" };
};

export const deleteAccountService = async (userId, password) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Password is incorrect");

  await user.destroy();
  return { message: "Account deleted successfully" };
};

export const changeEmailService = async (userId, newEmail, currentPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(404, "User not found");

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) throw HttpError(401, "Password is incorrect");

  const existing = await User.findOne({ where: { email: newEmail } });
  if (existing) throw HttpError(409, "Email already in use");

  await user.update({ email: newEmail });
  return { message: "Email changed successfully" };
};