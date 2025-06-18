import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorHandler);

export default app;
