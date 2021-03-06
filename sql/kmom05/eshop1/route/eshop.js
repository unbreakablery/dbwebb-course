/**
 * Route for eshop.
 */ 
"use strict" ;

const express = require("express");
const router = express.Router();
const eshop = require("../src/eshop.js");

const bodyParser = require ( "body-parser" );
const urlencodedParser = bodyParser.urlencoded ({ extended : false });

const sitename = "My EShop";

router.get("/index", (req, res) => {
    let data = {
        title: `Welcome | ${sitename}`
    };

    res.render("eshop/index", data);
});

router.get("/category", async (req, res) => {
    let data = {
        title: `Product Categories | ${sitename}`
    };

    data.res = await eshop.showCategory();

    res.render("eshop/category", data);
});

router.get("/product", async (req, res) => {
    let data = {
        title: `Products | ${sitename}`
    };

    data.res = await eshop.showProduct();

    res.render("eshop/product", data);
});

router.get("/product/create", async (req, res) => {
    let data = {
        title: `Create New Product | ${sitename}`
    };

    res.render("eshop/product-create", data);
});

router.post("/product/create", urlencodedParser, async (req, res) => {
    await eshop.createProduct(
                                req.body.product_id, 
                                req.body.name, 
                                req.body.price,
                                req.body.image_link,
                                req.body.description
                            );
    res.redirect("/eshop/product");
});

router.get("/product/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Product Detail ${id} | The eshop`,
        product: id
    };

    data.res = await eshop.showProductDetail(id);

    res.render("eshop/product-view", data);
});

router.get("/product/edit/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Edit product ${id} | ${sitename}`,
        product: id
    };

    data.res = await eshop.showProductDetail(id);

    res.render("eshop/product-edit", data);
});

router.post("/product/edit", urlencodedParser, async (req, res) => {
    await eshop.editProduct(
                                req.body.product_id, 
                                req.body.name, 
                                req.body.price,
                                req.body.image_link,
                                req.body.description
                            );
    res.redirect(`/eshop/product/edit/${req.body.product_id}`); 
});

router.get("/product/delete/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Delete product ${id} | ${sitename}`,
        product: id
    };

    data.res = await eshop.showProductDetail(id);

    res.render("eshop/product-delete", data);
});

router.post("/product/delete", urlencodedParser, async (req, res) => {
    await eshop.deleteProduct(req.body.product_id);
    res.redirect("/eshop/product");
});

module.exports = router;