import e from "express";
import cors from "cors";

import authRouter from "./routers/authRouter.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundPage from "./middlewares/notFoundPage.js";

const startServer = () => {
  const app = e();

  app.use(cors());
  app.use(e.json());

  app.use("/api/auth", authRouter);

  app.use(notFoundPage);
  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on ${port} port`);
  });
};

export default startServer;
