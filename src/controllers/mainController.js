/* Responsabilidad de Martin*/
const fs = require ('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    index: (req,res) => {
        const inSaleProducts = products.filter((product) => product.section=="in-sale");
        const featuredProducts = products.filter((product) => product.section == "featured");
        const lastColectionProducts = products.filter((product) => product.section == "last-colection");
        res.render('products/index', {inSaleProducts, featuredProducts, lastColectionProducts});
    },
    login: (req, res) => {
        res.render('users/login');
    },
    registration: (req, res) => {
        if (req.body.name && req.body.email && req.body.mailConfirmation && req.body.pass && req.file) {
            const hashedPassword = bcrypt.hashSync(req.body.pass, 10);

            // último ID
            const lastIdSaved = users[users.length - 1].id;
            const newUser = {
                //crea un ID mas
                id: lastIdSaved + 1,
                name: req.body.name,
                email: req.body.email,
                mailConfirmation: req.body.mailConfirmation,
                pass: hashedPassword,
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
}
module.exports = controller;