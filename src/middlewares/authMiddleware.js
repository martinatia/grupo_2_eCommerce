function authMiddleware(req, res, next){
    if(!req.session.userToLoggedIn){
        return res.redirect('./login')
    }
    next();
}

module.exports = authMiddleware;