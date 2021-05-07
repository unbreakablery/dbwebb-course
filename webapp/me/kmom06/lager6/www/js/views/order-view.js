import m from 'mithril';
import { order } from "../models/order";
import mapView from "../views/map";

let viewOrder = {
    oninit: function(vnode) {
        order.load(vnode.attrs.id);
    },
    view: function(vnode) {
        return m("div.container", [
            m("h2", "Order Information"),
            m("h3", "ID:"),
            m("p", order.current.id),
            m("h3", "Name:"),
            m("p", order.current.name),
            m("h3", "Address:"),
            m("p", order.current.address),
            m("h3", "City:"),
            m("p", order.current.city),
            m("h3", "Country:"),
            m("p", order.current.country),
            m("h3", "Zip:"),
            m("p", order.current.zip),
            m("h3", "Status:"),
            m("p", order.current.status),
            m(mapView, vnode)
        ]);
    }
};

export { viewOrder };
