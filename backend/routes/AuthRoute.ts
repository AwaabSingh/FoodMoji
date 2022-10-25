import { Router } from "express";
import { login, register, verifyUserAcct } from "../controllers";

const router: Router = Router();

router.post("/", register);
router.get("/confirm/:confirmationCode", verifyUserAcct);
router.post('/login', login)

export { router as AuthRoute };
