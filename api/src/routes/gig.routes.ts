import express, { Router } from "express";
import { createGig, deleteGig, getAllGigs, getGig } from "../controllers/gig.controller.js";
import protect from "../middleware/protect.ts";
import uplodad from "../utils/multer.ts";

//1) router oluşturma

const router: Router = express.Router();

//2 yolları belirle

router
  .route("/")
  .get(getAllGigs)
  .post(
    protect,
    uplodad.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "images", maxCount: 6 },
    ]),
    createGig
  );
router.route("/:id").get(getGig).delete(deleteGig);

//3 routeları server (app) 'e tanıtmak için export et
export default router;
