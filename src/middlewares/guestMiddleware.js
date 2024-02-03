function guestMiddleware(req, res, next){
    if(req.session.userToLoggedIn){
        return res.redirect('./profiles')
    }
    next();
}

module.exports = guestMiddleware;