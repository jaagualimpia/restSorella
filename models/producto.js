const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    colores: [{
        type: String,
        required: true
    }],
    descripcion: { type: String },
    disponible: { type: Boolean, defult: true },
    imagenes: [{
        url: { type: String },
        posicion: { type: Number }
    }],
});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}



module.exports = model( 'Producto', ProductoSchema );
