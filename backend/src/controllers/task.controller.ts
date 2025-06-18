import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { Task } from "../entities/Task";
import { createError } from "../utils/createError";

const taskRepo = AppDataSource.getRepository(Task);


// GET /tasks
export const getAllTasks = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
    const tasks = await taskRepo.find();
    return res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET /tasks/:id - Fetch a single task by ID
export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
 
  try {
    const task = await taskRepo.findOneBy({ id });
    if (!task) {
      throw createError(404, "Task not found");
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};


// POST /tasks
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   try {
    const { title, description, status, dueDate } = req.body;

    if (!title || !status) {
      throw createError(400, "Title and status are required");
    }

    const newTask = taskRepo.create({
      title,
      description,
      status,
      dueDate,
    });

    const savedTask = await taskRepo.save(newTask);
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
 try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await taskRepo.findOneBy({ id });

    if (!task) {
      throw createError(404, "Task not found");
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ?? task.dueDate;

    const updatedTask = await taskRepo.save(task);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params;

    const result = await taskRepo.delete({ id });

    if (result.affected === 0) {
      throw createError(404, "Task not found");
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    next(err);
  }
};
