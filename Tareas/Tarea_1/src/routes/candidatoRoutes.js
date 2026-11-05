import { Router } from "express";

import {
  crearCandidato,
  listarCandidatos,
  actualizarCandidato,
  eliminarCandidato,
  mostrarFormularioCrear,
  mostrarFormularioEditar,
} from "../controllers/candidato.controller.js";

const router = Router();

// READ: Listar candidatos
router.get("/", listarCandidatos);

// CREATE: Registrar candidato
router.post("/", crearCandidato);

// UPDATE: Actualizar candidato
router.post("/editar/:ci", actualizarCandidato);

// DELETE: Eliminar candidato
router.post("/eliminar/:ci", eliminarCandidato);

router.get("/crear", mostrarFormularioCrear);

router.get("/editar/:ci", mostrarFormularioEditar);

export default router;
