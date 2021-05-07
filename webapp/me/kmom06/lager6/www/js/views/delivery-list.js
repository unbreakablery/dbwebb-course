"use strict";

import m from 'mithril';
import { delivery } from '../models/delivery.js';

const deliveryComponent = {
    view: function(vnode) {
        let current = vnode.attrs;

        return m("div.card", [
            m("p.card-title", "Product Name: " + current.product_name),
            m("p.card-info", "Amount: " + current.amount),
            m("p.card-info", "Date: " + current.delivery_date),
            m("p.card-info", "Comment: " + current.comment)
        ]);
    }
};

let deliveryList = {
    oninit: delivery.loadAll,
    view: function() {
        return m("div.container", [
            m("h1", "Deliveries"),
            m(
                "a.button.blue-button.full-width-button",
                { href: "#!/delivery-new" },
                "New Delivery"
            ),
            m("div.cake-container", delivery.currentDeliveries.map(function(delivery) {
                return m(deliveryComponent, delivery);
            }))
        ]);
    }
};

export { deliveryList };
