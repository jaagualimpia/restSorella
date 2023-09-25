const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El correo  es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La Contraseña es obligatoria']
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
        enum: ['ADMIN_ROLE','USER_ROLE']
    }
});

//Quita los campos que no quiero ver.
UsuarioSchema.methods.toJSON = function() {
    const {__v,password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);