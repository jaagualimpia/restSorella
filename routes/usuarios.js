
const { Router } = require('express');
const { check} = require('express-validator')

const Role = require('../models/role')

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')


const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
 
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete} = require('../controllers/usuarios');

const router = Router();



router.get('/',[
    validarCampos
],
usuariosGet );

router.put('/:id',[
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosPut );

router.post('/',[
 check('name','El nombre es obligatorio').not().isEmpty(),
 check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
 check('email','El correo no es valido').isEmail(),
 validarCampos
]
,usuariosPost );

router.delete('/:id',[
    check('id','No es un Id Valido...').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );

module.exports = router;