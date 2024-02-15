function userMiddleware (req, res, next) {
    res.locals.isLoggedIn = false;

    if(req.session && req.session.userToLoggedIn){
        res.locals.isLoggedIn = true;
    }

    next();
}

module.exports = userMiddleware;