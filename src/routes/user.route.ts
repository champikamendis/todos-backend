import { Router } from "express";
import UserController from "../controllers/user.controller";
import { checkJwt } from "../jwt_middleware/jwt";

const router = Router();

// login
router.post("/login", UserController.login);

//Create a new user
router.post("/newUser", UserController.newUser);

//Identify user
router.get("/recognizeUser", [checkJwt], UserController.recognizeUser);

export default router;