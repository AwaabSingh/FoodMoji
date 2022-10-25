import { Router } from "express";
import { getProfile } from "../controllers";
import { protect } from "../middlerware/authMiddlerware";

const router: Router = Router();

router.get("/profile", protect, getProfile);

export { router as UserRoute };
