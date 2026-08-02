import express from "express";
import Routes from "./routes/Routes";
import cors from "cors";
import { errorHandler } from "./middlewares/ErrorHandler";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", Routes);

app.use(errorHandler);

export default app;
