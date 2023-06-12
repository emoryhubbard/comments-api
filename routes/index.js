const express = require('express');
const DBConnection = require('../utils/dbconnection').DBConnection;
const CommentsController = require('../controllers/comments').commentsController;
const UserinfoController = require('../controllers/userinfo').userinfoController;

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();
const dbConnection = new DBConnection();
const commentsController = new CommentsController(dbConnection);
const userinfoController = new UserinfoController(dbConnection);

// OAuth-related middlewares
/*app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());*/

// Auth0-related middlewares
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
})

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerDocument));
router.get('/all-comments', commentsController.allCommentsRoute.bind(commentsController));
router.get('/comments', commentsController.readCommentRoute.bind(commentsController));
router.post('/comments', requiresAuth(), commentsController.createCommentRoute.bind(commentsController));
router.put('/comments', requiresAuth(), commentsController.updateCommentRoute.bind(commentsController));
router.delete('/comments', requiresAuth(), commentsController.deleteCommentRoute.bind(commentsController));

router.get('/all-userinfo', userinfoController.alluserinfoRoute.bind(userinfoController));
router.get('/userinfo', userinfoController.readuserinfoRoute.bind(userinfoController));
router.post('/userinfo', requiresAuth(), userinfoController.createuserinfoRoute.bind(userinfoController));
router.put('/userinfo', requiresAuth(), userinfoController.updateuserinfoRoute.bind(userinfoController));
router.delete('/userinfo', requiresAuth(), userinfoController.deleteuserinfoRoute.bind(userinfoController));

/*
router.post('/userinfo', requiresAuth(), userinfoController.createuserinfoRoute.bind(userinfoController));
router.put('/userinfo', requiresAuth(), userinfoController.updateuserinfoRoute.bind(userinfoController));
router.delete('/userinfo', requiresAuth(), userinfoController.deleteuserinfoRoute.bind(userinfoController));
*/
module.exports = router;