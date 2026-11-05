import { EntitySchema } from "typeorm";

export const Candidato = new EntitySchema({
  name: "Candidato",
  tableName: "candidatos",

  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
      unsigned: true,
    },
    ci: {
      type: "varchar",
      length: 12,
    },
    nombres: {
      type: "varchar",
      length: 60,
      nullable: false,
    },
    apellido1: {
      type: "varchar",
      length: 30,
      nullable: false,
    },
    apellido2: {
      type: "varchar",
      length: 40,
    },
  },

  relations: {
    cargo: {
      type: "many-to-one",
      target: "Cargo",
      joinColumn: {
        name: "cargo_id",
      },
    },

    lugar: {
      type: "many-to-one",
      target: "Lugar",
      joinColumn: {
        name: "lugar_id",
      },
    },
  },
});
