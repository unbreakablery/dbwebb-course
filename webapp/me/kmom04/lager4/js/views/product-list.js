"use strict";

import m from 'mithril';
import { product } from '../models/product';

const productComponent = {
    view: function(vnode) {
        let current = vnode.attrs;

        return m("div.card", [
            m("p.card-title", "Product Name: " + current.name),
            m("p.card-info", "Article #: " + current.article_number),
            m("p.card-info", "Description: " + current.description),
            m("p.card-info", "Specifiers: " + JSON.stringify(current.specifiers)),
            m("p.card-info", "Stock: " + current.stock),
            m("p.card-info", "Location: " + current.location),
            m("p.card-info", "Price: " + current.price),
            m("a.card-info", { href: "#!/product-edit/" + current.id }, "Edit")
        ]);
    }
};

let productList = {
    oninit: product.loadAll,
    view: function() {
        return m("div.container", [
            m("h1", "Products"),
            m(
                "a.button.blue-button.full-width-button",
                { href: "#!/product-new" },
                "New Product"
            ),
            m("div.cake-container", product.currentProducts.map(function(product) {
                return m(productComponent, product);
            }))
        ]);
    }
};

export { productList };
