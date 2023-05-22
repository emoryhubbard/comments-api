const send = require('../utils/index').send;
const ObjectId = require('mongodb').ObjectId;

class commentsController {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async allCommentsRoute(req, res) {
        const documents = await this.dbConnection.queryCollection('comments');
        send(res, documents);
    };
    async oneCommentRoute(req, res) {
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        const document = await this.dbConnection.queryCollection('comments', query);
    
        send(res, document);
    }
    async createCommentRoute(req, res) {
        console.log("request body: ", req.body);
        await this.dbConnection.createDocument('comments', req.body);
    }
}

module.exports = {
    commentsController
};