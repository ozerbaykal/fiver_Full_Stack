import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.ts";
import gigRouter from "./routes/review.routes.ts";
import reviewsRouter from "./routes/gig.routes.ts";

//env dosyasındaki değişkenlere erişmemizi sağlar
dotenv.config();

//veri tabanı ile bağlatı kur
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("😎 Veri tabanına bağlandı"))
  .catch((err) => console.log("🙈 Veri tabanına bağlanamadı", err));

//express uygulamasını başlat
const app = express();

//middleware'ler
app.use(express.json());

//routeları server a tanıt
app.use("/api/auth", authRouter);
app.use("api/gigs", gigRouter);
app.use("/api/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("Serverdan merhabalar canım");
});

//portu dinlemeye başla
app.listen(process.env.PORT, () => {
  console.log(`🎾 server ${process.env.PORT} portunu dinlemeye başladı`);
});
