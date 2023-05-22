
function setHeader(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
}
function send(res, json) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json(json);
}
function getParam(param) {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get(param);
  }

module.exports = {
    send,
    getParam,
    setHeader
};