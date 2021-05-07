"use strict";

import m from 'mithril';

import { auth } from "./models/auth.js";

import { layout } from "./views/layout.js";

import { deliveryList } from "./views/delivery-list.js";
import { productList } from "./views/product-list.js";
import { newDeliveryForm } from "./views/delivery-new.js";
import { newProductForm } from "./views/product-new.js";
import { editProductForm } from "./views/product-edit.js";
import { invoiceList } from "./views/invoice-list.js";
import { newInvoiceForm } from "./views/invoice-new.js";
import { orderList } from "./views/order-list.js";
import { viewOrder } from "./views/order-view.js";
import { login } from "./views/login.js";
import { register } from "./views/register.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    m.route(document.body, "/", {
        "/": {
            onmatch: function() {
                if (auth.token) {
                    return deliveryList;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    bottomNav: "#!/"
                }, m(deliveryList));
            }
        },
        "/products": {
            onmatch: function() {
                if (auth.token) {
                    return productList;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/products"
                }, m(productList));
            }
        },
        "/delivery-new": {
            onmatch: function() {
                if (auth.token) {
                    return newDeliveryForm;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/"
                }, m(newDeliveryForm));
            }
        },
        "/product-new": {
            onmatch: function() {
                if (auth.token) {
                    return newProductForm;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/products", title: "Products"},
                    bottomNav: "#!/products"
                }, m(newProductForm));
            }
        },
        "/product-edit/:id": {
            onmatch: function() {
                if (auth.token) {
                    return editProductForm;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function(vnode) {
                return m(layout, {
                    topNav: { route: "#!/products", title: "Products"},
                    bottomNav: "#!/products"
                }, m(editProductForm, vnode.attrs));
            }
        },
        "/invoices": {
            onmatch: function() {
                if (auth.token) {
                    return invoiceList;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/invoices"
                }, m(invoiceList));
            }
        },
        "/invoice-new": {
            onmatch: function() {
                if (auth.token) {
                    return newInvoiceForm;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/invoices", title: "Invoices"},
                    bottomNav: "#!/invoices"
                }, m(newInvoiceForm));
            }
        },
        "/orders": {
            onmatch: function() {
                if (auth.token) {
                    return orderList;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/orders"
                }, m(orderList));
            }
        },
        "/order-view/:id": {
            onmatch: function() {
                if (auth.token) {
                    return viewOrder;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function(vnode) {
                return m(layout, {
                    topNav: { route: "#!/orders", title: "Orders"},
                    bottomNav: "#!/orders"
                }, m(viewOrder, vnode.attrs));
            }
        },
        "/login": {
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/login"
                }, m(login));
            }
        },
        "/register": {
            render: function() {
                return m(layout, {
                    topNav: { route: "#!/", title: "Home"},
                    bottomNav: "#!/login"
                }, m(register));
            }
        }
    });
}
