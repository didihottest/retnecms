const express = require('express');
const router = express.Router();
const upload = require('../utils/uploadProfileImage');

const UserController = require('../controller').userAPI;

router.get('/', UserController.getUserAll);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.post('/find', UserController.getUser);
router.post('/search', UserController.getByUsername);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser)
router.post('/profile/:id', upload.single('file'), UserController.createUserProfile)
router.put('/profile/:id', upload.single('file'), UserController.updateUserProfile)



module.exports = router;