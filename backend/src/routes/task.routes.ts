import { Router } from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
} from "../controllers/task.controller";

const router = Router();

router.get("/tasks", getAllTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);
router.get('/tasks/:id', getTaskById);

export default router;
