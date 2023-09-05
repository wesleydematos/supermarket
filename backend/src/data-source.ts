import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { InitialMigration1693932883232 } from "./migrations/1693932883232-initialMigration";
import Product from "./entities/Product";
import Pack from "./entities/Pack";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  logging: true,
  entities: [Product, Pack],
  migrations: [InitialMigration1693932883232],
  subscribers: [],
});
