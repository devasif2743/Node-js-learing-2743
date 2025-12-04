import express from "express";
import adminRouter from "./apiRoutes.js";
import { authRouter } from "./authRoute.js";
import { dashboardRouter } from "./dashboardRoutes.js";

const router = express.Router();

router.use("/admin", adminRouter);

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);

export default router;
