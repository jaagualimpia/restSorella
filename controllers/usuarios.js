const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  
  //const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};

  /*
  const usuarios = await Usuario.find(query)
     .skip(Number(desde))
     .limit(Number(limite));


  const total = await Usuario.countDocuments(query);   
  */

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
     .skip(Number(desde))
     .limit(Number(limite))
  ]);
  

  /*
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
    page,
    limit,
  });
  */
  
  
  res.json({
    total,
    usuarios
  });
  

  /*
  res.json({
    resp
  });
  */
  
};

const usuariosPost = async (req, res = response) => {
  const body = req.body;
  //const { nombre, correo, password, rol } = req.body;

  const usuario = new Usuario(body);
  //const usuario = new Usuario( nombre, correo, password, rol );

  //Verfificar el email
  /*
    const existeEmail = await Usuario.findOne({correo:usuario.correo})
    if (existeEmail){
        return res.status(400).json({
            msg: 'El correo ya esta registrado...'
        })
    }
    */

  //Encryptar la constraseña
  const salt = bcryptjs.genSaltSync();
  //let unpassword = usuario.password;
  usuario.password = bcryptjs.hashSync(usuario.password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};



const usuariosPut =  async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google,correo, ...resto } = req.body;

  if (password) {
    //Encryptar la constraseña
    const salt = bcryptjs.genSaltSync();
    //let unpassword = usuario.password;
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario =  await Usuario.findByIdAndUpdate( id, resto, { new: true });


  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //Borrado Fisico
  //const usuario = await Usuario.findByIdAndDelete(id);
  

  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false}, { new: true });


  res.json({
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
