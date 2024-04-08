const fs = require ('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const db = require('../database/models');
//const { Console } = require('console');

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
            
            users.findAll()
            .then((dataUsers) => {
                
                let userFound = false;
                
                //verificacion de usuario logueado
                //recorre el total de usuarios
                for(let i = 0; i < dataUsers.length; i++){
                    //verifica que el email de la base de datos coincida con el email que viene del body
                    if(dataUsers[i].dataValues.email == loginData.email){
                        //compara las contraseñas del body con la de la base de datos
                        if(bcrypt.compareSync(loginData.password, dataUsers[i].dataValues.password)){
                            //Guarda el usuario logueado en la variable userToLogin
                            let userToLogin = dataUsers[i].dataValues;
                            //Guarda el usuario logueado en la variable session
                            req.session.userToLoggedIn = userToLogin;
                            //Verifica si esta tildado el checkbox de recuerdame
                            if(req.body.remember != undefined){
                                //Crea la cookie
                                res.cookie('remember', userToLogin.email, { maxAge: 60000 }); 
                            }
                            //Cuando encuentra al usuario cambia la variable userFound a true
                            userFound = true;
                            //Corta el ciclo
                            break;

                        }else{

                            return res.render('users/login', {errors: {password: {msg: 'Correo o contraseña incorrecta'}}});

                        }
                        
                    }
                }

                //Verifica si se encontro el usuario
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
        //elimina la cookie
        res.clearCookie('remember');
        //elimina la variable session
        req.session.destroy()
        res.redirect('/users/login')
        
    },
    saveData: (req, res) => {
        
        //Esta variable sirve como validacion, solo colocando esta clave se puede ser administrador
        //let admin = '123456789';

        const session = req.session.userToLoggedIn;

        const errors = validationResult(req);

        console.log('por aqui si');
        if(errors.isEmpty()){
        
            users.findAll()
            .then((dataUsers) => {
                /* 
                
                    for(let i = 0; i < users.length; i++){
                
                    if(dataUsers[i].dataValues.email === session.email){
                    
                        if(!(dataUserProfile.passwordCurrent == "") && bcrypt.compareSync(dataUserProfile.passwordCurrent, dataUsers.[i].dataValues.password)){
    
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
                
                */
                
                let userFound = false;
                let passwordNew;
                
                //recorre por cada usuario en la base de datos
                for(let i = 0; i < dataUsers.length; i++){
                    //confirma si el email de la base de datos es igual al email que esta logueado, si o si tenemos que hacer esta validacion pq dos usuarios pueden tener una misma contraseña
                    if(dataUsers[i].dataValues.email === session.email){
                        //verifica que la contraseña sea la correcta, si o si hay que poner la contraseña para modificar algun dato
                        if(!(req.body['profile-password-current'] == "") && bcrypt.compareSync(req.body['profile-password-current'], dataUsers[i].dataValues.password)){
                            //esto verifica si es que existe una contraseña nueva o sea si es que el usuario quiere cambiarla
                            if(req.body['profile-password-new']){
                                passwordNew = bcrypt.hashSync(req.body['profile-password-new'], 10);
                            }else{
                                passwordNew = dataUsers[i].dataValues.password
                            }
                            
                            //modifica los datos del usuario en la base de datos
                            users.update({
                                first_name: req.body['profile-nombre'],
                                last_name: req.body['profile-apellido'],
                                email: req.body['profile-email'],
                                address: req.body['profile-adress'],
                                password: passwordNew,
                                user_type: req.body['profile-category'],
                                profile_image_url: req.body['profile-image'],
                            },{
                                where: {
                                    email: session.email
                                }
                            })

                            req.session.userToLoggedIn = dataUsers[i].dataValues
                            userFound = true;

                            break;

                        }
                    
                    }

                }

                if(userFound){
                    if(!req.body['profile-password-new']){
                        res.redirect('/');
                    }else{
                        req.session.destroy();
                        return res.redirect('/users/login')

                    }   
                }else{
                    res.render('users/profile', {errors: {['profile-password-current']: {msg: 'Credenciales incorrectas'}}, user: session})
                }

            })
            
        }else{
            return res.render('users/profile', { errors: errors.mapped(), user: session});
            
        }

        

        //se hace esta validacion para verificar que alguno de estos campos fue completado por el usuario logueado para ser modificados en la base de datos,
        //en el caso que no se haga esta validacion, aunque no se haya modificado nada, me modifica la base de datos y por lo tanto me reinicia el servidor
        /* 
        
        if(dataUserProfile.adress == "" && dataUserProfile.category == "" && dataUserProfile.country == "" && dataUserProfile.province == ""){
            return res.redirect('/users/profile');
        }

        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        
        
        */
        
        
        

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
            
            //hashea la contraseña creada
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            
            // último ID
            //const lastIdSaved = users[users.length - 1].id;
            let imagenURL;
            
            //Verifica que no llegue alguna imagen
            if(!req.file){
                //si no llega a la variable imagenURL se le asigna una imagen por defecto 
                imagenURL = 'avatarDefault.png';
            }else{
                //si llega lo guarda en imagenURL
                imagenURL = req.file.filename;
            }

            let ok = 0;

            users.findAll()
            .then((dataUsers) => {
                //Verifica que el email sea igual al email de confirmacion a la hora de registrarse
                if(req.body.email === req.body.emailConfirmation){
                    for(let i = 0; i < dataUsers.length; i++){
                        //Verifica si existe el mismo mail registrado
                        if(dataUsers[i].dataValues.email === req.body.email){
                            
                            ok = 1;
                            res.render('users/registration', {errors: {email: {msg: 'Este correo ya esta registrado'}}});
                            break;
    
                        }
                    }
                    if(ok == 0){
                        //Agrega el usuario creado a la base de datos
                        let addressNew = 'Publica s/n'
                        
                        users.create ({
                            first_name: req.body.firstname,
                            last_name: req.body.surname,
                            address: addressNew,
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