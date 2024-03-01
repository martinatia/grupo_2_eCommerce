function adminMiddleware(req, res, next){
    if(req.session.userToLoggedIn && !(req.session.userToLoggedIn.category === 'Administrador')){
        return res.redirect('/')
    }
    next();
}

module.exports = adminMiddleware;