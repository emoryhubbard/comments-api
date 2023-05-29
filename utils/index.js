
function setHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}
function send(res, json, status = 200) {
    res.setHeader('Content-Type', 'application/json');
    res.status(status);
    res.json(json);
}
function sendConfirm(res, status = 200, ... messages) {
// Messages exists in case multiple, more detailed
// log statements should be sent to confirm operations.
// Note that the json body of the response is silently emptied
// if you specify a 204 status code.
    json = {
        "apiVersion": "1.0",
        "data": {
          "code": status,
          "messages": messages
        }
      };
    res.setHeader('Content-Type', 'application/json');
    res.status(status);
    res.json(json);
}
function sendError(res, message, status = 404, ... errors) {
// Errors exists in case more detailed error information
// or information on multiple errors is needed, but it is
// optional:
/*{
  "apiVersion": "1.0",
  "error": {
    "code": 404,
    "message": "File Not Found",
    "errors": [{
      "domain": "Calendar",
      "reason": "ResourceNotFoundException",
      "message": "File Not Found
    }]
  }
}*/
    json = {
        "apiVersion": "1.0",
        "errors": {
          "code": status,
          "message": message,
          "errors": errors
        }
      };
    res.setHeader('Content-Type', 'application/json');
    res.status(status);
    res.json(json);
}
function getParam(param) {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get(param);
  }
function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
}
function isNullOrEmpty(obj) {
    return (JSON.stringify(obj) === "{}" || obj == null || obj == "");
}

module.exports = {
    send,
    getParam,
    setHeader,
    sendConfirm,
    sendError,
    isEmpty,
    isNullOrEmpty
};