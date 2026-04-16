import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./modules/routes";
import config from "./config";
import { googleRoutes } from "./modules/providers/googleProvider";

const app: Application = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      config.frontend_url as string,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
  })
);

app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cron.schedule("0 * * * *", () => {
//   try {
//     // This cron job runs every minute
//   } catch (err) {
//     console.log(err);
//   }
// });

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World!",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Backend is healthy",
  });
});

app.use("/api/v1", router);
app.use("/providers/google", googleRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
      method: req.method,
      message: "Your requested API is not found",
    },
  });
});

export default app;
