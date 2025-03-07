import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.ts";
import gigRouter from "./routes/review.routes.ts";
import reviewsRouter from "./routes/gig.routes.ts";
import errorMiddleware from "./middleware/errorHandler.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

//env dosyasındaki değişkenlere erişmemizi sağlar
dotenv.config();

//veri tabanı ile bağlatı kur
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("😎 Veri tabanına bağlandı"))
  .catch((err) => console.log("🙈 Veri tabanına bağlanamadı", err));

//express uygulamasını başlat
const app = express();

app.use(cookieParser());

//middleware'ler
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

//routeları server a tanıt
app.use("/api/auth", authRouter);
app.use("api/gigs", gigRouter);
app.use("/api/reviews", reviewsRouter);

//hata yönetimi içi MW
app.use(errorMiddleware);

//portu dinlemeye başla
app.listen(process.env.PORT, () => {
  console.log(`🎾 server ${process.env.PORT} portunu dinlemeye başladı`);
});
