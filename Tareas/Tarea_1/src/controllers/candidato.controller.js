import { AppDataSource } from "../config/data-source.js";
import { Candidato } from "../entity/Candidato.js";
import { Cargo } from "../entity/Cargo.js";
import { Lugar } from "../entity/Lugar.js";

// CREATE: Registrar candidato
export const crearCandidato = async (req, res) => {
  try {
    const candidato = AppDataSource.getRepository(Candidato);

    const { cargo_id, lugar_id, ...datos } = req.body;

    await candidato.save({
      ...datos,
      cargo: {
        id: Number(cargo_id),
      },
      lugar: {
        id: Number(lugar_id),
      },
    });

    res.redirect("/candidatos");
  } catch (error) {
    console.error("Error al registrar:", error);
    res.send("Error al registrar candidato");
  }
};

// READ: Listar candidatos
export const listarCandidatos = async (req, res) => {
  try {
    const candidato = AppDataSource.getRepository(Candidato);

    const lista = await candidato.find({
      relations: {
        cargo: true,
        lugar: true,
      },
    });

    res.render("candidatos/index", { lista });
  } catch (error) {
    res.send("Error al listar candidatos");
  }
};

// UPDATE: Actualizar candidato
export const actualizarCandidato = async (req, res) => {
  try {
    const candidato = AppDataSource.getRepository(Candidato);

    // Obtener los datos del formulario
    const datosActualizados = {
      nombres: req.body.nombres,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,

      cargo: {
        id: Number(req.body.cargo_id),
      },

      lugar: {
        id: Number(req.body.lugar_id),
      },
    };

    // Actualizar candidato por CI
    await candidato.update({ ci: req.params.ci }, datosActualizados);

    res.redirect("/candidatos");
  } catch (error) {
    console.error(error);
    res.send("Error al actualizar candidato");
  }
};

// DELETE: Eliminar candidato
export const eliminarCandidato = async (req, res) => {
  try {
    const candidato = AppDataSource.getRepository(Candidato);

    await candidato.delete({ ci: req.params.ci });

    res.redirect("/candidatos");
  } catch (error) {
    res.send("Error al eliminar candidato");
  }
};

// Mostrar formulario de registro
export const mostrarFormularioCrear = async (req, res) => {
  try {
    const cargos = await AppDataSource.getRepository(Cargo).find();
    const lugares = await AppDataSource.getRepository(Lugar).find();

    res.render("candidatos/crear", {
      cargos,
      lugares,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al cargar el formulario");
  }
};

// Mostrar formulario de edición
export const mostrarFormularioEditar = async (req, res) => {
  try {
    const candidatoRepo = AppDataSource.getRepository(Candidato);

    const candidato = await candidatoRepo.findOne({
      where: { ci: req.params.ci },
      relations: {
        cargo: true,
        lugar: true,
      },
    });

    const cargos = await AppDataSource.getRepository(Cargo).find();
    const lugares = await AppDataSource.getRepository(Lugar).find();

    res.render("candidatos/editar", {
      candidato,
      cargos,
      lugares,
    });
  } catch (error) {
    console.error(error);
    res.send("Error al cargar el candidato");
  }
};
