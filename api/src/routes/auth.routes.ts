import express, { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller.js";
import uplodad from "../utils/multer.ts";
import protect from "../middleware/protect.ts";

//1) router oluşturma

const router: Router = express.Router();

//2 yolları belirle

router.route("/login").post(login);
router.route("/register").post(uplodad.single("photo"), register);
router.route("/logout").post(logout);
router.route("/profile").get(protect, profile);

//3 routeları server (app) 'e tanıtmak için export et
export default router;
