    import { Router } from "express";
    import {changePasswordController, registerController, loginController, deleteAccountController, helloAdminController, changeEmailController} from '../controllers/auth.controller.js'
    import {authMiddleware} from '../middlewares/authMiddleware.js'
    import {roleMiddleware} from '../middlewares/roleMiddleware.js'
    const authRouter = Router();

    authRouter.post("/register",registerController);
    authRouter.post("/login",loginController);
    authRouter.post("/change-password", changePasswordController);
    authRouter.post("/delete-account", authMiddleware, deleteAccountController);
    authRouter.get("/admin", authMiddleware, roleMiddleware("admin"), helloAdminController);
    authRouter.post("/change-email", authMiddleware, changeEmailController);



    export default authRouter;
