function protectRoute(req,res,next) {
    const user = req.session.user
    if(!user) {
        res.status(403);
        return res.send({error: "You are not signed in!"});
    }
    next();
}

module.exports = protectRoute;