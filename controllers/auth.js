const { response } = require("express");

//const { Usuario} = require("../models/usuario");
const Usuario = require("../models/usuario");

const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    console.log(usuario);
    if (!usuario) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: "Usuario / Password no son correctos - correo: " + correo,
        });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: "Usuario / Password no son correctos - estado: false",
        });
    }

    const validaPassword = bcryptjs.compareSync(password, usuario.password);
    // Verificar la contraseña

    if (!validaPassword) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: "Usuario / Password no son correctos - password",
        });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: "Login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador...",
      error: error,
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {

    const {nombre,img,correo} = await googleVerify(id_token);
    
    //const googleUser = await googleVerify(id_token);
    //console.log(googleUser);

    let usuario = await Usuario.findOne({correo})

    //Valida el usuario para crearlo sino existe...
    if (!usuario){
        const data = {
            nombre,
            correo,
            password: ':P',
            img,
            google: true
        }

        usuario = new Usuario(data);
        await usuario.save();
    }

    //Verifica si el Usuario esta Bloqueado
    if (!usuario.estado){
        return res.status(401).json({
            //ok:true,
            msg: 'Hable con el administrador, usuario Bloqueado'
        })
    }


    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        ok: true,
        msg: "Login ok",
        usuario,
        token,
      });
  
  } catch (error) {
    json.status(400).json({
        ok:false,
        msg:'El token no se pudo verificar',
        error: error
    })
  }
};

module.exports = {
  login,
  googleSignIn,
};
