const Role = require("../models/role");

//const Usuario = require('../models/usuario')

const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la Base de Datos...`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo});
  if (existeEmail) {
    throw new Error(`El email ${correo} ya existe en la Base de Datos...`);

  }
};


const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);

  }
};


/**
 * Categorias
 */
const existeCategoriaPorId = async( id ) => {

  // Verificar si el correo existe
  const existeCategoria = await Categoria.findById(id);
  if ( !existeCategoria ) {
      throw new Error(`El id no existe ${ id }`);
  }
}

/**
* Productos
*/
const existeProductoPorId = async( id ) => {

  // Verificar si el correo existe
  const existeProducto = await Producto.findById(id);
  if ( !existeProducto ) {
      throw new Error(`El id no existe ${ id }`);
  }
}



module.exports = {
  esRoleValido,
  existeEmail,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId
};
