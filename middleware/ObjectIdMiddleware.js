
const ObjectId = require('mongoose').Types.ObjectId

function ObjectIdMiddleware(req, res, next) {
    const {id} = req.body;
    if(!ObjectId.isValid(id)) {
        res.status(400)
        return res.send('{"error":"Invalid id"}')
    }
    next();
}

module.exports = ObjectIdMiddleware;