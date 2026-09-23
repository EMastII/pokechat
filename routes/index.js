import express from "express";

import auth from "../middlewares/auth.js";
import { validateLogin, validateUserBody } from "../middlewares/validation.js";
import NotFoundError from "../utils/NotFoundError.js";
import { signup, signin } from "../controllers/users.js";
import userRouter from "./users.js";

const router = express.Router();

router.post("/signup", validateUserBody, signup);
router.post("/signin", validateLogin, signin);

router.use(auth);

router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

export default router;
