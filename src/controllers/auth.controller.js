import { register, login, changePassword, changeEmailService,deleteAccountService } from "../services/auth.service.js";

import validateBody from "../utils/validateBody.js";

import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";

export const registerController = async (req, res) => {
  validateBody(registerSchema, req.body);
  const result = await register(req.body);

  res.status(201).json({
    message: "Register successfully",
  });
};

export const loginController = async (req, res, next) => {
  try {
    validateBody(loginSchema, req.body);
    const token = await login(req.body);
    res.json({ token });
  } catch (error) {
    next(error); 
  }
};

export const changePasswordController = async (req, res, next) => {
  try {
    const { userId, newPassword } = req.body;
    const result = await changePassword(userId, newPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAccountController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    await deleteAccountService(userId, password);
  } catch (error) {
    next(error);
  }
};


export const helloAdminController = (req, res) => {
  res.json({ message: "Welcome, admin!" });
}

export const changeEmailController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { newEmail, currentPassword } = req.body;

    const result = await changeEmailService(userId, newEmail, currentPassword);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
