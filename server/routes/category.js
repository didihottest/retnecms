const express = require('express')
const router = express.Router()

const CategoryController = require('../controller/').categoryAPI;

router.post('/find', CategoryController.getCategoryFiltered);
router.get('/', CategoryController.getCategoryAll);
router.post('/', CategoryController.postCategory);
router.get('/:id', CategoryController.getCategoryById)
router.put('/:id', CategoryController.updateCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router