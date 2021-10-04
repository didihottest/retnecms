const express = require('express')
const router = express.Router()
const upload = require('../utils/uploadImage');
const NewsArticleController = require('../controller/').newsArticleAPI;

router.post('/', upload.fields([{
  name: 'image1', maxCount: 1
}, {
  name: 'image2', maxCount: 1
}]), NewsArticleController.createNewsArticle);

router.put('/:id', upload.fields([{
  name: 'image1', maxCount: 1
}, {
  name: 'image2', maxCount: 1
}]), NewsArticleController.updateNewsArticle);

router.delete('/:id', NewsArticleController.deleteNewsArticle)



module.exports = router
