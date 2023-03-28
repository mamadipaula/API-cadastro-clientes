import { DataSource } from "typeorm";
import path from "path";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
      type: "sqlite",
      database: "db.sqlite3",
      logging: true,
      synchronize: false,
      entities: [path.join(__dirname, "./entities/**.{js,ts}")],
      migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
    }
);

export default AppDataSource;