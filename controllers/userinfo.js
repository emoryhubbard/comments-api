const send = require('../utils/index').send;
const sendConfirm = require('../utils/index').sendConfirm;
const sendError = require('../utils/index').sendError;
const isEmpty = require('../utils/index').isEmpty;
const isNullOrEmpty = require('../utils/index').isNullOrEmpty;
const ObjectId = require('mongodb').ObjectId;
const userinfoExample = {
    "username": "emoryhubbard",
	"email": "ehubbard@yahoo.com",
	"usersince": 1519211809934,
	"mode": "dark",
	"rank": "padawan",
	"role": "visitor",
	"badges": ["bronze", "first-post"],
	"aboutme": "[Edit 1] Born in Maryland. Still lives in Maryland. Tries to survive mosquitos."
}

class userinfoController {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async alluserinfoRoute(req, res) {
        if (!isEmpty(req.query)) {
            sendError(res, "Wrong endpoint--query id must be given with eg. /userinfo?id=646aff5b3133bff03513870d", 400);
            return;
        }
        let documents;
        try {
            documents = await this.dbConnection.queryCollection('userinfo');
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        console.log(documents);
        send(res, documents);
    }
    async readuserinfoRoute(req, res) {
        if (isNullOrEmpty(req.query.id)) {
            sendError(res, "Query id must be valid and given such as /userinfo?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const query = { _id: new ObjectId(req.query.id)};
        
        let document;
        try {
            document = await this.dbConnection.queryCollection('userinfo', query);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        send(res, document);
    }
    async createuserinfoRoute(req, res) {
        console.log("request body: ", req.body);
        if (isNullOrEmpty(req.body.username) || isNullOrEmpty(req.body.timestamp || isNullOrEmpty(req.body.body) || isNullOrEmpty(req.body.page) || isNullOrEmpty(req.body.parent))) {
            sendError(res, "There can be no null or empty fields for a userinfo. See errors object for an example of your object, and an example of a well-formed one.", 400, [req.body, userinfoExample]);
            return;
        }
        
        let cursor;
        try {
            cursor = await this.dbConnection.createDocument('userinfo', req.body);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 200, cursor)
    }  
    async updateuserinfoRoute(req, res) {
        if (isNullOrEmpty(req.query)) {
            sendError(res, "Query id must be valid and given such as /userinfo?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};

        console.log("request body: ", req.body);
        if (isNullOrEmpty(req.body.username) || isNullOrEmpty(req.body.timestamp || isNullOrEmpty(req.body.body) || isNullOrEmpty(req.body.page) || isNullOrEmpty(req.body.parent))) {
            sendError(res, "There can be no null or empty fields for a userinfo. See errors object for an example of your object, and an example of a well-formed one.", 400, [req.body, userinfoExample]);
            return;
        }
        
        try {
            await this.dbConnection.updateDocument(query, 'userinfo', req.body);
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 204);
    }
    async deleteuserinfoRoute(req, res) {
        if (isNullOrEmpty(req.query.id)) {
            sendError(res, "Query id must be valid and given such as /userinfo?id=646aff5b3133bff03513870d", 400);
            return;
        }
        const queryParam = req.query.id;
        const query = { _id: new ObjectId(queryParam)};
        console.log("request id: ", queryParam);
        
        let cursor;
        try {
            cursor = await this.dbConnection.deleteDocument(query, 'userinfo');
        } catch (e) {
            sendError(res, `Could not perform the requested database operation. See errors object for more details. Exception name: ${e.name} Message: ${e.message}`, 500, e);
            return;
        }
        sendConfirm(res, 200, cursor)
    }
}

module.exports = {
    userinfoController
};