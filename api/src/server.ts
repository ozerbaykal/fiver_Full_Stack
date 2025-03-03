import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//veri tabanı ile bağlatı kur
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("😎 Veri tabanına bağlandı"))
  .catch((err) => console.log("🙈 Veri tabanına bağlanamadı", err));

//express başlat
const app = express();

app.get("/", (req, res) => {
  res.send("Servardam merhabalar canım");
});

app.listen(process.env.PORT, () => {
  console.log(`🎾 server ${process.env.PORT} portunu dinlemeye başladı`);
});
