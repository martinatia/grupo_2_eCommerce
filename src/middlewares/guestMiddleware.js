function guestMiddleware(req, res, next){
    if(req.session.userToLoggedIn){
        return res.redirect('./profile')
    }
    next();
}

module.exports = guestMiddleware;