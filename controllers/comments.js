const send = require('../utils/index').send;
const sendConfirm = require('../utils/index').sendConfirm;
const sendError = require('../utils/index').sendError;
const isEmpty = require('../utils/index').isEmpty;
const isNullOrEmpty = require('../utils/index').isNullOrEmpty;
const ObjectId = require('mongodb').ObjectId;
const commentExample = {
    "_id": "646b00823133bff03513870e",
    "username": "bobthebuilder",
    "timestamp": 1519211809934,
    "body": "Third comment on the way-of-the-server tutorial page",
    "page": "tutorial",
    "parent": "none"
    }

class commentsController {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async allCommentsRoute(req, res) {
        if (!isEmpty(req.query)) {
            sendError(res, "Wrong endpoint--query id must be given with eg. /comments?id=646aff5b3133bff03513870d", 400);
            return;
        }
        let documents;
        try {
            documents = await this.dbConnection.queryCollection('comments');
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        console.log(documents);
        send(res, documents);
    }
    async readCommentRoute(req, res) {
        if (isNullOrEmpty(req.query.id)) {
            sendError(res, "Query id must be valid and given such as /comments?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const query = { _id: new ObjectId(req.query.id)};
        
        let document;
        try {
            document = await this.dbConnection.queryCollection('comments', query);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        send(res, document);
    }
    async createCommentRoute(req, res) {
        console.log("request body: ", req.body);
        if (isNullOrEmpty(req.body.username) || isNullOrEmpty(req.body.timestamp || isNullOrEmpty(req.body.body) || isNullOrEmpty(req.body.page) || isNullOrEmpty(req.body.parent))) {
            sendError(res, "There can be no null or empty fields for a comment. See errors object for an example of your object, and an example of a well-formed one.", 400, [req.body, commentExample]);
            return;
        }
        
        let cursor;
        try {
            cursor = await this.dbConnection.createDocument('comments', req.body);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 200, cursor)
    }  
    async updateCommentRoute(req, res) {
        if (isNullOrEmpty(req.query)) {
            sendError(res, "Query id must be valid and given such as /comments?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};

        console.log("request body: ", req.body);
        if (isNullOrEmpty(req.body.username) || isNullOrEmpty(req.body.timestamp || isNullOrEmpty(req.body.body) || isNullOrEmpty(req.body.page) || isNullOrEmpty(req.body.parent))) {
            sendError(res, "There can be no null or empty fields for a comment. See errors object for an example of your object, and an example of a well-formed one.", 400, [req.body, commentExample]);
            return;
        }
        
        try {
            await this.dbConnection.updateDocument(query, 'comments', req.body);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 204);
    }
    async deleteCommentRoute(req, res) {
        if (isNullOrEmpty(req.query.id)) {
            sendError(res, "Query id must be valid and given such as /comments?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        console.log("request id: ", queryParam);
        
        let cursor;
        try {
            cursor = await this.dbConnection.deleteDocument(query, 'comments');
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 200, cursor)
    }
}

module.exports = {
    commentsController
};