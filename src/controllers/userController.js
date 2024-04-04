/* Responsabilidad de Martin */
const fs = require ('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { Console } = require('console');
const db = require('../database/models')

//Usabamos cuando teniamos la base de datos json
//const usersFilePath = path.join(__dirname, '../data/users.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//Esto no se para que estaba
//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const users = db.users;

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
            
            users.findAll()
            .then((dataUsers) => {
                
                let userFound = false;
                
                for(let i = 0; i < dataUsers.length; i++){
                    if(dataUsers[i].dataValues.email == loginData.email){
                        if(bcrypt.compareSync(loginData.password, dataUsers[i].dataValues.password)){
                            let userToLogin = dataUsers[i].dataValues;
                            req.session.userToLoggedIn = userToLogin;
                            if(req.body.remember != undefined){
                                res.cookie('remember', userToLogin.email, { maxAge: 60000 }); 
                            }
                            
                            userFound = true;
                            break;

                        }else{

                            return res.render('users/login', {errors: {password: {msg: 'Correo o contraseña incorrecta'}}});

                        }
                        
                    }
                }

                if(userFound) {
                    res.redirect('/');
                } else {
                    res.render('users/login', { errors: { password: { msg: 'Correo o contraseña incorrecta' } }});
                }
            })
            .catch((error) => {
                console.log(error)
            })

        }else{
            return res.render('users/login', { errors: errors.mapped()});
        }  
        
    },
    logout: (req, res) => {
        
        res.clearCookie('remember');
        req.session.destroy()
        res.redirect('/users/login')
        
    },
    saveData: (req, res) => {
        
        let admin = '123456789';

        const dataUserProfile = {
            firstname: req.body['profile-nombre'],
            surname: req.body['profile-apellido'],
            email: req.body['profile-email'],
            adress: req.body['profile-adress'],
            passwordCurrent: req.body['profile-password-current'],
            passwordNew: req.body['profile-password-new'],
            codeAdmin: req.body['profile-password-admin'],
            category: req.body['profile-category'],
            country: req.body['profile-country'],
            province: req.body['profile-province'],
        }

        const session = req.session.userToLoggedIn;

        const errors = validationResult(req);

        
        if(errors.isEmpty()){

            for(let i = 0; i < users.length; i++){
                
                if(users[i].email === session.email){
                
                    if(!(dataUserProfile.passwordCurrent == "") && bcrypt.compareSync(dataUserProfile.passwordCurrent, users[i].password)){

                        dataUserProfile.passwordCurrent = "";

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
                        
                        if(dataUserProfile.adress){
                            users[i].adress = dataUserProfile.adress;
                        }

                        if(dataUserProfile.passwordNew){
                            const hashedPasswordProfile = bcrypt.hashSync(dataUserProfile.passwordNew, 10);
                            users[i].password = hashedPasswordProfile;
                        }

                        console.log(dataUserProfile.category)

                        if(dataUserProfile.codeAdmin){
                            if(dataUserProfile.category){
                                if(dataUserProfile.category === "Administrador"){
                                    if(dataUserProfile.codeAdmin === admin){
                                        users[i].category = dataUserProfile.category;
                                    }else{
                                        return res.render('users/profile', {errors: {['profile-password-admin']: {msg: 'Código inválido'}}, user: session});
                                    }
                                }
                                users[i].category = dataUserProfile.category;
                                delete dataUserProfile.codeAdmin;
                            }
                            
                            delete dataUserProfile.codeAdmin;

                        }else{
                            console.log(dataUserProfile.category)
                            if(dataUserProfile.category && dataUserProfile.category === 'Comprador'){
                                users[i].category = dataUserProfile.category;
                            }else{
                                
                                if(dataUserProfile.category && dataUserProfile.category === 'Administrador'){
                                    console.log('por aqui')
                                    return res.render('users/profile', {errors: {['profile-password-admin']: {msg: 'Debe ingresar el código de administrador'}}, user: session});
                                } 
                            }
                            
                            delete dataUserProfile.codeAdmin;
                        }

                        if(dataUserProfile.country){
                            users[i].country = dataUserProfile.country;
                        }

                        if(dataUserProfile.province){
                            users[i].province = dataUserProfile.province;
                        }   
                        
                        if(req.file){
                            users[i].image = req.file.filename;
                        }
                        
                        break;

                    }else{

                        return res.render('users/profile', {errors: {['profile-password-current']: {msg: 'Credenciales incorrectas'}}, user: session});                 
    
                    }
                }
            }
            
        }else{
            return res.render('users/profile', { errors: errors.mapped(), user: session});
            
        }

        //se hace esta validacion para verificar que alguno de estos campos fue completado por el usuario logueado para ser modificados en la base de datos,
        //en el caso que no se haga esta validacion, aunque no se haya modificado nada, me modifica la base de datos y por lo tanto me reinicia el servidor
        if(dataUserProfile.adress == "" && dataUserProfile.category == "" && dataUserProfile.country == "" && dataUserProfile.province == ""){
            return res.redirect('/users/profile');
        }

        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        res.redirect('/users/login');
        

        /* Estas lineas de codigo hacen que no se cierre la sesion despues de un cambio, pero produce un error que hace que se reinicie el servidor por ende
        se borre la variable session 'req.session.userToLoggedIn' y no se puede volver a modificar los datos del perfil porque desaparece el usuario logueado
        
        if(!(dataUserProfile.passwordNew == "")){

            res.clearCookie('remember');
            req.session.destroy()
            res.redirect('/users/login')

        }else{
            res.redirect('/users/profile');

        }

        */
        
       
        
    },
    registration: (req,res) => {
        res.render('users/registration');
    },
    newUser: (req, res) => {

        const errors = validationResult(req);
        
        
        if(errors.isEmpty()){
            
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            
            // último ID
            //const lastIdSaved = users[users.length - 1].id;
            let imagenURL;

            if(!req.file){
                imagenURL = 'avatarDefault.png';
            }else{
                imagenURL = req.file.filename;
            }

            let ok = 0;

            users.findAll()
            .then((dataUsers) => {
                if(req.body.email === req.body.emailConfirmation){
                    for(let i = 0; i < dataUsers.length; i++){
                        if(dataUsers[i].dataValues.email === req.body.email){
                            
                            ok = 1;
                            res.render('users/registration', {errors: {email: {msg: 'Este correo ya esta registrado'}}});
                            break;
    
                        }
                    }
                    if(ok == 0){
                        //agrega el usuario creado
                        users.create ({
                            first_name: req.body.firstname,
                            last_name: req.body.surname,
                            address: 'Publica s/n',
                            password: hashedPassword,
                            email: req.body.email,
                            user_type: "Comprador",
                            profile_image_url: imagenURL,
                            date_created: Date.now()
                        });
            
                        //actualizar el archivo users.json
                        //fs.writeFileSync(usersFilePath, JSON.stringify(users));
                        //redirige al login para loguearte 
                        res.redirect('/users/login');
                    }
                }else{
                    res.render('users/registration', {errors: {email: {msg: 'Los correos no coinciden'}}});
                }
            })

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