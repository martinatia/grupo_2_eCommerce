const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


function rememberMiddleware(req, res, next) {
    next();
    if(req.cookies.remember != undefined && req.session.userToLoggedIn == undefined){
        
        let userToLogin;

        for(let i = 0; i < users.length; i++){
            if(users[i].email == req.cookies.remember){
                userToLogin = users[i];
                break;
            }
        }

        req.session.userToLoggedIn = userToLogin;
        
    }
    
}

module.exports = rememberMiddleware;