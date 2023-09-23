const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto, Role } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'productosXCategoria',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const productos = await Producto.find({ nombre: regex, estado: true })
                            .populate('categoria','nombre')

    res.json({
        results: productos
    });

}


const buscarProductosByCategoria = async( termino = '',categoria = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    const esCategoriaID = ObjectId.isValid( categoria ); // TRUE 


    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                            .populate('categoria','nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }

    if ( esCategoriaID ) {

        const unaCategoria = new ObjectId(categoria)
        console.log(unaCategoria)

        const regex = new RegExp(unaCategoria);
        console.log(regex);

        try{
            const productos = await Producto.find({ categoria: unaCategoria, estado: true })
            .populate('categoria','nombre')

            res.json({
                results: products
            });

        } catch(error){
            res.json({
                results: error
            });

        }

    }

}




const buscarRoles = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const rol = await Role.findById(termino);
        return res.json({
            results: ( rol ) ? [rol ] : []
        });
    }

    const regex = new RegExp( termino, 'i' );
    const roles = await Role.find({ rol: regex })

    res.json({
        results: roles
    });

}



const buscar = ( req, res = response ) => {
    
    const { coleccion, termino, categoria  } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;

        case 'categorias':
            buscarCategorias(termino, res);
        break;

        case 'productos':
            buscarProductos(termino, res);
        break;

        case 'productosXCategoria':
            buscarProductosByCategoria(termino, categoria, res);
        break;


        case 'roles':
            buscarRoles(termino, res);
        break;


        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsquda'
            })
    }

}



module.exports = {
    buscar
}