import express, { Router } from "express";

//1) router oluşturma

const router: Router = express.Router();

//2 yolları belirle

router.route("/login").get();
router.route("/register").get();
router.route("/logout").get();

//3 routeları server (app) 'e tanıtmak için export et
export default router;
