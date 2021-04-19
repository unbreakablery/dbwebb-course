"use strict";

import m from 'mithril';

import { auth } from "./models/auth.js";

import { layout } from "./views/layout.js";

import { list } from "./views/list.js";
import { productList } from "./views/product-list.js";
import { editForm } from "./views/form.js";
import { newForm } from "./views/new.js";
import { newProductForm } from "./views/product-new.js";
import { login } from "./views/login.js";


m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(layout, {
                bottomNav: "#!/"
            }, m(list));
        }
    },
    "/products": {
        render: function() {
            return m(layout, {
                topNav: { route: "#!/", title: "Home"},
                bottomNav: "#!/products"
            }, m(productList));
        }
    },
    "/form/:id": {
        render: function(vnode) {
            return m(layout, {
                topNav: { route: "#!/", title: "Home"},
                bottomNav: "#!/"
            }, m(editForm, vnode.attrs));
        }
    },
    "/new": {
        onmatch: function() {
            if (auth.token) {
                return newForm;
            } else {
                return m.route.set("/login");
            }
        },
        render: function(vnode) {
            return m(layout, {
                topNav: { route: "#!/", title: "Home"},
                bottomNav: "#!/new"
            }, m(newForm));
        }
    },
    "/product-new": {
        render: function(vnode) {
            return m(layout, {
                topNav: { route: "#!/products", title: "Products"}
            }, m(newProductForm));
        }
    },
    "/login": {
        render: function() {
            return m(layout, {
                topNav: { route: "#!/", title: "Home"},
                bottomNav: "#!/"
            }, m(login));
        }
    }
});
