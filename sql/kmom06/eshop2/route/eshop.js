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
        title: `Welcome | ${sitename}`,
        page: 'home'
    };

    res.render("eshop/index", data);
});

router.get("/category", async (req, res) => {
    let data = {
        title: `Product Categories | ${sitename}`,
        page: 'category'
    };

    data.res = await eshop.showCategory();

    res.render("eshop/category", data);
});

router.get("/product", async (req, res) => {
    let data = {
        title: `Products | ${sitename}`,
        page: 'product'
    };

    data.res = await eshop.showProduct();

    res.render("eshop/product", data);
});

router.get("/product/create", async (req, res) => {
    let data = {
        title: `Create New Product | ${sitename}`,
        page: 'product'
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
        product: id,
        page: 'product'
    };

    data.res = await eshop.showProductDetail(id);

    res.render("eshop/product-view", data);
});

router.get("/product/edit/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Edit product ${id} | ${sitename}`,
        product: id,
        page: 'product'
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
        product: id,
        page: 'product'
    };

    data.res = await eshop.showProductDetail(id);

    res.render("eshop/product-delete", data);
});

router.post("/product/delete", urlencodedParser, async (req, res) => {
    await eshop.deleteProduct(req.body.product_id);
    res.redirect("/eshop/product");
});

router.get("/customer", async (req, res) => {
    let data = {
        title: `Customers | ${sitename}`,
        page: 'customer'
    };

    data.res = await eshop.showCustomer();

    res.render("eshop/customer", data);
});

router.get("/order", async (req, res) => {
    let data = {
        title: `Orders | ${sitename}`,
        page: 'order'
    };

    data.res = await eshop.showOrders();

    res.render("eshop/order", data);
});

router.get("/order/create", async (req, res) => {
    let data = {
        title: `Create New Order | ${sitename}`,
        page: 'order'
    };

    data.customers = await eshop.showCustomer();

    res.render("eshop/order-create", data);
});

router.post("/order/create", urlencodedParser, async (req, res) => {
    await eshop.createOrder(
                                req.body.customer_id
                            );
    res.redirect("/eshop/order");
});

router.get("/order/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Order Detail ${id} | The eshop`,
        order_id: id,
        page: 'order'
    };

    data.order = await eshop.showOrder(id);
    data.order_details = await eshop.showOrderDetail(id);

    res.render("eshop/order-view", data);
});

router.get("/order/edit/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Edit order | ${sitename}`,
        order_id: id,
        page: 'order'
    };

    data.customers = await eshop.showCustomer();
    data.order = await eshop.showOrder(id);

    res.render("eshop/order-edit", data);
});

router.post("/order/edit", urlencodedParser, async (req, res) => {
    await eshop.editOrder(
                                req.body.order_id, 
                                req.body.customer_id, 
                                req.body.status 
                            );
    res.redirect(`/eshop/order/edit/${req.body.order_id}`); 
});

router.get("/order/delete/:id", async (req, res) => {
    let id = req.params.id;
    let data = {
        title: `Delete order | ${sitename}`,
        order_id: id,
        page: 'order'
    };

    data.order = await eshop.showOrder(id);
    data.order_details = await eshop.showOrderDetail(id);

    res.render("eshop/order-delete", data);
});

router.post("/order/delete", urlencodedParser, async (req, res) => {
    await eshop.deleteOrder(req.body.order_id);
    res.redirect("/eshop/order");
});

router.get("/order-detail/create/:order_id", async (req, res) => {
    let order_id = req.params.order_id;
    let data = {
        title: `Create New Order Line | ${sitename}`,
        page: 'order',
        order_id
    };

    data.products = await eshop.showProduct();

    res.render("eshop/order-detail-create", data);
});

router.post("/order-detail/create", urlencodedParser, async (req, res) => {
    await eshop.createOrderDetail(
                                req.body.order_id,
                                req.body.product_id,
                                req.body.quantity
                            );
    res.redirect("/eshop/order/" + req.body.order_id);
});

router.get("/order-detail/edit/:order_id/:product_id", async (req, res) => {
    let order_id = req.params.order_id;
    let product_id = req.params.product_id;
    let data = {
        title: `Edit Order Line | ${sitename}`,
        page: 'order',
        order_id,
        product_id
    };

    data.products = await eshop.showProduct();
    data.order_line = await eshop.showOrderLine(order_id, product_id);
    
    res.render("eshop/order-detail-edit", data);
});

router.post("/order-detail/edit", urlencodedParser, async (req, res) => {
    await eshop.editOrderLine(
                                req.body.order_id, 
                                req.body.product_id, 
                                req.body.quantity 
                            );
    res.redirect(`/eshop/order-detail/edit/${req.body.order_id}/${req.body.product_id}`); 
});

router.get("/order-detail/delete/:order_id/:product_id", async (req, res) => {
    let order_id = req.params.order_id;
    let product_id = req.params.product_id;
    let data = {
        title: `Delete Order Line | ${sitename}`,
        page: 'order',
        order_id,
        product_id
    };

    data.products = await eshop.showProduct();
    data.order_line = await eshop.showOrderLine(order_id, product_id);
    
    res.render("eshop/order-detail-delete", data);
});

router.post("/order-detail/delete", urlencodedParser, async (req, res) => {
    await eshop.deleteOrderLine(
                                req.body.order_id, 
                                req.body.product_id
                            );
    res.redirect(`/eshop/order/${req.body.order_id}`); 
});

router.get("/about-us", async (req, res) => {
    let data = {
        title: `About Us | ${sitename}`,
        page: 'about'
    };

    res.render("eshop/about-us", data);
});

module.exports = router;