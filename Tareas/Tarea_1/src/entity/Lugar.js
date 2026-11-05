import { EntitySchema } from "typeorm";

export const Lugar = new EntitySchema({
  name: "Lugar",
  tableName: "lugar",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 60,
    },
  },
});
