import m from 'mithril';
import { delivery } from "../models/delivery";
import { product } from "../models/product";

let newForm = {
    oninit: function() {
        product.loadAll();
        delivery.resetDelivery();
        delivery.current.amount = 1;
        delivery.current.delivery_date = (new Date()).getFullYear() + "-" + 
                                        ((new Date()).getMonth() + 1).
                                            toString().
                                            padStart(2, '0') + "-" 
                                        + (new Date()).getDate();
        delivery.current.comment = "Delivery for your special day!";
    },
    view: function() {
        return m("div.container", [
            m("h2", "New Delivery"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    delivery.addDelivery();
                } }, [
                    m("label.input-label", "Product"),
                    m("select.input[required]", {
                        onchange: function (e) {
                            delivery.current.product_id = parseInt(e.target.value);
                        }
                    }, [
                        m("option", { value: ''}, ''),
                        product.currentProducts.map(function(product) {
                            return m("option", { value: product.id }, product.name);
                        })]
                    ),
                    m("label.input-label", "Amount"),
                    m("input.input[type=number][placeholder=Amount][required]", {
                        oninput: function (e) {
                            delivery.current.amount = parseInt(e.target.value);
                        },
                        value: delivery.current.amount,
                        min: 1
                    }),
                    m("label.input-label", "Delivery Date"),
                    m("input.input[type=date][placeholder=Delivery Date][required]", {
                        oninput: function (e) {
                            delivery.current.delivery_date = e.target.value;
                        },
                        value: delivery.current.delivery_date
                    }),
                    m("label.input-label", "Comment"),
                    m("textarea.input", {
                        oninput: function (e) {
                            delivery.current.comment = e.target.value;
                        },
                        value: delivery.current.comment
                    }),
                    m("input.button.green-button[type=submit][value=Save].button", "Create Delivery")
            ])
        ]);
    }
};

export { newForm };
