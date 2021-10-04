const AppError = require('../utils/appError');

const categoryRoutes = require('./category')
const newsArticleRoutes = require('./news_article')
const roleRoutes = require('./role')
const userRoutes = require('./user')
const authRoutes = require('./userSign')
const acl = require('express-acl');
const verifyJwtController = require('../controller/VerifySign')
const NewsArticleController = require('../controller/').newsArticleAPI;

acl.config({
  filename: 'nacl.json',
  baseUrl: '/',
  // rules: arrayRole
});

module.exports = function (app, express) {
  /*Definisikan semua route dihalaman ini*/
  const ROUTER = express.Router();

  // Use Import other Router
  ROUTER.use(
    '/category',
    [verifyJwtController.verifyToken, acl.authorize],
    categoryRoutes
  );
  ROUTER.use(
    '/news-article',
    [verifyJwtController.verifyToken, acl.authorize],
    newsArticleRoutes
  );
  ROUTER.use(
    '/role',
    [verifyJwtController.verifyToken, acl.authorize],
    roleRoutes
  );
  ROUTER.use(
    '/user',
    [verifyJwtController.verifyToken, acl.authorize],
    userRoutes
  );

  ROUTER.use(
    '/login',
    authRoutes
  );

  // public news article list
  app.get('/news-article/', NewsArticleController.getNewsArticleAll);
  app.get('/news-article/:id', NewsArticleController.getNewsArticleById);
  app.post('/news-article/find', NewsArticleController.getNewsArticle);

  // Set Global baseUrl
  app.use('/', ROUTER);

  /*ERROR HANDLING*/
  app.all('*', (req, res, next) => {
    throw new AppError(404, `Request URL ${req.path} not Found!`);
  });

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      error: statusCode,
      message: err.message
      // stack: err.stack
    });
  });
  /*END ERROR HANDLING*/
};
