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
                        req.session.userProfilePassword = userToLogin.password;
                        userToLogin.password = ''; 
                        req.session.userToLoggedIn = userToLogin;
                        if(req.body.remember != undefined){
                            res.cookie('remember', userToLogin.email, { maxAge: 60000 }); 
                        }
                        
                        res.redirect('/');
                    }else{
                        res.render('users/login', {errors: {password: {msg: 'Correo o contraseña incorrecta'}}});
                    } 
                }
            }

            if(!req.session.userToLoggedIn){
                res.render('users/login', {errors: {email: {msg: 'Correo o contraseña incorrecta'}}});
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
        
        const dataUserProfile = {
            firstname: req.body['profile-nombre'],
            surname: req.body['profile-surname'],
            email: req.body['profile-email'],
            adress: req.body['profile-adress'],
            passwordCurrent: req.body['profile-password-current'],
            passwordNew: req.body['profile-password-new'],
            country: req.body['profile-country'],
            province: req.body['profile-province'],
        }

        const errors = validationResult(req);

        if(!(dataUserProfile.passwordCurrent == "") && bcrypt.compareSync(dataUserProfile.passwordCurrent, req.session.userProfilePassword)){
            
            if(errors.isEmpty()){
            
                if(req.session.userToLoggedIn){

                    for(let i = 0; i < users.length; i++){
                        
                        if(users[i].email === req.session.userToLoggedIn.email){
                            // valida si existe cada una de las propiedades del objeto dataUserProfile que seria los campos que quiere modificar el usuario en su perfil
                            if(dataUserProfile.firstname){
                                users[i].firstname = dataUserProfile.firstname;
                            }
                            
                            if(dataUserProfile.surname){
                                users[i].surname = dataUserProfile.surname;
                            }

                            if(dataUserProfile.email){
                                users[i].email = dataUserProfile.email;
                            }
                        
                            if(dataUserProfile.passwordNew){
                                const hashedPasswordProfile = bcrypt.hashSync(dataUserProfile.passwordNew, 10);
                                users[i].password = hashedPasswordProfile;
                            }else{
                                users[i].password = req.session.userProfilePassword;
                            }

                            if(dataUserProfile.country){
                                users[i].country = dataUserProfile.country;
                            }

                            if(dataUserProfile.province){
                                users[i].province = dataUserProfile.province;
                            }   
                        
                            if(req.file.filename){
                                users[i].image = req.file.filename;
                            }else{
                                users[i].image = 'avatarDefault.png'
                            }
                            
                            break;

                        }
                    }

                    fs.writeFileSync(usersFilePath, JSON.stringify(users));

                    req.session.userProfilePassword = '';

                    if(dataUserProfile.passwordNew){

                        res.clearCookie('remember');
                        req.session.destroy()
                        res.redirect('/users/login')

                    }else{

                        res.redirect('/users/profile');

                    }

                    

                }else{

                    res.render('users/profile', {errors: {['profile-password-current']: {msg: 'Credenciales incorrectas'}}, user: req.session.userToLoggedIn});

                }

                
            }else{

                res.render('users/profile', { errors: errors.mapped(), user: req.session.userToLoggedIn}); 

            }
            
        }else{

            res.render('users/profile', {errors: {['profile-password-current']: {msg: 'Credenciales incorrectas'}}, user: req.session.userToLoggedIn});
            
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
                firstname: req.body.firstname,
                surname: req.body.surname,
                email: req.body.email,
                emailConfirmation: req.body.emailConfirmation,
                password: hashedPassword,
            };

            if(!req.file){
                newUser.image = 'avatarDefault.png';
            }else{
                newUser.image = req.file.filename;
            }

            let ok = 0;

            if(newUser.email === newUser.emailConfirmation){
                for(let i = 0; i < users.length; i++){
                    if(users[i].email === newUser.email){
                        
                        ok = 1;
                        res.render('users/registration', {errors: {email: {msg: 'Este correo ya esta registrado'}}});
                        break;

                    }
                }
                if(ok == 0){
                    //agrega el usuario creado
                    users.push(newUser);
                    //actualizar el archivo users.json
                    fs.writeFileSync(usersFilePath, JSON.stringify(users));
                    //redirige al login para loguearte 
                    res.redirect('/users/login');
                }
            }else{
                res.render('users/registration', {errors: {email: {msg: 'Los correos no coinciden'}}});
            }

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