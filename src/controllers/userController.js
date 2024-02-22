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
            for(let i = 0; i < users.length; i++){
                if(users[i].email == loginData.email){
                    if(bcrypt.compareSync(loginData.password, users[i].password)){
                        let userToLogin = users[i];
                        userToLogin.password = userToLogin.password; 
                        req.session.userToLoggedIn = userToLogin;
                        if(req.body.remember != undefined){
                            res.cookie('remember', userToLogin.email, { maxAge: 60000 }); 
                        }
                        res.redirect('/users/profile');
                    } 
                }
            }

            if(!req.session.userToLoggedIn){
                res.render('users/login', {errors: {email: {msg: 'El correo electrónico no se encuentra en nuestra base de datos'}}});
            }

          
            
        }else{
            res.render('users/login', { errors: errors.mapped()});
        }  
        
    },
    logout: (req, res) => {
        res.clearCookie('remember');
        req.session.destroy()
        res.redirect('/users/login')
    },
    saveData: (req, res) => {
        console.log(req.body)
        
        
        
         const dataUserProfile = {
            name: req.body['profile-nombre'],
            email: req.body['profile-email'],
            adress: req.body['profile-adress'],
            country: req.body['profile-country'],
            province: req.body['profile-province']

        }
        

        res.send(dataUserProfile)
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
    },
    profile: (req, res) => {
        res.render('users/profile', {user: req.session.userToLoggedIn});
    }
}
module.exports = controller;