const categoryAPI = require('./CategoryController')
const roleAPI = require('./RoleController')
const newsArticleAPI = require('./NewsArticleController')
const userAPI = require('./UsersController')
const WhoIs = require('./WhoIs')
const verifySign = require('./VerifySign')

module.exports = {
  categoryAPI,
  newsArticleAPI,
  roleAPI,
  userAPI,
  WhoIs,
  verifySign
}