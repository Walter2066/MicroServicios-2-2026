import { DataSource } from "typeorm";

import { Candidato } from "../entity/Candidato.js";
import { Cargo } from "../entity/Cargo.js";
import { Lugar } from "../entity/Lugar.js";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Candidato, Cargo, Lugar],
  synchronize: true,
  logging: false,
});
