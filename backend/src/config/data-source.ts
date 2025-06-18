import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "../entities/Task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH || "database.sqlite",
  entities: [Task],
  synchronize: true,
  logging: false,
});
