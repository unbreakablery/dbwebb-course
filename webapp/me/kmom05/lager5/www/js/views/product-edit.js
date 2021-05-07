import m from 'mithril';
import { product } from "../models/product";

let editProductForm = {
    oninit: function(vnode) {
        product.load(vnode.attrs.id);
    },
    view: function() {
        return m("div.container", [
            m("h2", "Edit Product"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    product.save();
                } }, [
                m("label.input-label", "Name"),
                m("input.input[type=text][placeholder=Product Name][required]", {
                    oninput: function (e) {
                        product.current.name = e.target.value;
                    },
                    value: product.current.name
                }),
                m("label.input-label", "Article Number"),
                m("input.input[type=text][placeholder=Article Number]", {
                    oninput: function (e) {
                        product.current.article_number = e.target.value;
                    },
                    value: product.current.article_number
                }),
                m("label.input-label", "Description"),
                m("textarea.input[placeholder=Description]", {
                    oninput: function (e) {
                        product.current.description = e.target.value;
                    },
                    value: product.current.description
                }),
                m("label.input-label", "Specifiers"),
                m("textarea.input[placeholder=Specifiers]", {
                    oninput: function (e) {
                        product.current.specifiers = e.target.value;
                    },
                    value: product.current.specifiers
                }),
                m("label.input-label", "Stock"),
                m("input.input[type=number][placeholder=Stock]", {
                    oninput: function (e) {
                        product.current.stock = parseInt(e.target.value);
                    },
                    value: product.current.stock,
                    min: 1
                }),
                m("label.input-label", "Location"),
                m("input.input[type=text][placeholder=Location]", {
                    oninput: function (e) {
                        product.current.location = e.target.value;
                    },
                    value: product.current.location
                }),
                m("label.input-label", "Price"),
                m("input.input[type=number][placeholder=Price]", {
                    oninput: function (e) {
                        product.current.price = parseFloat(e.target.value);
                    },
                    value: product.current.price,
                    min: 0
                }),
                m("input.button.green-button[type=submit][value=Save].button", "Update Product"),
                m("input.button.red-button[type=button][value=Delete].button", {onclick: function() {product.delete();}}, "Delete Product")
            ])
        ]);
    }
};

export { editProductForm };
