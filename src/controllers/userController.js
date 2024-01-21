/* Responsabilidad de Martin */
const fs = require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const bcrypt = require('bcrypt');

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
            password: req.body.pass,
        }
        if(loginData.email && loginData.password){
            let userDate = users.find((user) => {
                return user.email === loginData.email && user.password === loginData.password;
            })
            if(userDate){
                res.redirect('/')
            }else{
                res.redirect('/login')
                //res.send('Usuario y/o contraseña incorrectos')
            }    
            
        }else{
            res.redirect('/login')
            //res.send('Por favor complete los campos')
        }
    },
    registration: (req,res) => {
        res.render('users/registration');
    },
    newUser: (req, res) => {

        if (req.body.name && req.body.email && req.body.mailConfirmation && req.body.password && req.file) {
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
        } else {
            res.send('Por favor complete todos los campos del formulario.');
        }
    },
    shoppingCart: (req, res) => {
        res.render('users/shopping-cart');
    }
}
module.exports = controller;