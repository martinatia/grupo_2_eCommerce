/* Responsabilidad de Martin */
const fs = require ('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    userLogin: (req,res) => {

        const loginData = {
            email: req.body.email,
            password: req.body.password,
        }        
        
        const errors = validationResult(req);

        if(errors.isEmpty()){
            //verificacion de usuario logueado
            let userToLogin;

            for(let i = 0; i < users.length; i++){
                if(users[i].email == loginData.email){
                    if(bcrypt.compareSync(loginData.password, users[i].password)){
                        userToLogin = users[i];
                        res.redirect('/');
                        break;
                    }
                }
            }

            if(!userToLogin){
                res.render('users/login', {errors: [{msg: 'Credenciales invalidas'}]}); //revisar
            }

            req.session.userToLoggedIn = userToLogin;

            if(res.body.remember != undefined){
                res.cookie('remember', userToLogin.email, { maxAge: 60000 }); //revisar
            }
            
        }else{
            res.render('users/login', { errors: errors.mapped()});
        }  
        
    },
    registration: (req,res) => {
        res.render('users/registration');
    },
    newUser: (req, res) => {

        const errors = validationResult(req);
        
        if(errors.isEmpty()){
            
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);

            // último ID
            const lastIdSaved = users[users.length - 1].id;
            const newUser = {
                //crea un ID mas
                id: lastIdSaved + 1,
                name: req.body.name,
                email: req.body.email,
                mailConfirmation: req.body.mailConfirmation,
                password: hashedPassword,
                image: req.file.filename,
            };
            //agrega el ID creado
            users.push(newUser);
            // actualizar el archivo users.json
            fs.writeFileSync(usersFilePath, JSON.stringify(users));

            res.redirect('/');

        }else{

            res.render('users/registration', { errors: errors.mapped(), oldDate: req.body });

        }

    },
    shoppingCart: (req, res) => {
        res.render('users/shopping-cart');
    }
}
module.exports = controller;