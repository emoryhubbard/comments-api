const express = require('express');
const DBConnection = require('../utils/dbconnection').DBConnection;
const CommentsController = require('../controllers/comments').commentsController;
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const router = express.Router();
const dbConnection = new DBConnection();
const commentsController = new CommentsController(dbConnection);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));
router.get('/all-comments', commentsController.allCommentsRoute.bind(commentsController));
router.get('/comments', commentsController.readCommentRoute.bind(commentsController));
router.post('/comments', commentsController.createCommentRoute.bind(commentsController));
router.put('/comments', commentsController.updateCommentRoute.bind(commentsController));
router.delete('/comments',commentsController.deleteCommentRoute.bind(commentsController));

module.exports = router;