const express = require('express')
const router = express.Router()

const RoleController = require('../controller/').roleAPI;

router.post('/find', RoleController.getRoleFiltered);
router.get('/', RoleController.getRoleAll);
router.post('/', RoleController.postRole);
router.get('/:id', RoleController.getRoleById)
router.put('/:id', RoleController.updateRole)
router.delete('/:id', RoleController.deleteRole)

module.exports = router