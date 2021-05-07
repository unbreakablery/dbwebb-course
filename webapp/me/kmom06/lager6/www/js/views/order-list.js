"use strict";

import m from 'mithril';
import { order } from '../models/order.js';

const orderComponent = {
    view: function(vnode) {
        let current = vnode.attrs;

        return m("div.card", [
            m("p.card-title", "ID: " + current.id),
            m("p.card-info", "Name: " + current.name),
            m("p.card-info", "Status: " + order.getStatusByID(current.status_id)),
            m("a.card-info", { href: "#!/order-view/" + current.id }, "View")
        ]);
    }
};

let orderList = {
    oninit: order.loadPackedAll,
    view: function() {
        return m("div.container", [
            m("h1", "Orders For Delivery"),
            m("div.cake-container", order.currentOrders.map(function(order) {
                return m(orderComponent, order);
            }))
        ]);
    }
};

export { orderList };
