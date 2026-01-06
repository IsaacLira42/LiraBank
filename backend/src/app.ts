import express from "express";
import Routes from "./routes/Routes";

const app = express();

app.use(express.json());

app.use("/api", Routes);

export default app;
