
const { Router } = require('express');
const { check} = require('express-validator')

const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
 
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut );

router.post('/',[
 check('nombre','El nombre es obligatorio').not().isEmpty(),
 check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
 check('correo','El correo no es valido').isEmail(),
 //check('rol','No es un rol valido').isIn('ADMIN_ROLE','USER_ROLE'),
 /*
 check('rol').custom( async (rol = '') => {
    const existeRol = await Role.findOne({ rol});
    if (!existeRol){   
        throw new Error(`El rol ${ rol} no existe en la Base de Datos...`);
    }
 }),
 */
 check('rol').custom(esRoleValido),
 check('correo').custom(existeEmail),
 validarCampos
]
,usuariosPost );

router.delete('/:id',[
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;