import express from "express";
const app = express();
const port = 3000;
app.get("/", (req, res) => {
    res.send("Servardam merhaba");
});
app.listen(port, () => {
    console.log(`🎾 server ${port} portunu dinlemeye başladı`);
});
