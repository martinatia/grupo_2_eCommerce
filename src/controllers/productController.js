/* Responsabilidad de Martin*/
const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    // list: (req, res) => {
    //     const inSaleProducts = products.filter((product) => product.section == "in-sale");
    //     const featuredProducts = products.filter((product) => product.section == "featured");
    //     const lastColectionProducts = products.filter((product) => product.section == "last-colection");
    //     res.render('products/index', { inSaleProducts, featuredProducts, lastColectionProducts });
    // },
    editProduct: (req, res) => {
        const producto = products.find((producto) => producto.id == req.params.id);
        res.render('products/edit-product', { producto })
    },
    productDetail:(req, res) =>{
        const id = req.params.id;
        res.render('products/product-description',{id});
    },
    createProduct: (req,res)=>{
        res.render('products/create-product');
    },
    postProduct:(req,res)=>{
        //TODO: 
 
        const lastIdSaved = products[products.length-1].id;
        let producto = {
            id: lastIdSaved+1,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
            colors: req.body.color,
            price: req.body.price,
            sizes: req.body.sizes,
            section: req.body.section
        }
        products.push(producto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products));
	    res.redirect("/");
        res.send(req.body);


        //res.redirect(....);
    },
    putProduct:(req,res)=>{
        const id = req.params.id;
        const producto = products.find((producto) => producto.id == req.params.id);
        //debo encontrar los valores nuevos ingresados en el formulario, crear un objeto y actualizar dicho producto....
        //luego redireccionar


    },
    deleteProduct:(req,res)=>{
        
    }

}
module.exports = controller;